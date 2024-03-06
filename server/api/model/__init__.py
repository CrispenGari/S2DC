import torch
import os
from torch import nn
from torchtext import data
import json
from api.types import Prediction

MODEL_NAME = "s2dc_model.pt"
S2DC_MODEL_PATH = os.path.join(os.getcwd(), f"api/model/static/{MODEL_NAME}")
VOCAB_PATH = os.path.join(os.getcwd(), "api/model/static/vocab.json")
LABELS_PATH = os.path.join(os.getcwd(), "api/model/static/labels_dict.json")
device = torch.device("cpu")
tokenizer = data.utils.get_tokenizer("spacy", "en")

with open(VOCAB_PATH, "r") as reader:
    stoi = json.loads(reader.read())

with open(LABELS_PATH, "r") as reader:
    labels_dict = json.loads(reader.read())


def text_pipeline(x: str):
    values = list()
    tokens = tokenizer(x.lower())  # convert to lower case.
    for token in tokens:
        try:
            v = stoi[token]
        except KeyError:
            v = stoi["<unk>"]
        values.append(v)
    return values


class S2DCModel(nn.Module):
    def __init__(
        self,
        vocab_size,
        embedding_size,
        hidden_size,
        output_size,
        num_layers,
        bidirectional,
        dropout,
        pad_idx,
    ):
        super(S2DCModel, self).__init__()

        self.embedding = nn.Sequential(
            nn.Embedding(vocab_size, embedding_dim=embedding_size, padding_idx=pad_idx),
            nn.Dropout(dropout),
        )
        self.lstm = nn.Sequential(
            nn.LSTM(
                embedding_size,
                hidden_size=hidden_size,
                bidirectional=bidirectional,
                num_layers=num_layers,
                dropout=dropout,
            )
        )
        self.out = nn.Sequential(
            nn.Linear(hidden_size * 2, out_features=128),
            nn.Dropout(dropout),
            nn.Linear(128, out_features=output_size),
            nn.Dropout(dropout),
        )

    def forward(self, text, text_lengths):
        embedded = self.embedding(text)
        # set batch_first=true since input shape has batch_size first and text_lengths to the device.
        packed_embedded = nn.utils.rnn.pack_padded_sequence(
            embedded, text_lengths.to("cpu"), enforce_sorted=False, batch_first=True
        )
        packed_output, (h_0, c_0) = self.lstm(packed_embedded)
        output, output_lengths = nn.utils.rnn.pad_packed_sequence(packed_output)
        output = torch.cat((h_0[-2, :, :], h_0[-1, :, :]), dim=1)
        return self.out(output)


print(" ✅ LOADING PYTORCH S2DC MODEL!\n")


INPUT_DIM = len(stoi)
EMBEDDING_DIM = 100
HIDDEN_DIM = 256
OUTPUT_DIM = len(labels_dict)
N_LAYERS = 2
BIDIRECTIONAL = True
DROPOUT = 0.5
PAD_IDX = stoi["<pad>"]

s2dc_model = S2DCModel(
    INPUT_DIM,
    EMBEDDING_DIM,
    HIDDEN_DIM,
    OUTPUT_DIM,
    N_LAYERS,
    BIDIRECTIONAL,
    DROPOUT,
    PAD_IDX,
).to(device)
s2dc_model.load_state_dict(torch.load(S2DC_MODEL_PATH, map_location=device))
print(" ✅ LOADING PYTORCH S2DC MODEL DONE!\n")


def inference_preprocess_text(text, max_len=100, padding="pre"):
    assert (
        padding == "pre" or padding == "post"
    ), "the padding can be either pre or post"
    text_holder = torch.zeros(
        max_len, dtype=torch.int32
    )  # fixed size tensor of max_len with  = 0
    processed_text = torch.tensor(text_pipeline(text), dtype=torch.int32)
    pos = min(max_len, len(processed_text))
    if padding == "pre":
        text_holder[:pos] = processed_text[:pos]
    else:
        text_holder[-pos:] = processed_text[-pos:]
    text_list = text_holder.unsqueeze(dim=0)
    return text_list


def predict_disease(model, sentence, device):
    model.eval()
    with torch.no_grad():
        tensor = inference_preprocess_text(sentence.lower()).to(device)
        length = torch.tensor([len(t) for t in tensor])
        probabilities = torch.softmax(model(tensor, length).squeeze(0), dim=0)
        prediction = torch.argmax(probabilities)
        prediction = prediction.detach().cpu().item()
        diseases = {v: k for k, v in labels_dict.items()}
        disease = diseases[prediction]

        return Prediction(
            sentence.lower(),
            disease,
            int(prediction),
            float(round(probabilities[prediction].item(), 2)),
        )

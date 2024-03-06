from flask import Flask, make_response, jsonify
from flask_cors import CORS
import os
from api.blueprints import blueprint

"""
* note that you only need to download the tokenizer model once from spacy.
"""

# import spacy
# spacy.cli.download("en_core_web_sm")


os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"


app = Flask(__name__)
CORS(app)

app.register_blueprint(blueprint, url_prefix="/api")


@app.route("/", methods=["GET"])
def meta():
    meta = {
        "programmer": "@crispengari",
        "main": "Symptoms to Disease Classification (S2DC) API.",
        "description": "This is a simple AI classification deep learning API that will accurately identify the disease based on the description of the symptoms, from text.",
        "language": "python",
        "libraries": ["pytorch", "torchtext"],
    }
    return make_response(jsonify(meta)), 200

### S2DC (Symptoms to Disease Classifier)

😷💉💊🤮🤒 Symptoms to Disease Classifier, is an Artificial Intelligent (AI) mobile tool that is used to classify diseases from people based on the textual symptoms the person provides.

<p align="center">
    <img src="logo.png" width="200" alt="logo"/>
</p>

### demo

This is a demo video showing how the application works.


https://user-images.githubusercontent.com/59051957/235310636-f2794234-7705-4867-a7a3-3d1d01b0aad8.mp4



### Testing `S2DC` app

You can test this application locally, you just need to follow the following instructions that will help you play around with our tool in development mode.

1. clone this repository by running:

```shell
git clone https://github.com/CrispenGari/S2DC.git
```

2. navigate to the server by running the following command:

```shell
cd  server
```

3. create a virtual environment on the server folder, activate it and install required packages by running the following command:

```shell
virtualenv venv && .\venv\Scripts\activate
```

4. Start the server by running the following command:

```shell
python server.py
```

5. When the server is running it will start on a default port of `3001` go ahead and open `ngrok` cli and run the following command:

```shell
ngrok http 3001
```

6. Copy the forwarding url from the `ngrok` shell that looks as follows:

```shell
Forwarding                    https://4c1a-102-66-137-117.ngrok-free.app -> http://localhost:3001
```

7. Navigate to the `client/src/constants/index.ts` file and change the constant `serverBaseURL` to the forwarding url for example as follows:

```ts
export const serverBaseURL: string =
  "https://4c1a-102-66-137-117.ngrok-free.app";
```

8. Now you can start the expo app but first navigate to the `client` on another terminal and run the following command:

```shell
cd client && yarn && expo install && yarn start
```

9. Scan the `QR` code using your phone and start using the `tool`. Make sure that you have `expo-go` installed in your `android` or `ios` phone before scanning the `QR` code.

### Dataset

The dataset that was used to train the `AI` tool was found on [kaggle](https://www.kaggle.com/datasets/niyarrbarman/symptom2disease)

### Notebooks

The `.ipynb` notebook that was used to train and save the model can be found:

1. [01_SYMPTOMS_2_DISEASE_CLASSIFICATION](https://github.com/CrispenGari/nlp-pytorch/blob/main/11_SYMPTOMS_2_DISEASE_CLASSIFICATION/01_SYMPTOMS_2_DISEASE_CLASSIFICATION.ipynb)

### License

This project is under the `MIT` license which reads as follows:

```
MIT License

Copyright (c) 2023 crispengari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

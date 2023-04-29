"""
* note that you only need to download the tokenizer model once from spacy.
"""
# import spacy
# spacy.cli.download("en_core_web_sm")

import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

from api.app import app
from api.blueprints import blueprint
from flask import make_response, jsonify

app.register_blueprint(blueprint, url_prefix="/api")

class AppConfig:
    PORT = 3001
    DEBUG = False

@app.route('/', methods=["GET"])
def meta():
    meta = {
        "programmer": "@crispengari",
        "main": "Symptoms to Disease Classification (S2DC) API.",
        "description": "This is a simple AI classification deep learning API that will accurately identify the disease based on the description of the symptoms, from text.",
        "language": "python",
        "libraries": ["pytorch", "torchtext"],
    }
    return make_response(jsonify(meta)), 200

if __name__ == "__main__":
    app.run(debug=AppConfig().DEBUG, port=AppConfig().PORT, )

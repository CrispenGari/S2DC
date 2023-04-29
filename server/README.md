### server

The `server` is a `REST` api that is running locally on a default port of `3001`.

To test the server first you need to create a virtual environment in the server folder and activate it, on windows you do it as follows:

```shell
virtualenv venv && .\venv\Scripts\activate
```

Now you can install the packages by running the following command:

```shell
pip install -r requirements.txt
```

To start the development server you need to run the following command:

```shell
python server.py
```

> Howdy!!! You will be able to see the following logs in the console if everything went well.

```shell
✅ LOADING PYTORCH S2DC MODEL!

✅ LOADING PYTORCH S2DC MODEL DONE!

 * Serving Flask app 'api.app'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:3001
```

### Request to the server

Sending a `POST` request at `http://127.0.0.1:3001/api/v1/diagnose` with the following request body:

```json
{
  "symptoms": "i've recently been suffering with chills, lethargy, a cough, a high temperature, and difficulties breathing."
}
```

You will get the response that looks as follows:

```json
{
  "prediction": {
    "confidence": 0.66,
    "disease": "pneumonia",
    "diseaseId": 8,
    "pattern": "i've recently been suffering with chills, lethargy, a cough, a high temperature, and difficulties breathing."
  },
  "success": true,
  "time": 0.08995652198791504
}
```

from flask import Blueprint, make_response, jsonify, request
from api.model import device, s2dc_model, predict_disease
import time
blueprint = Blueprint("blueprint", __name__)

@blueprint.route('/v1/diagnose', methods=["POST"])
def diagnose():
    start = time.time()
    data = {"success": False, "time": 0}
    if request.method == "POST":
        try:
            if request.is_json:
                json = request.get_json(force=True)
                if json.get("symptoms"):
                    res = predict_disease(s2dc_model, json.get("symptoms"), device)
                    data = {
                        'success': True,
                        'prediction': res.to_json(),
                    }
                else:
                    data['error']  = "you should pass the 'symptoms' in your json body while making this request."
            else:
                raise Exception("the is no json data in your request.")
        except Exception as e:
            print(e)
            data['error'] = 'something went wrong on the server'
    else:
        data['error']  = "the request method should be post only."
    end = time.time()
    data["time"] = end - start
    return make_response(jsonify(data)), 200

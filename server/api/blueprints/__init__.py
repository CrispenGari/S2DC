from flask import Blueprint, make_response, jsonify, request
import io
from PIL import Image
from api.models import *
from api.models.pytorch import *

blueprint = Blueprint("blueprint", __name__)

# @blueprint.route('/v1/classify', methods=["POST"])

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()
    if email is None or username is None or password is None:
        return jsonify({"msg": "Please supply a valid email, username, and password."}), 400
    elif existing_user is not None and existing_email is not None:
        return jsonify({"msg": "Username and Email already in use."}), 400
    elif existing_user is not None:
        return jsonify({"msg": "Username already in use."}), 400
    elif existing_email is not None:
        return jsonify({"msg": "Email already in use."}), 400
    else:
        user = User(email = email, username = username, password = password, is_active = True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg": "New user created successfully.", "status": "ok"}), 200
    
@api.route('/login', methods=['POST'])
def handle_login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return jsonify({"msg": "Incorrect username or password."}), 401
    
    else:
        access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private_info():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is not None:
        return jsonify({"user": user.serialize(), "status": "ok"}), 200
    else: 
        return jsonify({"msg": "You must be logged in to view this information."})


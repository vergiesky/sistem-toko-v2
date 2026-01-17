from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.controllers import auth_controller


auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/register")
def register():
    return auth_controller.register()


@auth_bp.post("/login")
def login():
    return auth_controller.login()


@auth_bp.post("/logout")
@jwt_required()
def logout():
    return auth_controller.logout()

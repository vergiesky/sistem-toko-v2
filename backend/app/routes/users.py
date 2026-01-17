from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.controllers import user_controller


users_bp = Blueprint("users", __name__)


@users_bp.get("/profile")
@jwt_required()
def show_profile():
    user_id = get_jwt_identity()
    return user_controller.show_profile(user_id)


@users_bp.put("/profile")
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    return user_controller.update_profile_controller(user_id)


@users_bp.put("/profile/password")
@jwt_required()
def update_password():
    user_id = get_jwt_identity()
    return user_controller.update_password_controller(user_id)

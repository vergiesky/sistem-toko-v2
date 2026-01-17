from flask import jsonify, request
from flask_jwt_extended import create_access_token

from app.services.auth_service import create_user, get_user_by_username, check_password
from app.utils.serializers import user_dict
from app.utils.validation import get_json_dict, require_fields


def register():
    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["username", "password"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    if not isinstance(data["username"], str) or not isinstance(data["password"], str):
        return jsonify({"message": "Tipe data tidak valid"}), 400

    if len(data["password"]) < 8:
        return jsonify({"message": "Password minimal 8 karakter"}), 400

    user = create_user(data["username"], data["password"])
    return jsonify({"user": user_dict(user)}), 201


def login():
    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["username", "password"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    user = get_user_by_username(data["username"])
    if not user:
        return jsonify({"message": "User tidak ditemukan"}), 404

    if not check_password(user, data["password"]):
        return jsonify({"message": "Password salah"}), 401

    token = create_access_token(identity=str(user.id_user))
    return jsonify({"user": user_dict(user), "token": token}), 200


def logout():
    return jsonify({"message": "Berhasil logout"}), 200

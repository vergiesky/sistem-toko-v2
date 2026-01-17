from flask import jsonify, request

from app.services.user_service import get_user_by_id, update_profile, update_password
from app.utils.serializers import user_dict
from app.utils.validation import get_json_dict


def show_profile(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "User tidak ditemukan"}), 404

    return jsonify({"data": user_dict(user)}), 200


def update_profile_controller(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "User tidak ditemukan"}), 404

    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    username = data.get("username")
    if username is not None and not isinstance(username, str):
        return jsonify({"message": "Tipe data tidak valid"}), 400

    update_profile(user, username=username)
    return jsonify({"message": "Berhasil update profile", "data": user_dict(user)}), 200


def update_password_controller(user_id):
    user = get_user_by_id(user_id)
    if not user:
        return jsonify({"message": "User tidak ditemukan"}), 404

    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    required = ["password_lama", "password_baru", "password_baru_confirmation"]
    missing = [field for field in required if field not in data]
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    if data["password_baru"] != data["password_baru_confirmation"]:
        return jsonify({"message": "Konfirmasi password tidak cocok"}), 400

    if len(data["password_baru"]) < 8:
        return jsonify({"message": "Password minimal 8 karakter"}), 400

    success = update_password(user, data["password_lama"], data["password_baru"])
    if not success:
        return jsonify({"message": "Password lama yang Anda masukkan tidak sesuai"}), 400

    return jsonify({"message": "Password berhasil diubah"}), 200

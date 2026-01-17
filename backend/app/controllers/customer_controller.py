from flask import jsonify, request

from app.services.customer_service import (
    list_customers,
    create_customer,
    update_customer,
    delete_customer,
    get_customer,
)
from app.utils.serializers import customer_dict
from app.utils.validation import get_json_dict, require_fields


def index():
    try:
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
    except ValueError:
        return jsonify({"message": "Parameter pagination tidak valid"}), 400

    if page < 1 or per_page < 0:
        return jsonify({"message": "Parameter pagination tidak valid"}), 400

    query_text = request.args.get("query", "").strip()

    customers, total = list_customers(
        page=page,
        per_page=per_page,
        query_text=query_text,
    )
    pages = (total + per_page - 1) // per_page if per_page else 1
    return jsonify({
        "data": [customer_dict(item) for item in customers],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "pages": pages,
        },
    }), 200


def store():
    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["nama_customer", "nama_perusahaan", "alamat"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    customer = create_customer(
        nama_customer=data["nama_customer"],
        nama_perusahaan=data["nama_perusahaan"],
        alamat=data["alamat"],
    )

    return jsonify({"message": "Berhasil menambahkan customer", "data": customer_dict(customer)}), 201


def update(customer_id):
    customer = get_customer(customer_id)
    if not customer:
        return jsonify({"message": "Customer tidak ditemukan"}), 404

    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["nama_customer", "nama_perusahaan", "alamat"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    customer = update_customer(
        customer,
        nama_customer=data["nama_customer"],
        nama_perusahaan=data["nama_perusahaan"],
        alamat=data["alamat"],
    )

    return jsonify({"message": "Berhasil update customer", "data": customer_dict(customer)}), 200


def destroy(customer_id):
    success = delete_customer(customer_id)
    if not success:
        return jsonify({"message": "Customer tidak ditemukan"}), 404

    return jsonify({"message": "Berhasil hapus customer"}), 200

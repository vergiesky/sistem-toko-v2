from flask import jsonify, request

from app.services.barang_harga_customer_service import (
    list_barang_harga_customers,
    create_barang_harga_customer,
    update_barang_harga_customer,
    get_barang_harga_customer,
)
from app.utils.serializers import barang_harga_customer_dict
from app.utils.validation import get_json_dict, require_fields


def index():
    items = list_barang_harga_customers()
    return jsonify({
        "data": [
            barang_harga_customer_dict(item, include_barang=True, include_customer=True)
            for item in items
        ]
    }), 200


def store():
    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["id_barang", "id_customer", "harga_khusus"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    item = create_barang_harga_customer(
        id_barang=int(data["id_barang"]),
        id_customer=int(data["id_customer"]),
        harga_khusus=data["harga_khusus"],
    )

    return jsonify({"message": "Berhasil menambah barang harga customer", "data": barang_harga_customer_dict(item)}), 201


def update(item_id):
    item = get_barang_harga_customer(item_id)
    if not item:
        return jsonify({"message": "Barang tidak ditemukan"}), 404

    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["id_barang", "id_customer", "harga_khusus"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    item = update_barang_harga_customer(
        item,
        id_barang=int(data["id_barang"]),
        id_customer=int(data["id_customer"]),
        harga_khusus=data["harga_khusus"],
    )

    return jsonify({"message": "Berhasil update barang harga customer", "data": barang_harga_customer_dict(item)}), 200

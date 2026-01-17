from decimal import Decimal, InvalidOperation

from flask import jsonify, request

from app.services.barang_service import (
    list_barangs,
    create_barang,
    update_barang,
    delete_barang,
    get_barang,
)
from app.utils.serializers import barang_dict
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
    stok_filter = request.args.get("stok_filter", "").strip().lower()
    if stok_filter in ("", "all"):
        stok_filter = None
    elif stok_filter not in ("low", "positive"):
        return jsonify({"message": "Parameter stok_filter tidak valid"}), 400

    harga_min = request.args.get("harga_min", "").strip()
    harga_max = request.args.get("harga_max", "").strip()
    try:
        harga_min = Decimal(harga_min) if harga_min != "" else None
        harga_max = Decimal(harga_max) if harga_max != "" else None
    except InvalidOperation:
        return jsonify({"message": "Parameter harga tidak valid"}), 400
    if harga_min is not None and harga_max is not None and harga_min > harga_max:
        return jsonify({"message": "Rentang harga tidak valid"}), 400

    barangs, total = list_barangs(
        page=page,
        per_page=per_page,
        query_text=query_text,
        stok_filter=stok_filter,
        harga_min=harga_min,
        harga_max=harga_max,
    )
    pages = (total + per_page - 1) // per_page if per_page else 1
    return jsonify({
        "data": [barang_dict(item, include_prices=True) for item in barangs],
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

    missing = require_fields(data, ["nama_barang", "stok", "harga_tetap"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    barang = create_barang(
        nama_barang=data["nama_barang"],
        stok=int(data["stok"]),
        harga_tetap=data["harga_tetap"],
    )

    return jsonify({"message": "Berhasil menambah barang", "data": barang_dict(barang)}), 201


def update(barang_id):
    barang = get_barang(barang_id)
    if not barang:
        return jsonify({"message": "Barang tidak ditemukan"}), 404

    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["nama_barang", "stok", "harga_tetap"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    barang = update_barang(
        barang,
        nama_barang=data["nama_barang"],
        stok=int(data["stok"]),
        harga_tetap=data["harga_tetap"],
    )

    return jsonify({"message": "Berhasil update barang", "data": barang_dict(barang)}), 200


def destroy(barang_id):
    success = delete_barang(barang_id)
    if not success:
        return jsonify({"message": "Barang tidak ditemukan"}), 404

    return jsonify({"message": "Berhasil hapus barang"}), 200

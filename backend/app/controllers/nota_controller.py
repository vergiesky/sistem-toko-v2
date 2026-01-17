from datetime import datetime, time
from zoneinfo import ZoneInfo

from flask import jsonify, request

from app.services.nota_service import (
    list_notas,
    next_number_for_date,
    delete_nota,
    create_nota_with_details,
)
from app.utils.serializers import nota_dict
from app.utils.validation import get_json_dict, require_fields


def _parse_datetime(value):
    if isinstance(value, str):
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            try:
                return datetime.strptime(value, "%Y-%m-%d")
            except ValueError:
                return None
    return None


def index():
    try:
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))
    except ValueError:
        return jsonify({"message": "Parameter pagination tidak valid"}), 400

    if page < 1 or per_page < 0:
        return jsonify({"message": "Parameter pagination tidak valid"}), 400

    query_text = request.args.get("query", "").strip()
    date_from_raw = request.args.get("date_from", "").strip()
    date_to_raw = request.args.get("date_to", "").strip()

    date_from = _parse_datetime(date_from_raw) if date_from_raw else None
    if date_from_raw and not date_from:
        return jsonify({"message": "Parameter tanggal dari tidak valid"}), 400
    date_to = _parse_datetime(date_to_raw) if date_to_raw else None
    if date_to_raw and not date_to:
        return jsonify({"message": "Parameter tanggal sampai tidak valid"}), 400

    if date_from:
        date_from = datetime.combine(date_from.date(), time.min)
    if date_to:
        date_to = datetime.combine(date_to.date(), time.max)

    notas, total = list_notas(
        page=page,
        per_page=per_page,
        query_text=query_text,
        date_from=date_from,
        date_to=date_to,
    )
    pages = (total + per_page - 1) // per_page if per_page else 1
    return jsonify({
        "data": [
            nota_dict(item, include_customer=True, include_details=True, include_detail_barang=True)
            for item in notas
        ],
        "meta": {
            "page": page,
            "per_page": per_page,
            "total": total,
            "pages": pages,
        },
    }), 200


def next_number():
    today = datetime.now(ZoneInfo("Asia/Jakarta")).date()
    next_num = next_number_for_date(today)
    return jsonify({"date": today.isoformat(), "next_number": next_num}), 200


def destroy(nota_id):
    success = delete_nota(nota_id)
    if not success:
        return jsonify({"message": "Nota tidak ditemukan"}), 404

    return jsonify({"message": "Berhasil hapus nota"}), 200


def store_with_detail():
    data = get_json_dict(request)
    if data is None:
        return jsonify({"message": "Data tidak valid"}), 400

    missing = require_fields(data, ["tanggal", "nomor_nota", "total", "items"])
    if missing:
        return jsonify({"message": f"Field wajib: {', '.join(missing)}"}), 400

    if not isinstance(data["items"], list) or len(data["items"]) < 1:
        return jsonify({"message": "Items harus berupa array dan minimal 1 item"}), 400

    for item in data["items"]:
        if not isinstance(item, dict):
            return jsonify({"message": "Item tidak valid"}), 400
        item_missing = require_fields(item, ["id_barang", "jumlah", "harga_satuan", "sub_total"])
        if item_missing:
            return jsonify({"message": f"Field item wajib: {', '.join(item_missing)}"}), 400

    tanggal = _parse_datetime(data["tanggal"])
    if not tanggal:
        return jsonify({"message": "Format tanggal tidak valid"}), 400

    result = create_nota_with_details(data, tanggal=tanggal)
    if result.get("error"):
        return jsonify({"message": result["error"], "data": result.get("data"), "error": result.get("detail")}), result["status"]

    nota = result["nota"]
    return jsonify({
        "message": "Berhasil membuat nota",
        "data": nota_dict(nota, include_customer=True, include_details=True, include_detail_barang=True),
    }), 201

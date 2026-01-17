from sqlalchemy import func, or_, cast, String

from app.extensions import db
from app.models import Nota, DetailNota, Barang, Customer


def list_notas(
    page=1,
    per_page=10,
    query_text=None,
    date_from=None,
    date_to=None,
):
    query = Nota.query.outerjoin(Customer)
    if query_text:
        like_value = f"%{query_text}%"
        numeric_query = int(query_text) if query_text.isdigit() else None
        query = query.filter(
            or_(
                Nota.nama_customer.ilike(like_value),
                Customer.nama_customer.ilike(like_value),
                cast(Nota.nomor_nota, String).ilike(like_value),
                Nota.nomor_nota == numeric_query if numeric_query is not None else False,
            )
        )
    if date_from:
        query = query.filter(Nota.tanggal >= date_from)
    if date_to:
        query = query.filter(Nota.tanggal <= date_to)

    query = query.order_by(Nota.tanggal.desc())
    total = query.count()
    if per_page and per_page > 0:
        items = query.offset((page - 1) * per_page).limit(per_page).all()
    else:
        items = query.all()
    return items, total


def next_number_for_date(date_value):
    last_number = (
        db.session.query(func.max(Nota.nomor_nota))
        .filter(func.date(Nota.tanggal) == date_value)
        .scalar()
    )
    return (last_number or 0) + 1


def delete_nota(nota_id):
    nota = Nota.query.filter_by(id_nota=nota_id).first()
    if not nota:
        return False
    db.session.delete(nota)
    db.session.commit()
    return True


def create_nota_with_details(data, tanggal):
    allow_negative = bool(data.get("allow_negative", False))
    items_by_barang = {}
    for item in data["items"]:
        id_barang = int(item["id_barang"])
        jumlah = int(item["jumlah"])
        items_by_barang[id_barang] = items_by_barang.get(id_barang, 0) + jumlah

    barang_ids = list(items_by_barang.keys())

    try:
        db.session.begin()

        barangs = (
            Barang.query.filter(Barang.id_barang.in_(barang_ids))
            .with_for_update()
            .all()
        )

        if len(barangs) != len(barang_ids):
            db.session.rollback()
            return {"error": "Barang tidak ditemukan", "status": 404}

        barangs_map = {barang.id_barang: barang for barang in barangs}

        if not allow_negative:
            insufficient = []
            for id_barang, jumlah in items_by_barang.items():
                barang = barangs_map[id_barang]
                if barang.stok < jumlah:
                    insufficient.append(
                        {
                            "id_barang": id_barang,
                            "nama_barang": barang.nama_barang,
                            "stok": barang.stok,
                            "jumlah": jumlah,
                        }
                    )
            if insufficient:
                db.session.rollback()
                return {"error": "Stok tidak mencukupi", "status": 409, "data": insufficient}

        nota = Nota(
            id_customer=data.get("id_customer"),
            nama_customer=data.get("nama_customer"),
            tanggal=tanggal,
            nomor_nota=int(data["nomor_nota"]),
            total=data["total"],
        )
        db.session.add(nota)
        db.session.flush()

        for item in data["items"]:
            detail = DetailNota(
                id_nota=nota.id_nota,
                id_barang=int(item["id_barang"]),
                jumlah=int(item["jumlah"]),
                harga_satuan=item["harga_satuan"],
                sub_total=item["sub_total"],
            )
            db.session.add(detail)

        for id_barang, jumlah in items_by_barang.items():
            barang = barangs_map[id_barang]
            barang.stok = barang.stok - jumlah

        db.session.commit()
        db.session.refresh(nota)
        return {"nota": nota}
    except Exception as error:
        db.session.rollback()
        return {"error": "Gagal membuat nota", "status": 500, "detail": str(error)}

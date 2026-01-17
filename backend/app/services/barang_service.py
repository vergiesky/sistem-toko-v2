from app.extensions import db
from app.models import Barang


def list_barangs(
    page=1,
    per_page=10,
    query_text=None,
    stok_filter=None,
    harga_min=None,
    harga_max=None,
):
    query = Barang.query
    if query_text:
        query = query.filter(Barang.nama_barang.ilike(f"%{query_text}%"))
    if stok_filter == "low":
        query = query.filter(Barang.stok <= 0)
    elif stok_filter == "positive":
        query = query.filter(Barang.stok > 0)
    if harga_min is not None:
        query = query.filter(Barang.harga_tetap >= harga_min)
    if harga_max is not None:
        query = query.filter(Barang.harga_tetap <= harga_max)

    query = query.order_by(Barang.id_barang.desc())
    total = query.count()
    if per_page and per_page > 0:
        items = query.offset((page - 1) * per_page).limit(per_page).all()
    else:
        items = query.all()
    return items, total


def get_barang(barang_id):
    return Barang.query.filter_by(id_barang=barang_id).first()


def create_barang(nama_barang, stok, harga_tetap):
    barang = Barang(
        nama_barang=nama_barang,
        stok=stok,
        harga_tetap=harga_tetap,
    )
    db.session.add(barang)
    db.session.commit()
    return barang


def update_barang(barang, nama_barang, stok, harga_tetap):
    barang.nama_barang = nama_barang
    barang.stok = stok
    barang.harga_tetap = harga_tetap
    db.session.commit()
    return barang


def delete_barang(barang_id):
    barang = get_barang(barang_id)
    if not barang:
        return False
    db.session.delete(barang)
    db.session.commit()
    return True

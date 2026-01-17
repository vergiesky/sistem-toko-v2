from app.extensions import db
from app.models import BarangHargaCustomer


def list_barang_harga_customers():
    return BarangHargaCustomer.query.all()


def get_barang_harga_customer(item_id):
    return BarangHargaCustomer.query.filter_by(id_barang_harga_customer=item_id).first()


def create_barang_harga_customer(id_barang, id_customer, harga_khusus):
    item = BarangHargaCustomer(
        id_barang=id_barang,
        id_customer=id_customer,
        harga_khusus=harga_khusus,
    )
    db.session.add(item)
    db.session.commit()
    return item


def update_barang_harga_customer(item, id_barang, id_customer, harga_khusus):
    item.id_barang = id_barang
    item.id_customer = id_customer
    item.harga_khusus = harga_khusus
    db.session.commit()
    return item

from sqlalchemy import or_

from app.extensions import db
from app.models import Customer


def list_customers(page=1, per_page=10, query_text=None):
    query = Customer.query
    if query_text:
        like_value = f"%{query_text}%"
        query = query.filter(
            or_(
                Customer.nama_customer.ilike(like_value),
                Customer.nama_perusahaan.ilike(like_value),
                Customer.alamat.ilike(like_value),
            )
        )

    query = query.order_by(Customer.id_customer.desc())
    total = query.count()
    if per_page and per_page > 0:
        items = query.offset((page - 1) * per_page).limit(per_page).all()
    else:
        items = query.all()
    return items, total


def get_customer(customer_id):
    return Customer.query.filter_by(id_customer=customer_id).first()


def create_customer(nama_customer, nama_perusahaan, alamat):
    customer = Customer(
        nama_customer=nama_customer,
        nama_perusahaan=nama_perusahaan,
        alamat=alamat,
    )
    db.session.add(customer)
    db.session.commit()
    return customer


def update_customer(customer, nama_customer, nama_perusahaan, alamat):
    customer.nama_customer = nama_customer
    customer.nama_perusahaan = nama_perusahaan
    customer.alamat = alamat
    db.session.commit()
    return customer


def delete_customer(customer_id):
    customer = get_customer(customer_id)
    if not customer:
        return False
    db.session.delete(customer)
    db.session.commit()
    return True

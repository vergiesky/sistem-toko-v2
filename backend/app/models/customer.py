from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql import func

from app.extensions import db


class Customer(db.Model):
    __tablename__ = "customers"

    id_customer = db.Column(Integer, primary_key=True)
    nama_customer = db.Column(String, nullable=False)
    nama_perusahaan = db.Column(String, nullable=False)
    alamat = db.Column(String, nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    notas = db.relationship(
        "Nota",
        back_populates="customer",
        cascade="all, delete-orphan",
    )
    barang_harga_customers = db.relationship(
        "BarangHargaCustomer",
        back_populates="customer",
        cascade="all, delete-orphan",
    )

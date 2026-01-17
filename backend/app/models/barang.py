from sqlalchemy import Integer, String, Numeric, DateTime
from sqlalchemy.sql import func

from app.extensions import db


class Barang(db.Model):
    __tablename__ = "barangs"

    id_barang = db.Column(Integer, primary_key=True)
    nama_barang = db.Column(String, nullable=False)
    stok = db.Column(Integer, nullable=False)
    harga_tetap = db.Column(Numeric(12, 2), nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    barang_harga_customers = db.relationship(
        "BarangHargaCustomer",
        back_populates="barang",
        cascade="all, delete-orphan",
    )
    detail_notas = db.relationship(
        "DetailNota",
        back_populates="barang",
        cascade="all, delete-orphan",
    )

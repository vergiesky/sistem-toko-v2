from sqlalchemy import Integer, Numeric, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.extensions import db


class BarangHargaCustomer(db.Model):
    __tablename__ = "barang_harga_customers"

    id_barang_harga_customer = db.Column(Integer, primary_key=True)
    id_barang = db.Column(Integer, ForeignKey("barangs.id_barang"), nullable=False)
    id_customer = db.Column(Integer, ForeignKey("customers.id_customer"), nullable=False)
    harga_khusus = db.Column(Numeric(12, 2), nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    barang = db.relationship("Barang", back_populates="barang_harga_customers")
    customer = db.relationship("Customer", back_populates="barang_harga_customers")

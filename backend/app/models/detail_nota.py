from sqlalchemy import Integer, Numeric, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.extensions import db


class DetailNota(db.Model):
    __tablename__ = "detail_notas"

    id_detail_nota = db.Column(Integer, primary_key=True)
    id_nota = db.Column(Integer, ForeignKey("notas.id_nota"), nullable=False)
    id_barang = db.Column(Integer, ForeignKey("barangs.id_barang"), nullable=False)
    jumlah = db.Column(Integer, nullable=False)
    harga_satuan = db.Column(Numeric(12, 2), nullable=False)
    sub_total = db.Column(Numeric(12, 2), nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    nota = db.relationship("Nota", back_populates="detail_notas")
    barang = db.relationship("Barang", back_populates="detail_notas")

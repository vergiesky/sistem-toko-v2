from sqlalchemy import Integer, String, DateTime, Numeric, ForeignKey
from sqlalchemy.sql import func

from app.extensions import db


class Nota(db.Model):
    __tablename__ = "notas"

    id_nota = db.Column(Integer, primary_key=True)
    id_customer = db.Column(Integer, ForeignKey("customers.id_customer"), nullable=True)
    nama_customer = db.Column(String, nullable=True)
    tanggal = db.Column(DateTime, nullable=False)
    nomor_nota = db.Column(Integer, nullable=False)
    total = db.Column(Numeric(12, 2), nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

    customer = db.relationship("Customer", back_populates="notas")
    detail_notas = db.relationship(
        "DetailNota",
        back_populates="nota",
        cascade="all, delete-orphan",
    )

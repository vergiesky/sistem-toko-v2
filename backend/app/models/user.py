from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql import func

from app.extensions import db


class User(db.Model):
    __tablename__ = "users"

    id_user = db.Column(Integer, primary_key=True)
    username = db.Column(String, nullable=False)
    password = db.Column(String, nullable=False)
    created_at = db.Column(DateTime, server_default=func.now())
    updated_at = db.Column(DateTime, onupdate=func.now())

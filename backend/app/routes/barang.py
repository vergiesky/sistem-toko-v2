from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.controllers import barang_controller


barang_bp = Blueprint("barang", __name__)


@barang_bp.get("/barang")
@jwt_required()
def index():
    return barang_controller.index()


@barang_bp.post("/barang/create")
@jwt_required()
def store():
    return barang_controller.store()


@barang_bp.put("/barang/update/<int:barang_id>")
@jwt_required()
def update(barang_id):
    return barang_controller.update(barang_id)


@barang_bp.delete("/barang/delete/<int:barang_id>")
@jwt_required()
def destroy(barang_id):
    return barang_controller.destroy(barang_id)

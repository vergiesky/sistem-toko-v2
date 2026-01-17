from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.controllers import barang_harga_customer_controller


barang_harga_customer_bp = Blueprint("barang_harga_customer", __name__)


@barang_harga_customer_bp.get("/barang-harga-customer")
@jwt_required()
def index():
    return barang_harga_customer_controller.index()


@barang_harga_customer_bp.post("/barang-harga-customer/create")
@jwt_required()
def store():
    return barang_harga_customer_controller.store()


@barang_harga_customer_bp.put("/barang-harga-customer/update/<int:item_id>")
@jwt_required()
def update(item_id):
    return barang_harga_customer_controller.update(item_id)

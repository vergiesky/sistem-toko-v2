from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.controllers import customer_controller


customers_bp = Blueprint("customers", __name__)


@customers_bp.get("/customers")
@jwt_required()
def index():
    return customer_controller.index()


@customers_bp.post("/customers/create")
@jwt_required()
def store():
    return customer_controller.store()


@customers_bp.put("/customers/update/<int:customer_id>")
@jwt_required()
def update(customer_id):
    return customer_controller.update(customer_id)


@customers_bp.delete("/customers/delete/<int:customer_id>")
@jwt_required()
def destroy(customer_id):
    return customer_controller.destroy(customer_id)

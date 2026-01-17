from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.controllers import nota_controller


nota_bp = Blueprint("nota", __name__)


@nota_bp.get("/nota")
@jwt_required()
def index():
    return nota_controller.index()


@nota_bp.get("/nota/next-number")
@jwt_required()
def next_number():
    return nota_controller.next_number()


@nota_bp.delete("/nota/delete/<int:nota_id>")
@jwt_required()
def destroy(nota_id):
    return nota_controller.destroy(nota_id)


@nota_bp.post("/nota/print")
@jwt_required()
def store_with_detail():
    return nota_controller.store_with_detail()

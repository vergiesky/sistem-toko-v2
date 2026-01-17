from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from config import Config
from app.extensions import db, jwt, migrate
from app.routes import (
    auth_bp,
    users_bp,
    customers_bp,
    barang_bp,
    barang_harga_customer_bp,
    nota_bp,
)


def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(users_bp, url_prefix="/api")
    app.register_blueprint(customers_bp, url_prefix="/api")
    app.register_blueprint(barang_bp, url_prefix="/api")
    app.register_blueprint(barang_harga_customer_bp, url_prefix="/api")
    app.register_blueprint(nota_bp, url_prefix="/api")

    @app.get("/")
    def home():
        return jsonify({"message": "Sistem Toko API"})

    return app

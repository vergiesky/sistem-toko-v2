import os
from datetime import timedelta


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "SUPABASE_URL",
        "postgresql+psycopg://user:pass@localhost:5432/sistem_toko",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {
            "prepare_threshold": None,
        },
    }
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

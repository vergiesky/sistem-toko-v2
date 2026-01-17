from werkzeug.security import generate_password_hash, check_password_hash

from app.extensions import db
from app.models import User


def create_user(username, password):
    user = User(username=username, password=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    return user


def get_user_by_username(username):
    return User.query.filter_by(username=username).first()


def check_password(user, password):
    return check_password_hash(user.password, password)

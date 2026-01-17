from werkzeug.security import generate_password_hash, check_password_hash

from app.extensions import db
from app.models import User


def get_user_by_id(user_id):
    return User.query.get(user_id)


def update_profile(user, username=None):
    if username is not None:
        user.username = username
    db.session.commit()
    return user


def update_password(user, old_password, new_password):
    if not check_password_hash(user.password, old_password):
        return False
    user.password = generate_password_hash(new_password)
    db.session.commit()
    return True

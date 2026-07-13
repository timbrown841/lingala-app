from datetime import datetime, timedelta
from passlib.context import CryptContext
import jwt
import os

SECRET = os.environ.get("JWT_SECRET", "supersecret")
ALGO = "HS256"

pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd.hash(password)

def verify_password(password: str, hashed: str):
    return pwd.verify(password, hashed)

def create_token(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, SECRET, algorithm=ALGO)

def decode_token(token: str):
    return jwt.decode(token, SECRET, algorithms=[ALGO])
from fastapi import APIRouter, HTTPException
from models import RegisterRequest, LoginRequest
from auth import hash_password, verify_password, create_token
from db import db

router = APIRouter(prefix="/auth")

@router.post("/register")
async def register(req: RegisterRequest):
    existing = await db.users.find_one({"email": req.email})
    if existing:
        raise HTTPException(400, "Email already registered")

    hashed = hash_password(req.password)

    user = {
        "email": req.email,
        "password": hashed
    }

    result = await db.users.insert_one(user)
    return {"message": "Registered successfully"}

@router.post("/login")
async def login(req: LoginRequest):
    user = await db.users.find_one({"email": req.email})
    if not user:
        raise HTTPException(400, "Invalid credentials")

    if not verify_password(req.password, user["password"]):
        raise HTTPException(400, "Invalid credentials")

    token = create_token(str(user["_id"]))

    return {
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "email": user["email"]
        }
    }
from pydantic import BaseModel, EmailStr
from typing import List

class User(BaseModel):
    id: str
    email: EmailStr

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Unit(BaseModel):
    id: int
    title: str

class Lesson(BaseModel):
    id: int
    title: str

class LessonContent(BaseModel):
    id: int
    title: str
    words: List[dict]
    quiz: List[dict]

class AttemptRequest(BaseModel):
    correct: bool
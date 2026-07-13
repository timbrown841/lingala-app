from fastapi import APIRouter, HTTPException, Depends
from models import AttemptRequest
from db import db

router = APIRouter(prefix="/course")

# Dummy data — replace with DB later
UNITS = [
    {"id": 1, "title": "Unit 1: Greetings"},
    {"id": 2, "title": "Unit 2: Family"},
    {"id": 3, "title": "Unit 3: Food"},
]

LESSONS = {
    1: [
        {"id": 1, "title": "Lesson 1: Basic Greetings"},
        {"id": 2, "title": "Lesson 2: Responding to Greetings"},
    ]
}

CONTENT = {
    1: {
        "id": 1,
        "title": "Basic Greetings",
        "words": [
            {"lingala": "Mbote", "english": "Hello"},
            {"lingala": "Sango nini?", "english": "How are you?"},
        ],
        "quiz": [
            {"question": "What does 'Mbote' mean?", "answer": "Hello"}
        ]
    }
}

@router.get("/units")
async def get_units():
    return UNITS

@router.get("/units/{unit_id}/lessons")
async def get_lessons(unit_id: int):
    if unit_id not in LESSONS:
        raise HTTPException(404, "Unit not found")
    return LESSONS[unit_id]

@router.get("/lessons/{lesson_id}")
async def get_lesson_content(lesson_id: int):
    if lesson_id not in CONTENT:
        raise HTTPException(404, "Lesson not found")
    return CONTENT[lesson_id]

@router.post("/lessons/{lesson_id}/attempts")
async def submit_attempt(lesson_id: int, req: AttemptRequest):
    await db.attempts.insert_one({
        "lesson_id": lesson_id,
        "correct": req.correct
    })
    return {"message": "Attempt recorded"}
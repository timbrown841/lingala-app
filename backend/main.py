from fastapi import FastAPI
from routes.auth_routes import router as auth_router
from routes.course_routes import router as course_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(course_router)

@app.get("/")
def root():
    return {"message": "Lingala API running"}
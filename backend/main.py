from fastapi import FastAPI, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import json

from utils.career_recommendation import recommend_careers
from utils.pdf_export import export_career_plan_pdf
from seed_data.careers import CAREERS
from seed_data.skills import SKILLS

app = FastAPI()

origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# JWT settings
class Settings(BaseModel):
    authjwt_secret_key: str = "supersecretkey"

@AuthJWT.load_config
def get_config():
    return Settings()

# Mock DB
db_users = {}

# Models
class UserRegister(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserProfile(BaseModel):
    username: str
    email: str
    skills: List[str] = []
    interests: List[str] = []
    resume_text: Optional[str] = None

class CareerSuggestionRequest(BaseModel):
    skills: List[str]
    interests: List[str]
    resume_text: Optional[str] = None

class CareerSuggestionResponse(BaseModel):
    careers: List[str]
    roadmap: List[str]

class FeedbackRequest(BaseModel):
    username: str
    feedback: str

# Auth endpoints
@app.post("/auth/register")
def register(user: UserRegister):
    if user.username in db_users:
        raise HTTPException(status_code=400, detail="Username already exists")
    db_users[user.username] = {
        "username": user.username,
        "password": user.password,
        "email": user.email,
        "skills": [],
        "interests": [],
        "resume_text": None
    }
    return {"msg": "User registered successfully"}

@app.post("/auth/login")
def login(user: UserLogin, Authorize: AuthJWT = Depends()):
    if user.username not in db_users or db_users[user.username]["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = Authorize.create_access_token(subject=user.username)
    return {"access_token": access_token}

@app.post("/auth/logout")
def logout():
    # JWT stateless; client-side token removal
    return {"msg": "Logged out"}

# Profile CRUD
@app.get("/profile/{username}", response_model=UserProfile)
def get_profile(username: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    user = db_users.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/profile/{username}", response_model=UserProfile)
def update_profile(username: str, profile: UserProfile, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    if username not in db_users:
        raise HTTPException(status_code=404, detail="User not found")
    db_users[username].update(profile.dict())
    return db_users[username]

# Career APIs
@app.get("/careers")
def list_careers():
    return CAREERS

@app.get("/skills")
def list_skills():
    return SKILLS

@app.post("/careers/suggest", response_model=CareerSuggestionResponse)
def suggest_careers(req: CareerSuggestionRequest, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    careers, roadmap = recommend_careers(req.skills, req.interests, req.resume_text)
    return CareerSuggestionResponse(careers=careers, roadmap=roadmap)

@app.post("/careers/export-pdf")
def export_pdf(username: str, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    user = db_users.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    pdf_path = export_career_plan_pdf(user)
    return FileResponse(pdf_path, media_type='application/pdf', filename="career_plan.pdf")

# Feedback for AI improvement
@app.post("/careers/feedback")
def feedback(feedback: FeedbackRequest, Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()
    # Store feedback (mock)
    return {"msg": "Feedback received, thank you!"}

# WebSocket for notifications
@app.websocket("/ws/notifications/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Hello {username}, you sent: {data}")
    except WebSocketDisconnect:
        pass

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
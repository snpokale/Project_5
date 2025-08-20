from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_register_and_login():
    r = client.post("/auth/register", json={"username": "testuser", "password": "testpass", "email": "t@e.com"})
    assert r.status_code == 200
    r = client.post("/auth/login", json={"username": "testuser", "password": "testpass"})
    assert r.status_code == 200
    assert "access_token" in r.json()

def test_list_careers():
    r = client.get("/careers")
    assert r.status_code == 200
    assert isinstance(r.json(), list)

def test_career_suggestion():
    token = client.post("/auth/register", json={"username": "suggest", "password": "pass", "email": "s@e.com"})
    token = client.post("/auth/login", json={"username": "suggest", "password": "pass"}).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    r = client.post("/careers/suggest", json={
        "skills": ["Python"],
        "interests": ["AI"],
        "resume_text": "machine learning"
    }, headers=headers)
    assert r.status_code == 200
    data = r.json()
    assert "careers" in data and isinstance(data["careers"], list)

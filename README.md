# IntellliCareer Navigator
A fullstack career recommendation app (backend: FastAPI/Python, frontend: Bootstrap/JS). Features:
- Users input skills, interests and scores; server suggests careers using dataset from Kaggle + added enrichment and rule-based matching
- Visual results, career explanations, skill-gap suggestions, export PDF, save profile (local)
- Scripts to download Kaggle data (requires Kaggle API keys)

Quickstart:
- Backend: python -m venv venv && source venv/bin/activate && pip install -r backend/requirements.txt
- Run: uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
- Frontend: open frontend/index.html (or serve with static server)
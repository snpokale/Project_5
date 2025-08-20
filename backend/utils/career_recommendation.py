def recommend_careers(skills, interests, resume_text):
    # Mock ML logic: match skills/interests to careers
    careers = []
    roadmap = []
    if "Python" in skills:
        careers.append("Software Engineer")
        roadmap.append("Learn advanced Python, Build projects, Apply for SWE roles")
    if "Data Analysis" in skills:
        careers.append("Data Scientist")
        roadmap.append("Learn ML, Participate in Kaggle, Apply for DS roles")
    if not careers:
        careers = ["Project Manager", "Business Analyst"]
        roadmap = ["Take PM course, Get certification, Apply for PM jobs"]
    # Resume parsing (basic keyword extraction)
    if resume_text:
        if "machine learning" in resume_text.lower():
            careers.append("Machine Learning Engineer")
            roadmap.append("Master ML libraries, Work on ML projects")
    return careers, roadmap

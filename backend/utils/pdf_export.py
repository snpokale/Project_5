from fpdf import FPDF

def export_career_plan_pdf(user):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Career Plan", ln=True, align='C')
    pdf.cell(200, 10, txt=f"User: {user['username']}", ln=True)
    pdf.cell(200, 10, txt=f"Email: {user['email']}", ln=True)
    pdf.cell(200, 10, txt=f"Skills: {', '.join(user['skills'])}", ln=True)
    pdf.cell(200, 10, txt=f"Interests: {', '.join(user['interests'])}", ln=True)
    pdf.cell(200, 10, txt=f"Resume: {user.get('resume_text', '')[:100]}...", ln=True)
    path = f"{user['username']}_career_plan.pdf"
    pdf.output(path)
    return path

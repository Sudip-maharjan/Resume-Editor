from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import random

class PersonalInfo(BaseModel):
    name: str = "John Doe"
    email: str = "john.doe@example.com"
    phone: str = "(555) 123-4567"

class ExperienceEntry(BaseModel):
    id: str
    title: str = "Software Engineer"
    company: str = "Tech Solutions Inc."
    dates: str = "Jan 2020 - Present"
    description: str = "Developed and maintained web applications using modern technologies."

class EducationEntry(BaseModel):
    id: str
    institution: str = "State University"
    degree: str = "Bachelor of Science in Computer Science"
    dates: str = "Sep 2016 - May 2020"

class Resume(BaseModel):
    personal_info: PersonalInfo
    summary: str = "Experienced software developer with a passion for creating efficient and scalable solutions."
    experience: List[ExperienceEntry] = []
    education: List[EducationEntry] = []
    skills: List[str] = ["Python", "JavaScript", "React", "FastAPI"]

class AIEnhanceRequest(BaseModel):
    content: str

ENHANCEMENT_TEMPLATES = {
    "summary": [
        "Dynamic and results-driven professional with extensive experience in {content}. Proven track record of delivering innovative solutions and exceeding performance targets.",
        "Accomplished {content} specialist with demonstrated expertise in driving operational excellence and fostering collaborative team environments.",
        "Strategic-minded professional leveraging {content} to deliver measurable business impact and optimize organizational effectiveness."
    ],
    "experience": [
        "Spearheaded {content} initiatives resulting in improved efficiency and enhanced user experience across multiple platforms.",
        "Led cross-functional teams to {content}, delivering solutions that exceeded stakeholder expectations and drove significant business growth.",
        "Architected and implemented {content} strategies, resulting in streamlined processes and enhanced system performance."
    ]
}

resume_db = {
    "user_resume": Resume(
        personal_info=PersonalInfo(
            name="Hari Bahadur Khadka",
            email="HariBdrK@gmail.com",
            phone="+977 980-87126534"
        ),
        summary="Passionate software engineer with 5+ years of experience in full-stack development. Skilled in creating scalable web applications and leading development teams.",
        experience=[
            ExperienceEntry(
                id="exp1",
                title="Senior Software Engineer",
                company="Innovation Labs",
                dates="Mar 2021 - Present",
                description="Lead a team of 5 developers in building enterprise-level web applications. Implemented CI/CD pipelines that reduced deployment time by 60%. Mentored junior developers and conducted code reviews."
            ),
            ExperienceEntry(
                id="exp2",
                title="Software Developer",
                company="TechStart Solutions",
                dates="Jun 2019 - Feb 2021",
                description="Developed responsive web applications using React and Node.js. Collaborated with UX/UI designers to implement user-friendly interfaces. Optimized database queries resulting in 40% performance improvement."
            )
        ],
        education=[
            EducationEntry(
                id="edu1",
                institution="University of Technology",
                degree="Bachelor of Science in Computer Science",
                dates="Sep 2015 - May 2019"
            )
        ],
        skills=["Python", "JavaScript", "React", "Node.js", "FastAPI", "PostgreSQL", "Docker", "AWS"]
    )
}

app = FastAPI(title="Resume Editor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Resume Editor API is running!"}

@app.get("/resume", response_model=Resume)
async def get_resume():
    """Retrieve the stored resume."""
    if "user_resume" in resume_db:
        return resume_db["user_resume"]
    raise HTTPException(status_code=404, detail="Resume not found")

@app.post("/save-resume")
async def save_resume(resume: Resume):
    """Save the entire resume data."""
    resume_db["user_resume"] = resume
    return {"message": "Resume saved successfully!"}

@app.post("/ai-enhance")
async def ai_enhance(request: AIEnhanceRequest):
    original_content = request.content.strip()

    if not original_content:
        return {"enhanced_content": "No content provided for enhancement."}

    if len(original_content) < 100 or any(word in original_content.lower() for word in ["summary", "professional", "experienced"]):
        templates = ENHANCEMENT_TEMPLATES["summary"]
    else:
        templates = ENHANCEMENT_TEMPLATES["experience"]

    template = random.choice(templates)
    enhanced_content = template.format(content=original_content)
    return {"enhanced_content": enhanced_content}

@app.post("/upload-resume")
async def upload_resume():
    """Mock endpoint for resume upload - returns sample data"""
    return resume_db["user_resume"]

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Resume Editor API is operational"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
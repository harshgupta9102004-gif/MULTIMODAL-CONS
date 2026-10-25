import os
import logging
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv

from gemini_service import (
    analyze_safety,
    analyze_crack,
    generate_project_plan,
    get_assistant_advice,
    has_api_key
)
from mock_data import PRELIMINARY_DISCLAIMER

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("construction_platform.api")

app = FastAPI(
    title="Multimodal Construction Intelligence Platform API",
    description="Backend API powering construction site safety, crack diagnostics, project planning, and AI advisory.",
    version="1.0.0"
)

# Export aliases for Vercel Python runtime
application = app
handler = app

# Enable CORS for frontend Vite development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Request / Response Models -----------------

class ProjectPlanRequest(BaseModel):
    project_type: str = Field(default="Commercial Complex", description="Type of construction project")
    budget: float = Field(default=150.0, description="Total budget in Lakhs (INR)")
    duration_months: int = Field(default=12, description="Target duration in months")
    location: Optional[str] = Field(default="Metro Tier 1", description="Project location or city tier")

class AssistantRequest(BaseModel):
    message: str = Field(..., description="User construction inquiry or question")
    context: Optional[str] = Field(default="", description="Optional additional site context or weather details")


# ----------------- Endpoints -----------------

@app.get("/")
def root():
    return {
        "name": "Multimodal Construction Intelligence Platform API",
        "status": "online",
        "gemini_configured": has_api_key(),
        "mode": "Live Gemini Multimodal" if has_api_key() else "High-Fidelity Demonstration Mode",
        "version": "1.0.0",
        "disclaimer": PRELIMINARY_DISCLAIMER
    }

@app.get("/api/health")
@app.get("/health")
def health_check():
    key_configured = has_api_key()
    return {
        "status": "healthy",
        "gemini_api_key_configured": key_configured,
        "mode": "live_gemini" if key_configured else "demonstration",
        "message": "Connected to Gemini API" if key_configured else "Running in fallback Demonstration Mode (provide GEMINI_API_KEY to enable live multimodal inference)"
    }


@app.post("/api/safety-analysis")
@app.post("/safety-analysis")
async def safety_analysis(file: UploadFile = File(...)):
    """
    Multimodal construction site safety audit endpoint.
    Accepts site image (JPG/PNG), identifies hazards, evaluates PPE compliance under OSHA / IS 456.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type: {file.content_type}. Please upload an image (JPG, PNG, WebP)."
        )

    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        result = analyze_safety(image_bytes=image_bytes, mime_type=file.content_type)
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error in safety_analysis")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/crack-analysis")
@app.post("/crack-analysis")
async def crack_analysis(file: UploadFile = File(...)):
    """
    Multimodal crack diagnostics & structural integrity assessment.
    Accepts wall or concrete surface photo, classifies defect type, width, urgency, and repair remedies.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type: {file.content_type}. Please upload an image (JPG, PNG, WebP)."
        )

    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        result = analyze_crack(image_bytes=image_bytes, mime_type=file.content_type)
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error in crack_analysis")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/api/project-planning")
@app.post("/project-planning")
def project_planning(req: ProjectPlanRequest):
    """
    Construction project planning endpoint.
    Generates milestone phases, risk evaluations, and material requirement estimates.
    """
    try:
        if req.budget <= 0:
            raise HTTPException(status_code=400, detail="Budget must be greater than zero.")
        if req.duration_months <= 0:
            raise HTTPException(status_code=400, detail="Duration must be at least 1 month.")

        result = generate_project_plan(
            project_type=req.project_type,
            budget=req.budget,
            duration_months=req.duration_months,
            location=req.location or ""
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error in project_planning")
        raise HTTPException(status_code=500, detail=f"Planning generation failed: {str(e)}")


@app.post("/api/assistant")
@app.post("/assistant")
def assistant_advisory(req: AssistantRequest):
    """
    Interactive construction engineering assistant endpoint.
    Answers technical questions on codes, concrete curing, weather protocols, and site safety.
    """
    try:
        if not req.message.strip():
            raise HTTPException(status_code=400, detail="Inquiry message cannot be empty.")

        result = get_assistant_advice(message=req.message, context=req.context or "")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Unexpected error in assistant_advisory")
        raise HTTPException(status_code=500, detail=f"Assistant response failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=port, reload=True)

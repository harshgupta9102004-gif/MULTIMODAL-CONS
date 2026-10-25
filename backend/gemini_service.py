import os
import base64
import json
import logging
import requests
from dotenv import load_dotenv
from mock_data import (
    PRELIMINARY_DISCLAIMER,
    DEMO_SAFETY_ANALYSIS,
    DEMO_CRACK_ANALYSIS,
    generate_demo_project_plan,
    generate_demo_assistant_response
)

load_dotenv()
logger = logging.getLogger("construction_platform.gemini")

def get_api_key() -> str:
    return os.getenv("GEMINI_API_KEY", "").strip()

def has_api_key() -> bool:
    key = get_api_key()
    return bool(key and key != "your_gemini_api_key_here")

def clean_json_response(raw_text: str) -> dict:
    """Strip markdown code fence blocks if present and parse JSON."""
    text = raw_text.strip()
    if text.startswith("```json"):
        text = text[len("```json"):].strip()
    elif text.startswith("```"):
        text = text[3:].strip()
    if text.endswith("```"):
        text = text[:-3].strip()
    return json.loads(text)

def call_gemini_api(prompt: str, image_bytes: bytes = None, mime_type: str = "image/jpeg") -> dict:
    """
    Call Gemini Generative Language API via standard HTTPS REST endpoint.
    Supports both multimodal (image + text) and text-only requests.
    """
    api_key = get_api_key()
    if not api_key or api_key == "your_gemini_api_key_here":
        raise ValueError("No valid GEMINI_API_KEY configured")

    # Construct request parts
    parts = []
    if image_bytes:
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")
        parts.append({
            "inline_data": {
                "mime_type": mime_type,
                "data": encoded_image
            }
        })
    parts.append({"text": prompt})

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": parts
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "response_mime_type": "application/json"
        }
    }

    # Try gemini-2.5-flash first, fallback to gemini-1.5-flash if needed
    models = ["gemini-2.5-flash", "gemini-1.5-flash"]
    last_err = None

    for model_name in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
        try:
            response = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=35)
            if response.status_code == 200:
                data = response.json()
                candidate_text = data["candidates"][0]["content"]["parts"][0]["text"]
                parsed = clean_json_response(candidate_text)
                parsed["demo_mode"] = False
                parsed["disclaimer"] = PRELIMINARY_DISCLAIMER
                return parsed
            else:
                last_err = f"Gemini API returned status {response.status_code}: {response.text}"
                logger.warning(f"Model {model_name} failed: {last_err}")
        except Exception as e:
            last_err = str(e)
            logger.warning(f"Exception calling {model_name}: {last_err}")

    raise RuntimeError(f"All Gemini models failed: {last_err}")


def analyze_safety(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    """Analyze construction site image for PPE compliance and safety hazards."""
    if not has_api_key():
        logger.info("Using demo mode for safety analysis (no API key).")
        return DEMO_SAFETY_ANALYSIS

    prompt = """
You are a senior construction safety auditor evaluating a site photograph according to OSHA (Occupational Safety and Health Administration) and IS 456 / IS 3696 safety standards.

Examine the provided image carefully and return a valid JSON object with EXACTLY the following structure:
{
  "summary": "Concise 1-2 sentence executive summary of safety observation.",
  "risk_level": "Low" | "Medium" | "High" | "Critical",
  "safety_score": integer between 0 and 100,
  "findings": [
    "Specific observation 1 regarding PPE or hazard",
    "Specific observation 2 regarding scaffolding, housekeeping, or machinery"
  ],
  "recommendations": [
    "Actionable immediate corrective measure 1",
    "Actionable measure 2"
  ],
  "ppe_compliance": [
    {"item": "Safety Helmets (Hard Hats)", "status": "Compliant"|"Partial"|"Non-Compliant"|"Not Visible", "compliance_rate": "e.g. 80%"},
    {"item": "High-Visibility Vests", "status": "Compliant"|"Partial"|"Non-Compliant"|"Not Visible", "compliance_rate": "e.g. 50%"},
    {"item": "Steel-Toe Boots", "status": "Compliant"|"Partial"|"Non-Compliant"|"Not Visible", "compliance_rate": "e.g. 100%"},
    {"item": "Fall Protection Harnesses", "status": "Compliant"|"Partial"|"Non-Compliant"|"Not Visible", "compliance_rate": "e.g. N/A or 0%"}
  ],
  "hazards": [
    {"hazard": "Description of hazard", "severity": "Low"|"Medium"|"High"|"Critical", "remedy": "Corrective remedy"}
  ],
  "standards_referenced": ["OSHA 1926", "IS 456"]
}

Be thorough, precise, and practical for construction superintendents.
"""
    try:
        return call_gemini_api(prompt=prompt, image_bytes=image_bytes, mime_type=mime_type)
    except Exception as e:
        logger.error(f"Safety analysis API error: {e}. Falling back to demo data.")
        demo = dict(DEMO_SAFETY_ANALYSIS)
        demo["note"] = f"Live API unavailable ({str(e)[:90]}...). Showing demonstration mode."
        return demo


def analyze_crack(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    """Analyze concrete/masonry crack defects for structural integrity."""
    if not has_api_key():
        logger.info("Using demo mode for crack analysis (no API key).")
        return DEMO_CRACK_ANALYSIS

    prompt = """
You are a licensed structural forensic engineer analyzing an image of a wall or concrete surface defect.

Assess the visible cracks and defects and return a valid JSON object with EXACTLY the following structure:
{
  "summary": "1-2 sentence diagnostic summary of the crack/defect.",
  "risk_level": "Low" | "Medium" | "High" | "Critical",
  "defect_type": "Hairline" | "Settlement" | "Structural Shear" | "Thermal Expansion" | "Spalling" | "Other",
  "estimated_width_mm": "Estimated width range, e.g. 0.2 - 0.5 mm or 3.0 - 5.0 mm",
  "urgency": "Immediate" | "High" | "Moderate" | "Routine",
  "findings": [
    "Specific engineering observation 1 (orientation, direction, pattern)",
    "Specific engineering observation 2 (signs of water ingress, rebar spalling, or microcracking)"
  ],
  "recommendations": [
    "Corrective action 1 (e.g. tell-tale crack monitor, UPV test)",
    "Corrective action 2 (e.g. low-viscosity epoxy injection, structural re-grouting)"
  ],
  "root_causes": [
    "Plausible root cause 1",
    "Plausible root cause 2"
  ],
  "recommended_repairs": [
    "Specific repair method 1",
    "Specific repair method 2"
  ]
}

Note: Emphasize that visual crack diagnostics are preliminary and require physical calibration and core testing for critical structures.
"""
    try:
        return call_gemini_api(prompt=prompt, image_bytes=image_bytes, mime_type=mime_type)
    except Exception as e:
        logger.error(f"Crack analysis API error: {e}. Falling back to demo data.")
        demo = dict(DEMO_CRACK_ANALYSIS)
        demo["note"] = f"Live API unavailable ({str(e)[:90]}...). Showing demonstration mode."
        return demo


def generate_project_plan(project_type: str, budget: float, duration_months: int, location: str = "") -> dict:
    """Generate construction project timeline, risk breakdown, and material estimates."""
    if not has_api_key():
        logger.info("Using demo mode for project plan (no API key).")
        return generate_demo_project_plan(project_type, budget, duration_months, location)

    prompt = f"""
You are a senior construction project manager and cost estimator.
Develop a structured construction project plan for the following project:
- Project Type: {project_type}
- Total Budget: ₹{budget:,.2f} Lakhs (INR)
- Target Duration: {duration_months} Months
- Location Context: {location or 'Urban Indian Metro'}

Return a valid JSON object with EXACTLY the following structure:
{{
  "summary": "High-level summary of the construction project plan and financial timeline.",
  "risk_level": "Low" | "Medium" | "High",
  "project_type": "{project_type}",
  "total_budget": {budget},
  "duration_months": {duration_months},
  "monthly_burn_rate": {round(budget / max(1, duration_months), 2)},
  "findings": [
    "Key feasibility and resource insight 1",
    "Key risk factor 2 (weather, supply chain, regulatory)"
  ],
  "recommendations": [
    "Project management recommendation 1",
    "Procurement or scheduling recommendation 2"
  ],
  "phases": [
    {{
      "phase": "Phase Name (e.g. Phase 1: Foundation & Earthwork)",
      "duration": "e.g. Months 1-3",
      "percentage_budget": "e.g. 25%",
      "budget_allocation": number in Lakhs,
      "key_tasks": ["Task A", "Task B", "Task C"]
    }},
    {{
      "phase": "Phase 2: Superstructure & Framing",
      "duration": "e.g. Months 4-7",
      "percentage_budget": "e.g. 40%",
      "budget_allocation": number in Lakhs,
      "key_tasks": ["Task A", "Task B"]
    }},
    {{
      "phase": "Phase 3: MEP & Interior Rough-Ins",
      "duration": "e.g. Months 8-10",
      "percentage_budget": "e.g. 20%",
      "budget_allocation": number in Lakhs,
      "key_tasks": ["Task A", "Task B"]
    }},
    {{
      "phase": "Phase 4: Finishing & Handover",
      "duration": "e.g. Months 11-12",
      "percentage_budget": "e.g. 15%",
      "budget_allocation": number in Lakhs,
      "key_tasks": ["Task A", "Task B"]
    }}
  ],
  "material_estimates": {{
    "cement_bags": {round(budget * 18.5)},
    "steel_metric_tonnes": {round(budget * 0.42, 1)},
    "sand_aggregates_cft": {round(budget * 48.0)}
  }}
}}
"""
    try:
        return call_gemini_api(prompt=prompt)
    except Exception as e:
        logger.error(f"Project planning API error: {e}. Falling back to demo data.")
        demo = generate_demo_project_plan(project_type, budget, duration_months, location)
        demo["note"] = f"Live API unavailable ({str(e)[:90]}...). Showing demonstration mode."
        return demo


def get_assistant_advice(message: str, context: str = "") -> dict:
    """Provide AI-driven civil/construction engineering advisory for user queries."""
    if not has_api_key():
        logger.info("Using demo mode for assistant advice (no API key).")
        return generate_demo_assistant_response(message)

    prompt = f"""
You are an expert civil engineer and site operations consultant on a construction intelligence platform.
Answer the following construction inquiry:
User Query: "{message}"
Additional Context: "{context}"

Provide a professional, rigorous, practical answer conforming to civil engineering standards (IS codes, OSHA, ACI, Eurocodes).

Return a valid JSON object with EXACTLY the following structure:
{{
  "summary": "Concise title or summary of the advisory response",
  "risk_level": "Low" | "Medium" | "High",
  "response": "Detailed, practical answer explaining the engineering principles, standard codes, and operational steps.",
  "findings": [
    "Key engineering principle or diagnostic observation 1",
    "Key operational or regulatory factor 2"
  ],
  "recommendations": [
    "Direct actionable step 1",
    "Direct actionable step 2",
    "Inspection or quality control verification 3"
  ]
}}
"""
    try:
        return call_gemini_api(prompt=prompt)
    except Exception as e:
        logger.error(f"Assistant advice API error: {e}. Falling back to demo data.")
        demo = generate_demo_assistant_response(message)
        demo["note"] = f"Live API unavailable ({str(e)[:90]}...). Showing demonstration mode."
        return demo

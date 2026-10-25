# Multimodal Construction Intelligence Platform 🏗️
### Skill Wallet Capstone Project 1 • AI-Powered Decision Support System

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://share.streamlit.io)
[![Python 3.8+](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, multimodal decision-support system designed to assist construction project managers, site superintendents, QA/QC engineers, and safety auditors across site monitoring, structural crack diagnostics, project estimation, and real-time site advisory.

Powered by **Google Gemini Multimodal AI** (`gemini-2.5-flash`), with **Pollinations AI** 3D visualization, benchmarked against **OSHA 1926** and Indian Standard **IS 456:2000 / NBC 2016** codes, and equipped with a graceful fallback to **High-Fidelity Demonstration Mode**.

---

## 🌟 Supported Deployment Architectures

This repository supports **two full production experiences**:
1. **Streamlit Cloud Deployment (`streamlit_app.py` / `app.py`):** Zero-configuration, zero-database, 1-click cloud deployable on [Streamlit Community Cloud](https://share.streamlit.io).
2. **Modern Full-Stack Architecture:** Decoupled **React 19 + Vite + Tailwind CSS** frontend communicating with a high-performance **FastAPI (Python)** backend via strict JSON contracts.

---

## ⚠️ Mandatory Preliminary Engineering Disclaimer

> **PRELIMINARY AI ASSESSMENT ONLY:** All computer-vision and LLM evaluations produced by this platform are automated preliminary assessments based on visible 2D pixels and user inputs. They cannot detect subsurface stress, soil subsidence, internal rebar corrosion, or concealed structural flaws. This application does not replace mandatory physical audits by licensed structural engineers or certified safety officers (**OSHA 1926 / IS 456 / NBC**).

---

## 🚀 1-Click Deployment on Streamlit Community Cloud

Deploy directly to the web from your GitHub repository in 2 minutes:

1. Push this repository to your GitHub account: `https://github.com/harshgupta9102004-gif/MULTIMODAL-CONS.git`
2. Go to **[share.streamlit.io](https://share.streamlit.io/)** and sign in with GitHub.
3. Click **"New app"**.
4. Configure your repository details:
   - **Repository:** `harshgupta9102004-gif/MULTIMODAL-CONS`
   - **Branch:** `main`
   - **Main file path:** `streamlit_app.py` (or `app.py`)
5. *(Optional for live Gemini inference)* Click **"Advanced settings..."** ➔ **"Secrets"** and enter:
   ```toml
   GEMINI_API_KEY = "AIzaSy...your_gemini_api_key_here"
   ```
6. Click **"Deploy!"**. Your platform is immediately live with a public URL!

> *Note: If no API key is supplied, the platform automatically runs in High-Fidelity Demonstration Mode with built-in sample images for all modules.*

---

## 💻 Local Windows Installation & Run Guide

### Prerequisites
- **Python 3.8+** (Tested on Python 3.10, 3.11, 3.12, and 3.14)
- **Node.js v18+** & **npm** *(only required if running the React + Vite frontend)*
- **Git**

---

### Option 1: Running the Streamlit Platform (Easiest & Recommended)

#### Step 1: Install Python Requirements
Open PowerShell in the project directory:
```powershell
python -m pip install -r requirements.txt
```

#### Step 2: (Optional) Set your Gemini API Key
Create or edit `.env` in the project root:
```ini
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can also securely type your key directly into the application's sidebar at runtime).*

#### Step 3: Launch Streamlit
Double-click `run_streamlit.bat` or run:
```powershell
python -m streamlit run streamlit_app.py
```
👉 The platform will automatically open in your browser at: **`http://localhost:8501`**

---

### Option 2: Running the React + FastAPI Full-Stack App

#### Step 1: Start Backend (FastAPI)
```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
- API Docs & Swagger UI: **`http://127.0.0.1:8000/docs`**

#### Step 2: Start Frontend (React + Vite)
In a new terminal window:
```powershell
cd frontend
npm install
npm run dev
```
- Web Application: **`http://localhost:5173`**

#### Or use the 1-Click Starter:
Double-click `start_platform.bat` to launch both servers simultaneously!

---

## 🏗️ Core Modules & Feature Breakdown

### 🦺 Module 1: Construction Site Safety & PPE Audit (Epic 2)
- **Multimodal Visual Inspection:** Accepts site photographs (JPG/PNG/WebP) and passes them to Gemini Vision models with structured prompt engineering.
- **Safety Benchmarking:** Assesses compliance against **OSHA 1926** and Indian Standard **IS 456 / IS 3696**.
- **PPE Matrix:** Evaluates hard hats (ANSI Z89.1), high-visibility reflective apparel, steel-toe boots, and fall protection harnesses at elevation.
- **Hazard Severity Scoring:** Highlights unprotected perimeter scaffolding, trailing 415V electrical lines, and missing guardrails with severity rankings (`Low`, `Medium`, `High`, `Critical`) and actionable remedies.
- **Reporting:** Export structured JSON audit documents for site superintendents.

### 🔍 Module 2: Crack Diagnostics & Structural Integrity (Epic 2)
- **Forensic Defect Classification:** Classifies concrete/masonry wall fractures into:
  - *Hairline Drying Shrinkage* (<0.3 mm)
  - *Differential Foundation Settlement*
  - *Structural Shear Fractures* (45° load-path cracks)
  - *Concrete Spalling & Delamination* (rebar oxidation)
  - *Thermal Expansion & Contraction Fractures*
- **Crack Width Estimation:** Estimates surface crack opening in millimeters against allowable crack thresholds (0.3 mm under IS 456 / ACI 224R).
- **Engineering Remedies:** Prescribes low-viscosity epoxy pressure injection, polyurethane water-stop grouting, or carbon-fiber reinforced polymer (CFRP) composite wrapping.

### 📊 Module 3: Project Planning & Real Estate Valuation (Epic 3)
- **Dynamic Parameter Inputs:** Structure type (High-Rise, Commercial IT Complex, Industrial PEB, Villa), built-up area (Sq.Ft.), location tier (Tier 1 Metro, Tier 2 City, Tier 3), and milestone completion slider (0–100%).
- **Financial Analytics:**
  - Total project budget in INR (₹ Lakhs & Crores)
  - Capital expenditure incurred to date
  - Monthly cash-flow burn rate
  - Market asset valuation based on location tier premiums and completed milestones
- **Raw Material Forecasting (BoQ):**
  - Grade 53/43 Cement (50kg bags & metric tonnes)
  - TMT Reinforcing Steel (Fe 500D in metric tonnes)
  - Graded Coarse & Fine Aggregates (CFT)
- **3D Architectural Rendering:** Integrates **Pollinations AI** to dynamically synthesize photorealistic 3D conceptual architectural renderings based on selected structural parameters.

### 💬 Module 4: Daily Site Assistant & Weather-Aware Advisory (Epic 5)
- **Dynamic Weather Safety Protocols:**
  - *High Wind (> 45 km/h):* Mandatory suspension of tower crane hoisting, jib weathervaning, and evacuation of high-elevation scaffolds.
  - *Heavy Monsoon Rain:* Foundation excavation shoring checks, immediate halting of exterior concrete pours, and IP65/GFCI electrical de-energization.
  - *Extreme Heat (> 38°C):* Hot weather concreting protocols (ACI 305R), chilled batch water, double wet burlap moist curing, and OSHA worker hydration cycles.
  - *Normal Weather:* Standard daily QA/QC checklists and morning 5-minute Toolbox Talks.
- **Conversational Decision Support:** Multi-turn interactive chatbot answering civil engineering questions conforming to IS codes, curing timelines, and safety regulations.

---

## 📁 Repository Structure

```
mutimodal/
├── .streamlit/
│   └── config.toml           # Sleek dark theme configuration for Streamlit
├── backend/
│   ├── .env.example          # Template environment file
│   ├── requirements.txt      # FastAPI, uvicorn, requests dependencies
│   ├── main.py               # FastAPI REST endpoints
│   ├── gemini_service.py     # Gemini Multimodal API integration
│   └── mock_data.py          # Demonstration dataset & standards
├── frontend/
│   ├── package.json          # React 19, Vite, Tailwind dependencies
│   ├── vite.config.js        # Vite config with backend proxy
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── src/
│       ├── App.jsx           # Main React component
│       └── components/       # UI components for all 4 modules
├── app.py                    # Streamlit deployment entrypoint forwarder
├── streamlit_app.py          # Complete standalone Streamlit Application
├── requirements.txt          # Root Python dependencies for Streamlit Cloud
├── run_streamlit.bat         # 1-Click Streamlit runner for Windows
├── run_backend.bat           # 1-Click FastAPI runner for Windows
├── run_frontend.bat          # 1-Click React frontend runner for Windows
├── start_platform.bat        # 1-Click starter for full-stack mode
├── .gitignore                # Protects secrets & node_modules
└── README.md                 # Complete platform documentation
```

---

## 🔌 API Endpoints (FastAPI Backend)

| Method | Endpoint | Description | Request Format |
|---|---|---|---|
| `GET` | `/api/health` | Health & mode check | None |
| `POST` | `/api/safety-analysis` | Site safety & PPE audit | `multipart/form-data` (`file`) |
| `POST` | `/api/crack-analysis` | Wall & concrete crack forensics | `multipart/form-data` (`file`) |
| `POST` | `/api/project-planning` | Phased schedule & BoQ estimation | JSON (`project_type`, `budget`, `duration_months`, `location`) |
| `POST` | `/api/assistant` | Technical engineering advisory | JSON (`message`, `context`) |

---

## 🛠️ Tech Stack & Dependencies

- **Frontend (Streamlit):** Python Streamlit, Altair, Pillow
- **Frontend (Full-Stack):** React 19, Vite, JavaScript, Tailwind CSS, Lucide Icons
- **Backend:** FastAPI, Uvicorn, Python-dotenv, Requests, Httpx
- **Generative AI:** Google Gemini 2.5 Multimodal Flash REST API
- **Architectural 3D Engine:** Pollinations AI Generative Vision API
- **Codes & Standards:** OSHA 1926, IS 456:2000, IS 3696, NBC 2016, ACI 224R / 305R

---

## 📄 License
This project is developed as part of the **Skill Wallet Capstone Project** and is licensed under the MIT License.

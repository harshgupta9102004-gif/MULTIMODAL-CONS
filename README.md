# Multimodal Construction Intelligence Platform

An intelligent, full-stack decision-support system designed to assist construction superintendents, project managers, and civil engineers across safety monitoring, forensic crack diagnostics, project estimation, and site advisory.

Powered by a **React + Vite** frontend, a high-performance **FastAPI (Python)** backend, and **Google Gemini Multimodal AI** with high-fidelity graceful demonstration fallback.

---

## 🏗️ Core Features

1. **Construction Safety & PPE Audit (Multimodal Vision)**
   - Upload site photos (JPG, PNG, WebP)
   - Evaluates PPE compliance (Hard hats, Class 2/3 high-vis vests, steel-toe boots, fall harnesses)
   - Benchmarked against OSHA 1926 and IS 456 / IS 3696 standards
   - Generates overall safety score (0-100), hazard severity ranking (Low, Medium, High, Critical), corrective remedies, and downloadable JSON reports

2. **Crack Diagnostics & Structural Integrity Assessment**
   - Upload concrete or masonry wall surface photos
   - Classifies defect morphology (Hairline, Differential Settlement, Structural Shear, Thermal Expansion, Spalling)
   - Provides sub-millimeter crack width estimation, inspection urgency, forensic root causes, and recommended engineering repairs (epoxy injection, structural re-grouting, CFRP wrapping)

3. **Project Planning & Material Forecasting**
   - Interactive parameters: Project structure type, budget (₹ Lakhs / Crores), duration (months), location tier
   - Generates 4-phase milestone schedules and monthly CapEx cash-flow burn rate
   - Computes raw material requirements (Cement bags, TMT reinforcing steel metric tonnes, Sand & Aggregate volume)

4. **AI Construction Engineering Assistant & Weather Advisory**
   - Multi-turn conversational engineering consultant
   - Dynamic site weather selector (Normal, High Winds > 45 km/h, Heavy Monsoon Rain, Extreme Heat > 38°C)
   - Real-time guidance for concrete curing duration (IS 456), crane operation suspension rules, scaffold ties, and quality control

---

## ⚠️ Important Engineering Disclaimer

> **PRELIMINARY AI ASSESSMENT ONLY:** All computer-vision and LLM evaluations produced by this platform are automated preliminary assessments based on visible 2D pixels and user inputs. They cannot detect subsurface stress, soil subsidence, internal rebar corrosion, or concealed structural flaws. This application does not replace mandatory physical audits by licensed structural engineers or certified safety officers (OSHA / IS 456 / NBC).

---

## 📁 Project Architecture & Folder Structure

```
mutimodal/
├── backend/
│   ├── .env.example          # Environment template with GEMINI_API_KEY
│   ├── .env                  # Active environment variables
│   ├── requirements.txt      # Python dependencies
│   ├── main.py               # FastAPI server & endpoints
│   ├── gemini_service.py     # Gemini Multimodal API client & prompt engineering
│   └── mock_data.py          # High-fidelity fallback demo dataset & safety standards
├── frontend/
│   ├── package.json          # React, Vite, Tailwind, Lucide dependencies
│   ├── vite.config.js        # Vite config with backend API proxy
│   ├── tailwind.config.js    # Tailwind styling config
│   ├── postcss.config.js     # PostCSS autoprefixer config
│   ├── index.html            # HTML5 template
│   └── src/
│       ├── main.jsx          # React DOM entrypoint
│       ├── App.jsx           # Main container & tab router
│       ├── index.css         # Tailwind & theme styles
│       └── components/
│           ├── Navbar.jsx            # Brand navigation & mode badge
│           ├── DisclaimerBanner.jsx  # Preliminary safety notice
│           ├── DashboardOverview.jsx # 4 Interactive feature cards
│           ├── SafetyAnalysis.jsx    # Feature 1: Safety & PPE audit
│           ├── CrackAnalysis.jsx     # Feature 2: Crack diagnostics
│           ├── ProjectPlanning.jsx   # Feature 3: Project planning
│           └── AIAssistant.jsx       # Feature 4: Engineering chat & weather
├── run_backend.bat           # Windows 1-click backend runner
├── run_frontend.bat          # Windows 1-click frontend runner
├── start_platform.bat        # Windows 1-click starter for both services
└── README.md                 # Complete documentation
```

---

## ⚡ Quick Start (Windows)

### Prerequisites
- **Python 3.8+** (Tested on Python 3.10, 3.11, 3.12, 3.14)
- **Node.js v18+** & **npm**

---

### Step 1: Install Backend Dependencies

Open PowerShell or Command Prompt in the project root:

```powershell
cd backend
python -m pip install -r requirements.txt
```

### Step 2: (Optional) Configure Gemini API Key

Copy `.env.example` to `.env` in the `backend/` folder:

```powershell
copy .env.example .env
```

Open `backend/.env` and insert your Google Gemini API key:
```ini
GEMINI_API_KEY=AIzaSy...your_gemini_api_key_here
```
> *Note: If you do not have an API key right now, leave it empty. The platform will automatically run in **High-Fidelity Demonstration Mode** so all 4 features remain 100% functional for evaluation.*

---

### Step 3: Install Frontend Dependencies

```powershell
cd ..\frontend
npm install
```

---

### Step 4: Run the Application

You can launch both services using the provided launcher scripts or run them in two separate terminal windows:

#### Option A: 1-Click Launcher (Windows)
Double-click `start_platform.bat` or run:
```powershell
.\start_platform.bat
```

#### Option B: Manual Command Line
**Terminal 1 (Backend):**
```powershell
cd backend
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
*API Swagger Docs available at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)*

**Terminal 2 (Frontend):**
```powershell
cd frontend
npm run dev
```
*Frontend Application opens at: [http://localhost:5173](http://localhost:5173)*

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Request Format |
|---|---|---|---|
| `GET` | `/api/health` | Service health & Gemini configuration status | None |
| `POST` | `/api/safety-analysis` | Site safety & PPE compliance audit | `multipart/form-data` (`file`) |
| `POST` | `/api/crack-analysis` | Wall & concrete crack diagnostics | `multipart/form-data` (`file`) |
| `POST` | `/api/project-planning` | Phased schedule & material estimations | `application/json` (`project_type`, `budget`, `duration_months`, `location`) |
| `POST` | `/api/assistant` | Technical engineering advisory & weather context | `application/json` (`message`, `context`) |

---

## 🛡️ Data Contract & Return Structure

All endpoints return strict, well-typed JSON objects conforming to the platform contract:
- `summary`: String
- `risk_level`: `"Low"` | `"Medium"` | `"High"` | `"Critical"`
- `findings`: Array of observation strings
- `recommendations`: Array of actionable directives
- `disclaimer`: Preliminary computerized evaluation notice
- `demo_mode`: Boolean indicator

---

## 🛠️ Built for Skill Wallet Capstone Project
- **Frontend:** React 19, Tailwind CSS, Lucide Icons, Vite
- **Backend:** FastAPI, Uvicorn, Python-dotenv, Requests
- **Intelligence:** Google Gemini 2.5 Multimodal REST API

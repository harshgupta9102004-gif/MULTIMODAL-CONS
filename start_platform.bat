@echo off
echo ========================================================
echo Launching Multimodal Construction Intelligence Platform
echo ========================================================
echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000...
start "BuildIntel Backend (FastAPI)" cmd /c "cd /d "%~dp0backend" && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting React Vite Frontend on http://localhost:5173...
start "BuildIntel Frontend (React Vite)" cmd /c "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Both servers started!
echo Frontend will be accessible at: http://localhost:5173
echo API Docs will be accessible at: http://127.0.0.1:8000/docs
echo.
pause

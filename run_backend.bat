@echo off
echo ========================================================
echo Starting Multimodal Construction Intelligence Platform API
echo Backend running on http://127.0.0.1:8000
echo ========================================================
cd /d "%~dp0backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
pause

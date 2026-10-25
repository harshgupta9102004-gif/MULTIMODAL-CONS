@echo off
echo ========================================================
echo Starting Multimodal Construction Intelligence Frontend
echo Frontend running on http://localhost:5173
echo ========================================================
cd /d "%~dp0frontend"
npm run dev
pause

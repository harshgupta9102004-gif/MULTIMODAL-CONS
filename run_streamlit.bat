@echo off
echo ========================================================
echo Starting Multimodal Construction Intelligence Platform
echo Launching Streamlit Application...
echo ========================================================
cd /d "%~dp0"
python -m streamlit run streamlit_app.py
pause

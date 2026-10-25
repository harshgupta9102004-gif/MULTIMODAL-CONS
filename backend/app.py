"""
FastAPI entrypoint for Vercel deployment.
Exports the FastAPI app instance from main.py.
"""
from main import app

# Ensure 'app', 'application', and 'handler' are all exported at top-level
application = app
handler = app

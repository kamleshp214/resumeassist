import sys
import os

# Add the parent directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set environment variable for Vercel
os.environ['VERCEL_ENV'] = 'production'

# Import the Flask app
from app import app

# For Vercel Python serverless function
# The app variable is used directly by Vercel

import sys
import os

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the Flask app
from app import app as flask_app

# Define a handler for Vercel serverless functions
def handler(request, context):
    return flask_app

# For Vercel Python serverless function
app = flask_app

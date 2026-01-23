import os
import sys

# adjust path to import main app
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


# set environment variables for testing
os.environ.setdefault("JWT_SECRET", "test-secret")
os.environ.setdefault("MONGODB_URL", "mongodb://localhost:27017/test")
os.environ.setdefault("ACCESS_TOKEN_EXPIRE_MINUTES", "30")

# import testclient
from fastapi.testclient import TestClient

# import existing login api
from main import app

# init test client
client = TestClient(app)


# test login success with correct credentials
def test_login_success():
    response = client.post("/api/login", json={"username": "matthew", "password": "matthew"})
    assert response.status_code == 200
    assert "access_token" in response.json()

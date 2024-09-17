import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.auth.models import User
from backend.auth.utils import verify_password, create_access_token

client = TestClient(app)

def test_user_registration():
    response = client.post(
        "/auth/register",
        json={"username": "testuser", "email": "test@example.com", "password": "testpassword"}
    )
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["username"] == "testuser"
    assert response.json()["email"] == "test@example.com"

def test_user_login():
    # First, register a user
    client.post(
        "/auth/register",
        json={"username": "loginuser", "email": "login@example.com", "password": "loginpassword"}
    )
    
    # Now, try to login
    response = client.post(
        "/auth/login",
        data={"username": "loginuser", "password": "loginpassword"}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_token_generation_and_validation():
    user = User(id=1, username="tokenuser", email="token@example.com")
    token = create_access_token(data={"sub": user.username})
    
    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "tokenuser"
    assert response.json()["email"] == "token@example.com"

def test_password_hashing_and_verification():
    password = "testpassword"
    hashed_password = User.get_password_hash(password)
    
    assert verify_password(password, hashed_password)
    assert not verify_password("wrongpassword", hashed_password)

# HUMAN ASSISTANCE NEEDED
# The following test cases might need to be adjusted based on the actual implementation details:
# - Test for duplicate user registration
# - Test for invalid login credentials
# - Test for token expiration
# - Test for password reset functionality (if implemented)
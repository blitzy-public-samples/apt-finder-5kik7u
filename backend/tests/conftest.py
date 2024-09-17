import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import Base
from app.dependencies import get_db

# Test database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="module")
def client():
    def override_get_db():
        try:
            db = TestingSessionLocal()
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c

@pytest.fixture
def mock_user():
    return {
        "id": 1,
        "username": "testuser",
        "email": "testuser@example.com",
        "hashed_password": "hashedpassword123"
    }

@pytest.fixture
def mock_task():
    return {
        "id": 1,
        "title": "Test Task",
        "description": "This is a test task",
        "status": "pending",
        "user_id": 1
    }

# HUMAN ASSISTANCE NEEDED
# Additional mock data fixtures may be required depending on the specific needs of the application.
# Please review and add any necessary fixtures for other models or complex data structures.
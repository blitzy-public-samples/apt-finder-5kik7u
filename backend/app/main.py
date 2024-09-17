from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api import auth, filters, listings, subscriptions
from backend.app.core.config import settings
from backend.app.db.session import engine
from backend.app.db.base import Base

app = FastAPI()

def create_tables():
    Base.metadata.create_all(engine)

def get_application():
    application = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    application.include_router(auth.router)
    application.include_router(filters.router)
    application.include_router(listings.router)
    application.include_router(subscriptions.router)
    
    create_tables()
    
    return application

# HUMAN ASSISTANCE NEEDED
# The following block might need additional configuration or error handling
# for production readiness. Please review and adjust as necessary.
app = get_application()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
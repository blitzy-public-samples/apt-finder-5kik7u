import asyncio
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.services.zillow_service import ZillowService
from backend.app.db.models import ApartmentListing
from backend.app.core.config import settings

ZILLOW_API_KEY = settings.ZILLOW_API_KEY
UPDATE_INTERVAL = timedelta(hours=1)

@asyncio.coroutine
async def update_listings(db: Session):
    # HUMAN ASSISTANCE NEEDED
    # The confidence level for this function is below 0.8. Please review and adjust as necessary.
    # Additionally, error handling and logging should be implemented for production readiness.
    
    zillow_service = ZillowService(ZILLOW_API_KEY)
    new_listings = await zillow_service.fetch_listings()
    
    for listing in new_listings:
        existing_listing = db.query(ApartmentListing).filter_by(zillow_id=listing['zillow_id']).first()
        
        if existing_listing:
            # Update existing listing
            for key, value in listing.items():
                setattr(existing_listing, key, value)
        else:
            # Create new listing
            new_listing = ApartmentListing(**listing)
            db.add(new_listing)
    
    db.commit()

@asyncio.coroutine
async def run_periodic_update():
    while True:
        db = next(get_db())
        await update_listings(db)
        await asyncio.sleep(UPDATE_INTERVAL.total_seconds())
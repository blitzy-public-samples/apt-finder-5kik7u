from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ApartmentListing(BaseModel):
    id: str
    listing_date: datetime
    rent: float
    broker_fee: float
    square_footage: float
    bedrooms: int
    bathrooms: int
    available_date: datetime
    street_address: str
    zillow_url: str
    created_at: datetime
    updated_at: datetime
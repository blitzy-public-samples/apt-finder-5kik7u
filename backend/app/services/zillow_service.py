import requests
from typing import List, Dict
from backend.app.core.config import settings
from backend.app.schema.listing import ApartmentListing

ZILLOW_API_BASE_URL = settings.ZILLOW_API_BASE_URL

class ZillowService:
    def __init__(self, api_key: str):
        self.api_key = api_key

    # HUMAN ASSISTANCE NEEDED
    # The following function has a confidence level of 0.7 and may need adjustments for production readiness
    def get_listings(self, zip_codes: List[str], filters: Dict) -> List[ApartmentListing]:
        # Construct API request URL
        url = f"{ZILLOW_API_BASE_URL}/listings"
        
        # Prepare query parameters
        params = {
            "api_key": self.api_key,
            "zip_codes": ",".join(zip_codes),
            **filters
        }
        
        # Send GET request to Zillow API
        response = requests.get(url, params=params)
        response.raise_for_status()
        
        # Parse response JSON
        data = response.json()
        
        # Convert response data to ApartmentListing objects
        listings = []
        for item in data.get("listings", []):
            listing = ApartmentListing(
                id=item.get("id"),
                address=item.get("address"),
                price=item.get("price"),
                bedrooms=item.get("bedrooms"),
                bathrooms=item.get("bathrooms"),
                square_feet=item.get("square_feet"),
                # Add more fields as necessary
            )
            listings.append(listing)
        
        return listings
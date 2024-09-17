from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schema.listing import ListingResponse
from backend.app.db.models import ApartmentListing, User, Filter
from backend.app.core.security import get_current_user

router = APIRouter()

# HUMAN ASSISTANCE NEEDED
# The following function needs review and potential modifications for production readiness.
# The confidence level is below 0.8, indicating that additional checks, error handling, or optimizations may be required.

@router.get('/listings')
def get_filtered_listings(
    filter_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> list[ListingResponse]:
    # Retrieve user's filter
    user_filter = db.query(Filter).filter(Filter.id == filter_id, Filter.user_id == current_user.id).first()
    if not user_filter:
        raise HTTPException(status_code=404, detail="Filter not found")

    # Apply filter criteria to listings query
    query = db.query(ApartmentListing)
    
    if user_filter.min_price:
        query = query.filter(ApartmentListing.price >= user_filter.min_price)
    if user_filter.max_price:
        query = query.filter(ApartmentListing.price <= user_filter.max_price)
    if user_filter.min_bedrooms:
        query = query.filter(ApartmentListing.bedrooms >= user_filter.min_bedrooms)
    if user_filter.max_bedrooms:
        query = query.filter(ApartmentListing.bedrooms <= user_filter.max_bedrooms)
    # Add more filter criteria as needed

    # Execute query and return results
    listings = query.all()
    return [ListingResponse.from_orm(listing) for listing in listings]
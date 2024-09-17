from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schema.filter import FilterCreate, FilterUpdate
from backend.app.db.models import Filter, User
from backend.app.core.security import get_current_user

router = APIRouter()

@router.post('/filters')
def create_filter(filter_data: FilterCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # HUMAN ASSISTANCE NEEDED
    # This function needs review to ensure it meets all requirements and handles potential errors correctly
    new_filter = Filter(**filter_data.dict(), user_id=current_user.id)
    db.add(new_filter)
    db.commit()
    db.refresh(new_filter)
    return new_filter

@router.get('/filters')
def get_user_filters(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    filters = db.query(Filter).filter(Filter.user_id == current_user.id).all()
    return filters
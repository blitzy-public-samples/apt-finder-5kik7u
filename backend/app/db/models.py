from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
    last_login = Column(DateTime)

class ApartmentListing(Base):
    __tablename__ = "apartment_listings"

    id = Column(Integer, primary_key=True, index=True)
    listing_date = Column(DateTime, nullable=False)
    rent = Column(Float, nullable=False)
    broker_fee = Column(Float)
    square_footage = Column(Float)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    available_date = Column(DateTime)
    street_address = Column(String, nullable=False)
    zillow_url = Column(String)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

# HUMAN ASSISTANCE NEEDED
# The following classes have a confidence level below 0.8 and may need review

class Filter(Base):
    __tablename__ = "filters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="filters")
    criteria = relationship("FilterCriteria", back_populates="filter")

class FilterCriteria(Base):
    __tablename__ = "filter_criteria"

    id = Column(Integer, primary_key=True, index=True)
    filter_id = Column(Integer, ForeignKey("filters.id"), nullable=False)
    field = Column(String, nullable=False)
    operator = Column(String, nullable=False)
    value = Column(String, nullable=False)

    filter = relationship("Filter", back_populates="criteria")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime)
    status = Column(String, nullable=False)

    user = relationship("User", back_populates="subscriptions")

# Add these relationships to the User class
User.filters = relationship("Filter", back_populates="user")
User.subscriptions = relationship("Subscription", back_populates="user")
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.schema.subscription import SubscriptionCreate
from backend.app.db.models import User, Subscription
from backend.app.core.security import get_current_user
from backend.app.services.paypal_service import process_payment

router = APIRouter()

@router.post('/subscriptions')
async def create_subscription(
    subscription_data: SubscriptionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # HUMAN ASSISTANCE NEEDED
    # The following code needs review and potential modifications:
    # 1. Error handling for payment processing
    # 2. Validation of subscription data
    # 3. Handling of existing subscriptions for the user
    # 4. Proper rollback in case of errors during database operations

    # Process payment using PayPal
    payment_result = await process_payment(subscription_data.amount, current_user.id)
    if not payment_result.success:
        raise HTTPException(status_code=400, detail="Payment processing failed")

    # Create new subscription object
    new_subscription = Subscription(
        user_id=current_user.id,
        plan_type=subscription_data.plan_type,
        start_date=subscription_data.start_date,
        end_date=subscription_data.end_date
    )

    # Add subscription to database
    db.add(new_subscription)

    # Commit changes
    try:
        db.commit()
        db.refresh(new_subscription)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create subscription")

    # Return created subscription
    return new_subscription
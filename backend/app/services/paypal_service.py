import paypalrestsdk
from typing import Dict
from backend.app.core.config import settings

PAYPAL_CLIENT_ID = settings.PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET = settings.PAYPAL_CLIENT_SECRET

class PayPalService:
    def __init__(self):
        paypalrestsdk.configure({
            "mode": "sandbox" if settings.DEBUG else "live",
            "client_id": PAYPAL_CLIENT_ID,
            "client_secret": PAYPAL_CLIENT_SECRET
        })

    # HUMAN ASSISTANCE NEEDED
    # The following methods have a confidence level below 0.8 and may need refinement for production use
    def create_payment(self, amount: float, currency: str, description: str) -> Dict:
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": str(amount),
                    "currency": currency
                },
                "description": description
            }],
            "redirect_urls": {
                "return_url": "http://example.com/success",
                "cancel_url": "http://example.com/cancel"
            }
        })

        if payment.create():
            return payment.to_dict()
        else:
            return {"error": payment.error}

    def execute_payment(self, payment_id: str, payer_id: str) -> Dict:
        payment = paypalrestsdk.Payment.find(payment_id)
        if payment.execute({"payer_id": payer_id}):
            return payment.to_dict()
        else:
            return {"error": payment.error}
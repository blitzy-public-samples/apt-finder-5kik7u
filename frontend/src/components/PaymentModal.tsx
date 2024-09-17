import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { processPayment } from 'frontend/src/services/paypal';

// HUMAN ASSISTANCE NEEDED
// The confidence level is below 0.8, indicating that this component may need further refinement or additional features.
// Please review and enhance the following code as necessary.

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePaymentSuccess = async (details: any) => {
    setIsProcessing(true);
    try {
      await processPayment(details);
      onSuccess();
    } catch (error) {
      console.error('Payment processing failed:', error);
      // TODO: Add error handling and user feedback
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Subscribe to Premium Plan</h2>
        <p>Enjoy unlimited access to all features for just $9.99/month</p>
        <ul>
          <li>Ad-free experience</li>
          <li>Priority customer support</li>
          <li>Exclusive content</li>
        </ul>
        <p>By subscribing, you agree to our terms and conditions.</p>
        
        {!isProcessing && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: '9.99'
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(handlePaymentSuccess);
            }}
          />
        )}
        
        {isProcessing && <p>Processing your payment...</p>}
        
        <button onClick={onClose} disabled={isProcessing}>
          {isProcessing ? 'Please wait...' : 'Cancel'}
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
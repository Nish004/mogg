import React, { useState } from 'react';
import './Payment.css'; // Create and import your CSS file for Payment styling
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleUnavailablePayment = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide popup after 3 seconds
  };

  const handleProceed = () => {
    // Handle proceed to confirmation logic here
    console.log('Proceeding to order confirmation...');
    navigate('/confirm'); // Redirect to confirm page
  };

  return (
    <div className='payment-container'>
      <h2>Payment Options</h2>
      <div className='payment-buttons'>
        <button className='btn btn-primary' onClick={handleProceed}>
          Cash on Delivery
        </button>
        <button className='btn btn-secondary' onClick={handleUnavailablePayment}>
          Credit Card
        </button>
        <button className='btn btn-secondary' onClick={handleUnavailablePayment}>
          PayPal
        </button>
        <button className='btn btn-secondary' onClick={handleUnavailablePayment}>
          Other Methods
        </button>
      </div>
      {showPopup && (
        <div className='payment-popup'>
          <p>Currently, only Cash on Delivery is available.</p>
          <p>Other payment options will be coming soon in future updates.</p>
        </div>
      )}
      <button className='btn btn-confirm' onClick={handleProceed}>
        Proceed for Confirmation
      </button>
    </div>
  );
};

export default Payment;

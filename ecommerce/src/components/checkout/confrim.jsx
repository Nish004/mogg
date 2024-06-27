import React from 'react';
import { useNavigate } from 'react-router-dom';
import './confirm.css'; // Create and import your CSS file for Confirm styling

const Confirm = () => {
  const navigate = useNavigate();

  const handleShopMore = () => {
    navigate('/');
  };

  return (
    <div className='confirm-container'>
      <div className='confirm-message'>
        <svg className='tick-icon' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M9 19L2 12l1.4-1.4L9 16.2l11.6-11.6L22 6.4L9 19z'
          />
        </svg>
        <h2>Your order is confirmed!</h2>
        <p>Shipment details will be sent to your email soon.</p>
      </div>
      <button className='btn btn-shop-more' onClick={handleShopMore}>
        Shop More
      </button>
    </div>
  );
}

export default Confirm;

import React, { useContext, useState } from 'react';
import './Checkout.css'; // Import your CSS file for Checkout styling
import { ShopContext } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Checkout = () => {
  const { cartItems, allProducts, totalItemsInCart } = useContext(ShopContext);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress({ ...deliveryAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., sending data to backend
    console.log('Delivery Address:', deliveryAddress);
    // Redirect to payment page
    navigate('/payment'); // Redirect to the payment page
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = allProducts.find((prod) => prod.id === parseInt(itemId));
      if (product) {
        return total + (product.new_price * cartItems[itemId].quantity);
      }
      return total;
    }, 0);
  };

  const totalAmount = getTotalCartAmount();

  return (
    <div className='checkout-container'>
      <div className='checkout-left'>
        <h2>Delivery Address</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              className='form-control'
              id='fullName'
              name='fullName'
              value={deliveryAddress.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='addressLine1'>Address Line 1</label>
            <input
              type='text'
              className='form-control'
              id='addressLine1'
              name='addressLine1'
              value={deliveryAddress.addressLine1}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='addressLine2'>Address Line 2</label>
            <input
              type='text'
              className='form-control'
              id='addressLine2'
              name='addressLine2'
              value={deliveryAddress.addressLine2}
              onChange={handleChange}
            />
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='city'>City</label>
              <input
                type='text'
                className='form-control'
                id='city'
                name='city'
                value={deliveryAddress.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='state'>State</label>
              <input
                type='text'
                className='form-control'
                id='state'
                name='state'
                value={deliveryAddress.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='postalCode'>Postal Code</label>
              <input
                type='text'
                className='form-control'
                id='postalCode'
                name='postalCode'
                value={deliveryAddress.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='country'>Country</label>
              <input
                type='text'
                className='form-control'
                id='country'
                name='country'
                value={deliveryAddress.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            Confirm Order
          </button>
        </form>
      </div>
      <div className='checkout-right'>
        <h2>Order Summary</h2>
        <div className='order-summary'>
          {Object.keys(cartItems).map((itemId) => {
            if (cartItems[itemId].quantity === 0) return null; // Skip products with zero quantity
            const product = allProducts.find((prod) => prod.id === parseInt(itemId));
            if (!product) {
              console.error(`Product with ID ${itemId} not found in allProducts`);
              return null; // Handle scenario where product is not found
            }
            return (
              <div className='order-item' key={itemId}>
                <img src={product.image} alt={product.name} className='order-item-image' />
                <div className='order-item-details'>
                  <h3>{product.name}</h3>
                  <p>Price: ${product.new_price.toFixed(2)}</p>
                  <p>Quantity: {cartItems[itemId].quantity}</p>
                  <p>Subtotal: ${(product.new_price * cartItems[itemId].quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className='order-total'>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

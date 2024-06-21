import React from 'react';
import CartItems from '../components/cartitems/CartItems';
import '../pages/CSS/cart.css';

const Cart = () => {
  return (
    <div className='cart-page'>
      <h1 className='cart-title'>Your Cart</h1>
      <CartItems />
      <button className="checkout-button">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;

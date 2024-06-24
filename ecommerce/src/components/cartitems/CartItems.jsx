import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import emptyCartImage from '../cartitems/empty-cart.png'; // Ensure the path to the image is correct

const CartItems = () => {
  const { cartItems, all_product, addToCart, removeFromCart } = useContext(ShopContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = all_product.find((prod) => prod.id === parseInt(itemId));
      return total + (product.new_price * cartItems[itemId].quantity);
    }, 0);
  };

  const applyPromoCode = () => {
    // Logic to apply the promo code and set the discount
    // For now, let's assume a simple promo code 'SAVE10' that gives a 10% discount
    if (promoCode === 'BHARATHPAPAASWIN10') {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };
 

  const cartIsEmpty = Object.keys(cartItems).every((itemId) => cartItems[itemId].quantity === 0);
  const totalAmount = getTotalCartAmount();
  const totalAmountAfterDiscount = totalAmount * (1 - discount);

  return (
    <div className='cart-container'>
      <div className='cart-items'>
        {cartIsEmpty ? (
          <div className='cart-empty-message'>
            <img src={emptyCartImage} alt='Empty Cart' className='empty-cart-image' />
            <h2>Your cart is empty</h2>
            <Link to='/' className='explore-link'>Explore MOGG</Link>
          </div>
        ) : (
          <>
            {Object.keys(cartItems).map((itemId) => {
              if (cartItems[itemId].quantity === 0) return null; // Skip products with zero quantity
              const product = all_product.find((prod) => prod.id === parseInt(itemId));
              return (
                <div className='cart-item' key={itemId}>
                  <img src={product.image} alt={product.name} className='cart-item-image' />
                  <div className='cart-item-details'>
                    <h2>{product.name}</h2>
                    <p className='cart-item-size'>Size: {cartItems[itemId].size}</p> {/* Display selected size */}
                    <p className='cart-item-price'>${product.new_price.toFixed(2)}</p>
                    <div className='cart-item-quantity'>
                      <button onClick={() => removeFromCart(itemId)}>-</button>
                      <input type='number' value={cartItems[itemId].quantity} readOnly />
                      <button onClick={() => addToCart(itemId, cartItems[itemId].size)}>+</button>
                    </div>
                    <p className='cart-item-subtotal'>Subtotal: ${(product.new_price * cartItems[itemId].quantity).toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
            <div className='cart-total'>
              <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
              {discount > 0 && <h3>Discount Applied: -${(totalAmount * discount).toFixed(2)}</h3>}
              <h3>Amount After Discount: ${totalAmountAfterDiscount.toFixed(2)}</h3>
              <Link to='/checkout' className='checkout-link'>
                <button className={`checkout-button ${cartIsEmpty ? 'checkout-button-empty' : ''}`}>Proceed to Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className='promo-code-section'>
        <h2>Apply Promo Code</h2>
        <input
          type='text'
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder='Enter promo code'
        />
        <button onClick={applyPromoCode} className='apply-promo-button'>Apply</button>
      </div>
    </div>
  );
};

export default CartItems;

import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../context/ShopContext';

const CartItems = () => {
  const { cartItems, all_product, addToCart, removeFromCart } = useContext(ShopContext);

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = all_product.find((prod) => prod.id === parseInt(itemId));
      return total + (product.new_price * cartItems[itemId].quantity);
    }, 0);
  };

  return (
    <div className='cart-items'>
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
              <p className='cart-item-subtotal'>Subtotal: ${product.new_price * cartItems[itemId].quantity}</p>
            </div>
          </div>
        );
      })}
      <div className='cart-total'>
        <h3>Total Amount: ${getTotalCartAmount().toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartItems;

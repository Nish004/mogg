import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import tick_icon from "../Assets/tick_icon.png"; // Import tick icon
import { ShopContext } from '../../context/ShopContext';

const ProdutDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showCartConfirmation, setShowCartConfirmation] = useState(false); // State for cart confirmation message
  const [wishlistMessage, setWishlistMessage] = useState(""); // State for wishlist confirmation message
  const { addToCart } = useContext(ShopContext);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    console.log(`Add to Cart: Product ${product.name}, Quantity ${quantity}, Size ${selectedSize}`);
    addToCart(product.id, selectedSize); // Pass selectedSize along with product.id
    setShowCartConfirmation(true);
    setTimeout(() => {
      setShowCartConfirmation(false);
    }, 800); // Hide the message after 0.8 seconds
  };
  
  const handleToggleWishlist = () => {
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    setWishlistMessage(newWishlistState ? "Added to Wishlist" : "Removed from Wishlist");
    setTimeout(() => {
      setWishlistMessage("");
    }, 800); // Hide the message after 0.8 seconds
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? "" : size); // Toggle selected size
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-start">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
          <div className="productdisplay-right-description">
            Discover timeless elegance with our classic Oxford shirt, tailored for comfort and style. Perfect for any occasion, its versatile design ensures effortless sophistication.
          </div>
        </div>
        <div className="productdisplay-right-size">
          <h2>Select Size</h2>
          <div className="product-sizes">
            <div
              className={`product-size ${selectedSize === 'S' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('S')}
            >S</div>
            <div
              className={`product-size ${selectedSize === 'M' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('M')}
            >M</div>
            <div
              className={`product-size ${selectedSize === 'L' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('L')}
            >L</div>
            <div
              className={`product-size ${selectedSize === 'XL' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('XL')}
            >XL</div>
            <div
              className={`product-size ${selectedSize === 'XXL' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('XXL')}
            >XXL</div>
          </div>
          <div className="product-actions">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="product-quantity-input"
            />
            <button onClick={handleAddToCart} className="product-action-button">Add to Cart</button>
            <button onClick={handleToggleWishlist} className="product-heart-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isInWishlist ? "#e60023" : "none"}
                stroke={isInWishlist ? "#e60023" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          {showCartConfirmation && (
            <div className="confirmation-message">
              <img src={tick_icon} alt="Tick" className="tick-icon" />
              <span>Added to Cart</span>
            </div>
          )}
          {wishlistMessage && (
            <div className="confirmation-message">
              <span className='wish'>{wishlistMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProdutDisplay;

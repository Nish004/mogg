import React, { useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const ProdutDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // State to track selected size
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const handleBuyNow = () => {
    console.log(`Buy Now: Product ${product.name}, Quantity ${quantity}, Size ${selectedSize}`);
    // Implement logic for Buy Now action (e.g., redirect to checkout)
  };

  const handleAddToCart = () => {
    console.log(`Add to Cart: Product ${product.name}, Quantity ${quantity}, Size ${selectedSize}`);
    // Implement logic for Add to Cart action
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? "" : size); // Toggle selected size
  };

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
            <button onClick={handleBuyNow} className="product-action-button">Buy Now</button>
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
        </div>
      </div>
    </div>
  );
};

export default ProdutDisplay;

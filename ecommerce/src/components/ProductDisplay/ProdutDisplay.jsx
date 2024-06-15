// ProductDisplay.js
import React, { useState } from 'react';
import './ProductDisplay.css';

const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const handleBuyNow = () => {
    console.log(`Buy Now: Product ${product.name}, Quantity ${quantity}`);
    // Implement logic for Buy Now action (e.g., redirect to checkout)
  };

  const handleAddToCart = () => {
    console.log(`Add to Cart: Product ${product.name}, Quantity ${quantity}`);
    // Implement logic for Add to Cart action
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-display-amazon">
      <div className="product-image">
        <img src={product.image} alt={product.name} className="product-display-image" />
      </div>
      <div className="product-details">
        <h1 className="product-display-name">{product.name}</h1>
        <p className="product-display-description">{product.description}</p>
        <div className="product-display-price">
          <span className="product-display-price-new">
            ${product.new_price}
          </span>
          {product.old_price && 
            <span className="product-display-price-old">
              ${product.old_price}
            </span>
          }
        </div>
        
        {/* Additional Product Details */}
        <div className="product-details-section">
          <h3>Product Details</h3>
          <p><strong>Dimensions:</strong> {product.dimensions}</p>
          <p><strong>Weight:</strong> {product.weight}</p>
          {/* Add more details as needed */}
        </div>

        {/* Actions Section */}
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
  );
};

export default ProductDisplay;

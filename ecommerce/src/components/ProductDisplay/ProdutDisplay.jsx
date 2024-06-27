import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showCartConfirmation, setShowCartConfirmation] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const { addToCart, isLoggedIn } = useContext(ShopContext);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    console.log(`Add to Cart: Product ${product.name}, Quantity ${quantity}, Size ${selectedSize}`);
    addToCart(product.id, selectedSize);
    setShowCartConfirmation(true);
    setTimeout(() => {
      setShowCartConfirmation(false);
    }, 800);
  };

  const handleToggleWishlist = () => {
    const newWishlistState = !isInWishlist;
    setIsInWishlist(newWishlistState);
    setWishlistMessage(newWishlistState ? "Added to Wishlist" : "Removed from Wishlist");
    setTimeout(() => {
      setWishlistMessage("");
    }, 800);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size === selectedSize ? "" : size);
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
                fill={isInWishlist ? "red" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-heart"
              >
                <path d="M20.8 4.6c-1.5-1.5-3.9-1.5-5.4 0L12 8 8.6 4.6C7.1 3.1 4.7 3.1 3.2 4.6c-1.5 1.5-1.5 3.9 0 5.4l3.4 3.4 4.4 4.4 4.4-4.4 3.4-3.4c1.5-1.5 1.5-3.9 0-5.4z"></path>
              </svg>
            </button>
          </div>
          {showCartConfirmation && (
            <div className="cart-confirmation">
              
              <p>Added to Cart</p>
            </div>
          )}
          {wishlistMessage && (
            <div className="wishlist-confirmation">
              <p>{wishlistMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

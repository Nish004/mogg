import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';
import banner from '../Hero/image/banner.png';
import banner1 from '../Hero/image/banner2.png';
import shoeBanner from '../Hero/image/shoe.png';

const ProductAlbum = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (hoverImage) => {
    setHoveredImage(hoverImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const products = [
    {
      id: 1,
      defaultImage: 'http://localhost:4000/images/product_1719333284337.webp',
      hoverImage: 'http://localhost:4000/images/product_1719333284337.webp',
    },
    {
      id: 3,
      defaultImage: 'http://localhost:4000/images/product_1719333461549.webp',
      hoverImage: 'http://localhost:4000/images/product_1719333461549.webp',
    },
    {
      id: 4,
      defaultImage: 'http://localhost:4000/images/product_1719333683468.webp',
      hoverImage: 'http://localhost:4000/images/product_1719333683468.webp',
    },
    {
      id: 5,
      defaultImage: 'http://localhost:4000/images/product_1719333714459.webp',
      hoverImage: 'http://localhost:4000/images/product_1719333714459.webp',
    },
    {
      id: 6,
      defaultImage: 'http://localhost:4000/images/product_1719333707228.webp',
      hoverImage: 'http://localhost:4000/images/product_1719333707228.webp',
    },
  ];

  return (
    <div className='product-album'>
      <img src={banner} alt="Banner" className="banner-image" />

      <div className="text-container">
        <p className="check-out-text">Check Out</p>
        <p className="trending-text">Our Trending Collections</p>
      </div>

      <div className="product-images">
        {products.map(product => (
          <div className="product-image-wrapper" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={hoveredImage === product.hoverImage ? product.hoverImage : product.defaultImage}
                alt={`Product ${product.id}`}
                className="product-image"
                onMouseEnter={() => handleMouseEnter(product.hoverImage)}
                onMouseLeave={handleMouseLeave}
                onError={(e) => { e.target.onerror = null; e.target.src = 'defaultImage.png'; }} // Fallback image
              />
              <div className="buy-now-overlay">Buy Now</div>
            </Link>
          </div>
        ))}
      </div>

      <div className="banner-container">
        <img src={banner1} alt="Banner" className="banner-image" />
        <Link to='/Shoes'>
          <img src={shoeBanner} alt="Shoe" className="shoe-image" />
        </Link>
      </div>
    </div>
  );
}

export default ProductAlbum;

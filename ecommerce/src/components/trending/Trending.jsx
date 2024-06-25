import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';
import banner from '../Hero/image/banner.png';
import banner1 from '../Hero/image/banner2.png';
import shoeBanner from '../Hero/image/shoe.png';
// Remove individual photo imports
// import all_product from '../../components/Assets/all_product';
import axios from 'axios'; // Import axios for making HTTP requests

const ProductAlbum = () => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproduct');
        setProducts(response.data); // Assuming backend sends an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleMouseEnter = (hoverImage) => {
    setHoveredImage(hoverImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

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

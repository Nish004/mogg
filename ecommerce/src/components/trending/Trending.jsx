import React, { useState } from 'react';
import './Trending.css'; // Create and import styles for your product album if needed
import banner from '../Hero/image/banner.png';
import banner1 from '../Hero/image/banner2.png';
import shoeBanner from '../Hero/image/shoe.png';
import { Link } from 'react-router-dom';
import photo from '../Hero/image/below1.webp';
import photo1 from '../Hero/image/below2.webp';
import photo2 from '../Hero/image/below3.webp';
import photo3 from '../Hero/image/below4.webp';
import photo4 from '../Hero/image/below5.webp';
import photo5 from '../Hero/image/below12.webp';
import photo6 from '../Hero/image/below22.webp';
import photo7 from '../Hero/image/below32.webp';
import photo8 from '../Hero/image/below42.jpeg';
import photo9 from '../Hero/image/below52.webp';


const ProductAlbum = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (image, hoverImage) => {
    setHoveredImage(hoverImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div className='product-album'>
      {/* Add your banner */}
      <img src={banner} alt="Banner" className="banner-image" />
      
      {/* Text */}
      <div className="text-container">
        <p className="check-out-text">Check Out</p>
        <p className="trending-text">Our Trending Collections</p>
      </div>
      
      {/* Add your product photos here */}
      <div className="product-images">
       <div className="product-image-wrapper">
         <a href="/" target="_blank" rel="noopener noreferrer">
      <img
        src={hoveredImage === photo5 ? photo5 : photo}
        alt="Product 1"
        className="product-image"
        onMouseEnter={() => handleMouseEnter(photo, photo5)}
        onMouseLeave={handleMouseLeave}
        
      />
      <div className="buy-now-overlay">Buy Now</div>
    </a>
    
  </div>
  <div className="product-image-wrapper">
    <a href="/" target="_blank" rel="noopener noreferrer">
      <img
        src={hoveredImage === photo6 ? photo6 : photo1}
        alt="Product 2"
        className="product-image"
        onMouseEnter={() => handleMouseEnter(photo1, photo6)}
        onMouseLeave={handleMouseLeave}
      />
      <div className="buy-now-overlay">Buy Now</div>
    </a>
    
  </div>
  <div className="product-image-wrapper">
    <a href="/product1" target="_blank" rel="noopener noreferrer">
      <img
        src={hoveredImage === photo7 ? photo7 : photo2}
        alt="Product 3"
        className="product-image"
        onMouseEnter={() => handleMouseEnter(photo2, photo7)}
        onMouseLeave={handleMouseLeave}
        
      />
      <div className="buy-now-overlay">Buy Now</div>
    </a>   
  </div>

  <div className="product-image-wrapper">
    <a href="/product1" target="_blank" rel="noopener noreferrer">
      <img
        src={hoveredImage === photo8 ? photo8 : photo3}
        alt="Product 4"
        className="product-image"
        onMouseEnter={() => handleMouseEnter(photo3, photo8)}
        onMouseLeave={handleMouseLeave}
        
      />
      <div className="buy-now-overlay">Buy Now</div>
    </a>   
  </div>
  <div className="product-image-wrapper">
    <a href="/product" target="_blank" rel="noopener noreferrer">
      <img
        src={hoveredImage === photo9 ? photo9 : photo4}
        alt="Product 5"
        className="product-image"
        onMouseEnter={() => handleMouseEnter(photo4, photo9)}
        onMouseLeave={handleMouseLeave}
        
      />
      <div className="buy-now-overlay">Buy Now</div>
    </a>   
  </div>
  {/* Add more images as needed */}

  </div>

  <div className="banner-container">
    {/* Add your banner 2*/}
    <img src={banner1} alt="Banner" className="banner-image" />
    {/* Add shoe.png below banner1 */}
    <Link to='/Shoes'><img src={shoeBanner} alt="Shoe" className="shoe-image" /></Link>
  </div>
 </div>
  );
}

export default ProductAlbum;

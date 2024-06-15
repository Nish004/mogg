import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Trending.css';
import banner from '../Hero/image/banner.png';
import banner1 from '../Hero/image/banner2.png';
import shoeBanner from '../Hero/image/shoe.png';
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
import all_product from '../../components/Assets/all_product';

const ProductAlbum = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const handleMouseEnter = (image, hoverImage) => {
    setHoveredImage(hoverImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const products = [
    { defaultImage: photo, hoverImage: photo5, id: 1 },
    { defaultImage: photo1, hoverImage: photo6, id: 2 },
    { defaultImage: photo2, hoverImage: photo7, id: 3 },
    { defaultImage: photo3, hoverImage: photo8, id: 4 },
    { defaultImage: photo4, hoverImage: photo9, id: 5 },
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
                onMouseEnter={() => handleMouseEnter(product.defaultImage, product.hoverImage)}
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

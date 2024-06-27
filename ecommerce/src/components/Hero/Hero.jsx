import React from 'react';
import './Hero.css';

import videoSource from '../Assets/third.mp4';
import Trending from '../trending/Trending';
import NewsLetter from '../newsletter/Newsletter';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Hero = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    if (isLoggedIn) {
      navigate('/Shirts'); // Navigate to shirts if logged in
    } else {
      navigate('/signin'); // Navigate to sign-in page if not logged in
    }
  };

  return (
    <div className='hero'>
      <video autoPlay loop muted className="hero-video">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='hero-content'>
        <div className='titles'>
          <h1 className='title'>NEW ARRIVALS ARE HERE</h1>
          <h2 className='subtitle'>GRAB SUMMER SALE DISCOUNT% NOW</h2>
        </div>
        <div className='shop-now-button-container'>
          <button className='shop-now-button' onClick={handleShopNowClick}>
            Shop Now
          </button>
        </div>
      </div>
      <div className="product-album">
        <Trending/>
      </div>
      <div className='news-letter'>
        <NewsLetter />
      </div>
    </div>
  );
};

export default Hero;

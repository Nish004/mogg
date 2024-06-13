import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import videoSource from '../Assets/third.mp4';
import Trending from '../trending/Trending'; // Ensure the path is correct based on the actual location
import NewsLetter from '../newsletter/Newsletter';


const Hero = () => {
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
          <button className='shop-now-button'>
            <Link className='shop-now-link' to='/signin'>Shop Now</Link>
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
}

export default Hero;

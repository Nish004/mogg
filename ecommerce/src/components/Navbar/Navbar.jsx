// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/MOGG_OG-removebg-preview.png';
import cart_icon from '../Assets/cart.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='Navbar'>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt='' style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      <ul className="nav-menu">
        <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/'>Home</Link></li>
        <li className="nav-menu-item" onMouseEnter={togglePopup} onMouseLeave={togglePopup}>
          Shop
          {showPopup && (
            <div className="popup">
              <ul>
                <ul className='pop'>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Shirts'>Shirts</Link></li>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Hoodies'>Hoodies</Link></li>
                </ul>
                <ul className='pop'>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Jacket'>Jacket</Link></li>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Jeans'>Jeans</Link></li>
                </ul>
                <ul className='pop'>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Shoes'>Shoes</Link></li>
                  <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/Shorts'>Shorts</Link></li>
                </ul>
              </ul>
            </div>
          )}
        </li>
        <li className="nav-menu-item"><Link style={{textDecoration:'none'}} to='/about'>About</Link></li> {/* Update Link to About */}
        <li className="nav-menu-item"><Link style={{textDecoration:'none'}}>Blog</Link></li>
      </ul>

      <div className="nav-login-cart">
        <li className="nav-menu-item">Search</li>
        <li className="nav-menu-item"><Link style={{textDecoration:'none'}}>EN</Link></li>
        <li className="nav-menu-item"><Link style={{textDecoration:'none'}}>Wishlist</Link></li>
        <Link style={{textDecoration:'none'}} to='/signin'><button className="nav-menu-item">signin</button></Link>
        <Link style={{textDecoration:'none'}} to='/cart'><img src={cart_icon} alt="" className="cart-icon" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
}

export default Navbar;

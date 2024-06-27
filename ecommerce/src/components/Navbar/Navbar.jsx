import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/MOGG_OG-removebg-preview.png';
import cart_icon from '../Assets/cart.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const Navbar = () => {
  const { totalItemsInCart } = useContext(ShopContext); // Access totalItemsInCart from context
  const [showPopup, setShowPopup] = useState(false); // useState variable
  const [account_nav_name, setAccountNavName] = useState('signin'); // useState variable

  const showPopupfn = () => {
    setShowPopup(true);
  };

  return (
    <div className='Navbar'>
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt='' style={{ width: '200px', height: 'auto' }} />
        </Link>
      </div>

      <ul className="nav-menu">
        <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/'>Home</Link></li>
        <li className="nav-menu-item" onMouseEnter={showPopupfn}>
          Shop
          <div className="popup">
            <ul>
              <ul className='pop'>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Shirts'>Shirts</Link></li>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Hoodies'>Hoodies</Link></li>
              </ul>
              <ul className='pop'>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Jacket'>Jacket</Link></li>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Jeans'>Jeans</Link></li>
              </ul>
              <ul className='pop'>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Shoes'>Shoes</Link></li>
                <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/Shorts'>Shorts</Link></li>
              </ul>
            </ul>
          </div>
        </li>
        <li className="nav-menu-item"><Link style={{ textDecoration: 'none' }} to='/about'>About</Link></li>
        
      </ul>

      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
          : <Link style={{ textDecoration: 'none' }} to='/signin'><button className="nav-menu-item">{account_nav_name}</button></Link>}

        <div className="cart-icon-wrapper">
          <Link style={{ textDecoration: 'none' }} to='/cart'>
            <img src={cart_icon} alt="" className="cart-icon" />
            {totalItemsInCart > 0 && <div className="nav-cart-count">{totalItemsInCart}</div>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

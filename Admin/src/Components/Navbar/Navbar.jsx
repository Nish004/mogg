import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/MOGG_OG-removebg-preview.png'
import navProfile from '../../assets/nav-profile.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="Logo" className="nav-logo" />
      <div className="nav-content">
        <img src={navProfile} alt="Profile" className="nav-profile" />
        <div className="name">Admin Panel</div>
      </div>
    </div>
  )
}

export default Navbar

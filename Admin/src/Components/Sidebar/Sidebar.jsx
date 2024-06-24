import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg'; // Check this path
import list_product_icon from '../../assets/Product_list_icon.svg'; // Check this path

console.log('add_product_icon path:', add_product_icon);
console.log('list_product_icon path:', list_product_icon);

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to='/addproduct' style={{textDecoration:"none"}}>
         <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
         </div>
      </Link>
      <Link to='/listproduct' style={{textDecoration:"none"}}>
         <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
         </div>
      </Link>
    </div>
  )
}

export default Sidebar;

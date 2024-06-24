// ShopCategory.js

import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/items/Item';

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);

  // Normalize category values by converting to lowercase and trimming whitespace
  const category = props.category ? props.category.toLowerCase().trim() : '';

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 50 products
        </p>

        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory_products">
        {allProducts ? (
          allProducts.map((item, i) => {
            // Ensure item.category is defined before using toLowerCase()
            const itemCategory = item.category ? item.category.toLowerCase().trim() : '';

            if (category === itemCategory) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            }
            return null;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;

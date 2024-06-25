// ShopCategory.js
import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/items/Item';

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);

  const category = props.category ? props.category.toLowerCase().trim() : '';

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {allProducts.length} products
        </p>

        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory_products">
        {allProducts.length > 0 ? (
          allProducts.map((item, index) => {
            const itemCategory = item.category ? item.category.toLowerCase().trim() : '';

            if (category === itemCategory) {
              return (
                <Item
                  key={index}
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

import React, { createContext, useState, useMemo } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    cart[all_product[index].id] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Initialize as empty object

  const addToCart = (itemId, selectedSize) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + 1, // Increment quantity
        size: selectedSize
      }
    }));
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId]?.quantity > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: prev[itemId].quantity - 1 // Decrement quantity
        }
      }));
    }
  };

  const totalItemsInCart = useMemo(() => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const contextValue = { all_product, cartItems, addToCart, removeFromCart, totalItemsInCart };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

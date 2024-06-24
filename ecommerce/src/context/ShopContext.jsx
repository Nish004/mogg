// ShopContextProvider.js

import React, { createContext, useState, useMemo, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/allproduct')
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from API:", data); // Check if data is received
        setAllProducts(data); // Set allProducts state
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // Ensure empty dependency array to run once on component mount

  const addToCart = (itemId, selectedSize) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + 1,
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
          quantity: prev[itemId].quantity - 1
        }
      }));
    }
  };

  const totalItemsInCart = useMemo(() => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    totalItemsInCart
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

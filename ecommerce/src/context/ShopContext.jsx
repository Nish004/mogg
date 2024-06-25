// ShopContextProvider.js
import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from 'axios'; // Import axios for making HTTP requests

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // Fetch all products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproduct');
        setAllProducts(response.data); // Assuming backend sends an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to add a product to the cart
  const addToCart = (itemId, selectedSize) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + 1,
        size: selectedSize,
      },
    }));
  };

  // Function to remove a product from the cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId]?.quantity > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          quantity: prev[itemId].quantity - 1,
        },
      }));
    }
  };

  // Memoize total items in cart to optimize performance
  const totalItemsInCart = useMemo(
    () =>
      Object.values(cartItems).reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const contextValue = {
    allProducts,
    cartItems,
    addToCart,
    removeFromCart,
    totalItemsInCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

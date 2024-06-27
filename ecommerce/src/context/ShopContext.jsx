import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allproduct');
        setAllProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();

    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      setIsLoggedIn(true);
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': authToken,
          'Content-Type': 'application/json',
        },
        body: "",
      }).then((response) => response.json())
        .then((data) => {
          const filteredCartItems = {};
          Object.keys(data).forEach((key) => {
            if (data[key] > 0) {
              filteredCartItems[key] = {
                quantity: data[key],
                size: 'default' // Provide a default size or retrieve size data if available
              };
            }
          });
          setCartItems(filteredCartItems);
        });
    }
  }, []);

  const addToCart = (itemId, selectedSize) => {
    if (!isLoggedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        quantity: (prev[itemId]?.quantity || 0) + 1,
        size: selectedSize,
      },
    }));

    fetch('http://localhost:4000/addtocart', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "itemId": itemId }),
    }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch(error => console.error('Error adding to cart:', error));
  };

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

    fetch('http://localhost:4000/removefromcart', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "itemId": itemId }),
    }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch(error => console.error('Error removing from cart:', error));
  };

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
    isLoggedIn, // Pass the isLoggedIn state
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

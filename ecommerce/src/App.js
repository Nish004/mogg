import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Shopcategory from './pages/Shopcategory';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import About from './pages/About'; 
import Footer from './components/footer/Footer';
import ShopContextProvider from './context/ShopContext'; // Import the context provider

function App() {
  return (
    <div>
      <BrowserRouter>
        <ShopContextProvider> {/* Wrap everything inside ShopContextProvider */}
          <Navbar />
          
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/Shirts' element={<Shopcategory category="Shirt" />} />
            <Route path='/Hoodies' element={<Shopcategory category="Hoodies" />} />
            <Route path='/Jacket' element={<Shopcategory category="Jacket" />} />
            <Route path='/Jeans' element={<Shopcategory category="Jeans" />} />
            <Route path='/Shorts' element={<Shopcategory category="Shorts" />} />
            <Route path='/Shoes' element={<Shopcategory category="Shoes" />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/signin' element={<Signup />} />
            <Route path='/about' element={<About />} /> 
          </Routes> 
          <Footer/>
        </ShopContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

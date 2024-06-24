import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for styling
import mogglogo from '../components/Assets/MOGG_OG-removebg-preview.png'; // Import your website logo
import background from '../pages/nodel3.png';

const Signup = () => {
  const navigate = useNavigate();

  // Simulated array of registered email addresses
  const registeredEmails = ['user1@example.com', 'user2@example.com'];

  // State variables to manage form input and mode
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isNewAccount, setIsNewAccount] = useState(true); // Default to sign-up mode
  const [agreeTerms, setAgreeTerms] = useState(false); // Track whether terms are accepted
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate user session checking

  // Simulate user session checking on component mount (useEffect)
  useEffect(() => {
    // Replace with actual session checking logic
    const userLoggedIn = true; // For demonstration, assume user is logged in
    setIsLoggedIn(userLoggedIn);
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if terms and conditions are accepted
    if (!agreeTerms && !isLoggedIn) {
      alert('Please accept the terms and conditions');
      return;
    }
    // Check if email already exists for sign-up mode
    if (isNewAccount && registeredEmails.includes(formData.email)) {
      setError('Email is already registered');
    } else {
      // Clear any previous error message
      setError('');

      // Execute login or signup logic based on mode
      if (isNewAccount) {
        signup();
      } else {
        login();
      }
    }
  };

  // Function to handle login logic
  const login = async () => {
    console.log('Login Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData), 
    }).then((response)=> response.json()).then((data)=>responseData=data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    } 
     
  };

  // Function to handle signup logic
  const signup = async () => {
    console.log('Signup Function Executed', formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData), 
    }).then((response)=> response.json()).then((data)=>responseData=data)
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
    
  };

  // Function to toggle between sign-up and sign-in modes
  const toggleMode = () => {
    setIsNewAccount(!isNewAccount);
    setError(''); // Clear any previous error message
  };

  // Function to handle terms and conditions checkbox change
  const handleCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  // Function to handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="signup-page">
      <img src={background} alt="Background" className="background-image" />
      <div className="signup-container">
        <div className="logo-wrapper">
          <img src={mogglogo} alt="Logo" className="logo" />
        </div>
        <div className="signup-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>{isNewAccount ? 'Sign Up' : 'Login'}</h2>
            {isNewAccount && ( // Render username field only for new account
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>
            {isNewAccount && !isLoggedIn && ( // Render checkbox only for new account and not logged in
              <div className="loginSignup-agree">
                <input type="checkbox" id="agree" checked={agreeTerms} onChange={handleCheckboxChange} />
                <label htmlFor="agree">By continuing, I agree to the terms of use of privacy and policy.</label>
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <button className="sigh" type="submit">Continue</button>
            <p className="toggle-mode" onClick={toggleMode}>
              {isNewAccount ? "Already have an account? Sign in here" : "Don't have an account? Sign up here"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import your CSS file for styling
import mogglogo from '../components/Assets/MOGG_OG-removebg-preview.png'; // Import your website logo
import background from '../pages/nodel3.png';

const Signup = () => {
  const navigate = useNavigate();

  // Simulated array of registered email addresses
  const registeredEmails = ['user1@example.com', 'user2@example.com'];

  // State variables to manage form input and mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isNewAccount, setIsNewAccount] = useState(true); // Default to sign-up mode
  const [agreeTerms, setAgreeTerms] = useState(false); // Track whether terms are accepted

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if terms and conditions are accepted
    if (!agreeTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    // Check if email already exists for sign-up mode
    if (isNewAccount && registeredEmails.includes(email)) {
      setError('Email is already registered');
    } else {
      // Check if passwords match only for new account
      if (isNewAccount && password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        // Add your signup or signin logic here
        console.log(isNewAccount ? 'Signup form submitted!' : 'Signin form submitted!');
        // Redirect to new arrivals page after successful signup or signin
        navigate('/Allclothing');
      }
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

  return (
    <div className="signup-page">
      <img src={background} alt="Background" className="background-image" />
      <div className="signup-container">
        <div className="signup-form-container">
          <div className="logo-wrapper">
            <img src={mogglogo} alt="Logo" className="logo" />
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>{isNewAccount ? 'Sign Up' : 'Sign In'}</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isNewAccount && ( // Render confirm password field only for new account
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {isNewAccount && ( // Render checkbox only for new account
              <div className="loginSignup-agree">
                <input type="checkbox" id="agree" checked={agreeTerms} onChange={handleCheckboxChange} />
                <label htmlFor="agree">By continuing, I agree to the terms of use of privacy and policy.</label>
              </div>
            )}
            {error && <p className="error">{error}</p>}
            <button className="sigh" type="submit">{isNewAccount ? 'Sign Up' : 'Sign In'}</button>
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

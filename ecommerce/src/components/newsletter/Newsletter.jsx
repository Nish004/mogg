import React, { useState } from 'react';
import './Newsletter.css';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [subscribedEmails, setSubscribedEmails] = useState([]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = () => {
        if (!email) {
            alert('Please enter an email address.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else if (subscribedEmails.includes(email)) {
            alert('You have already subscribed with this email address.');
        } else {
            alert('Thank you for subscribing! You will receive exclusive offers soon.');
            setSubscribedEmails([...subscribedEmails, email]);
            setEmail('');
            console.log(`Email submitted: ${email}`);
        }
    };

    return (
        <div className="newsletter-wrapper">
            <div className="newsletter">
                <h1>Get Exclusive Offers On Your Email</h1>
                <p>Let's stay in touch!</p>
                
                <div>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleSubmit}>Join Mogg</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;

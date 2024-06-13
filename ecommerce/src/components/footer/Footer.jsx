import React from 'react';
import './Footer.css';
import mogglogo from '../Assets/MOGG_OG-removebg-preview.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pinterest_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className='Footer'>
            <div className="footerlogo" onClick={scrollToTop}>
                <img src={mogglogo} alt="MOGG Logo" />
            </div>

            <ul className="footer-links">
                <li>About</li>
                <li>Contact us</li>
                <li>Shop</li>
                <li>FAQs</li>
                <li>Help</li>
            </ul>
            
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="Instagram" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterest_icon} alt="Pinterest" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </div>
            </div>
            
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

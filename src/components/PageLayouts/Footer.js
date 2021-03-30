import React from 'react';
import "./Footer.css";

function Footer(){
    return (
        <div className="footer-container">
            <div className="footer-container-item">
                <a href="#">Home</a>
                <a href="#">About us</a>
                <a href="#">Contact us</a>
                <a href="#">Careers</a>
            </div>
            <div className="footer-container-item">
                <div className="footer-container-item2__logo">Logo</div>
                <div className="footer-container-item2__logo">Theme</div>
                <div className="footer-container-item2__logo">Language</div>
            </div>
        </div>
    )
}

export default Footer;
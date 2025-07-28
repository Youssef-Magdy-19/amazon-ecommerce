import React from 'react';
import './Footer.css';
import logo from '../../assets/img/Amazon_CS_01_Intro_00_Thumbnail.jpg'; 

export default function Footer() {
  return (
    <footer className="amazon-footer mt-5">
      <div className="footer-top">
        <div className="container row mx-auto text-start">
          <div className="col-md-3">
            <h6>Get to Know Us</h6>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Make Money with Us</h6>
            <ul>
              <li>Sell on Amazon</li>
              <li>Affiliate Marketing</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Amazon Payment Products</h6>
            <ul>
              <li>Amazon Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
              <li>Amazon Currency Converter</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6>Let Us Help You</h6>
            <ul>
              <li>Your Account</li>
              <li>Shipping Rates</li>
              <li>Returns & Replacements</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container text-center">
          <img src={logo} alt="Logo" className="footer-logo mb-2" />
          <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <p>
            <a href="#">Conditions of Use</a> | <a href="#">Privacy Notice</a> | <a href="#">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

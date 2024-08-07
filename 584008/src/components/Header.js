// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './VolcanoImage.jpg'; // Import your image
import Login from './Login';
import './header.css';

function Header() {
    return (
      <div className="header-container">
        <div className="title-and-links">
          <h1>Welcome to Volcano DB </h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/volcanolist">VolcanoList</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
      </div>
    );
  }
  
  export default Header;
// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './Header.css'; // Import CSS file for styling

function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <h1>Welcome to My React App</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/volcanolist">VolcanoList</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;

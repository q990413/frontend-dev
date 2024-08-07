import React from 'react';
import { Link } from 'react-router-dom';
import '../navigation.css';

function NavigationTabs() {
  return (
    <nav className="navigation-tabs"> {/* Apply CSS class */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/volcanolist">VolcanoList</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationTabs;

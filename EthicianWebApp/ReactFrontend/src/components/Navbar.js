import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About Us</Link></li>
        <li className="navbar-item"><Link to="/pricing">Pricing</Link></li>
        <li className="navbar-item"><Link to="/multichatxpert">MultiChatXpert</Link></li>
        <li className="navbar-item"><Link to="/login-form">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
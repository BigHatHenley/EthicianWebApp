import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import HLBLogo from './images/HLBLogo.png';

function Navbar() {
  const location = useLocation();

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If already on the home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" onClick={handleHomeClick}>
          <img src={HLBLogo} alt="HLB Technology Logo" className="logo-button" />
        </NavLink>
      </div>
      <ul className="navbar-list">
        {/* Products Button */}
        <li className="navbar-item">
          <NavLink to="/ethician-overview" className="navbar-link">
            Products
          </NavLink>
        </li>

        {/* Research Button */}
        <li className="navbar-item">
          <NavLink to="/research-overview" className="navbar-link">
            Research
          </NavLink>
        </li>

        {/* Company Button */}
        <li className="navbar-item">
          <NavLink to="/overview" className="navbar-link">
            Company
          </NavLink>
        </li>

        {/* Roadmaps Dropdown */}
        <li
          className="navbar-item dropdown"
          onMouseEnter={() => setActiveDropdown('roadmaps')}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <button>Roadmaps</button>
          {activeDropdown === 'roadmaps' && (
            <ul className="dropdown-menu">
              <li><NavLink to="/roadmap-ethician">ETHICIAN Roadmap</NavLink></li>
              <li><NavLink to="/roadmap-mcx">MultiChatXpert Roadmap</NavLink></li>
            </ul>
          )}
        </li>

        {/* MultiChatXpert Link */}
        <li className="navbar-item">
          <NavLink to="/multichatxpert" className="navbar-link">
            MultiChatXpert
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

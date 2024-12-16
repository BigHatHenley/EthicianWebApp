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
        <li
          className="navbar-item dropdown"
          onMouseEnter={() => toggleDropdown('ethician')}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <button>ETHICIAN</button>
          {activeDropdown === 'ethician' && (
            <ul className="dropdown-menu">
              <li><NavLink to="/ethician-overview">Overview</NavLink></li>
              <li><NavLink to="/ethician-enterprise">Enterprise</NavLink></li>
              <li><NavLink to="/ethician-api">API</NavLink></li>
              <li><NavLink to="/ethician-pricing">Pricing</NavLink></li>
            </ul>
          )}
        </li>
        <li
          className="navbar-item dropdown"
          onMouseEnter={() => toggleDropdown('research')}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <button>Research</button>
          {activeDropdown === 'research' && (
            <ul className="dropdown-menu">
              <li><NavLink to="/research-overview">Overview</NavLink></li>
              <li><NavLink to="/research-coherence">Coherence & Decoherence</NavLink></li>
              <li><NavLink to="/research-quantum-computing">Quantum Computing</NavLink></li>
              <li><NavLink to="/research-crypto">E-Coin</NavLink></li>
            </ul>
          )}
        </li>
        <li
          className="navbar-item dropdown"
          onMouseEnter={() => toggleDropdown('company')}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <button>Company</button>
          {activeDropdown === 'company' && (
            <ul className="dropdown-menu">
              <li><NavLink to="/overview">Company Overview</NavLink></li>
              <li><NavLink to="/goals">Our Goals</NavLink></li>
              <li><NavLink to="/governance">Governance</NavLink></li>
              <li><NavLink to="/news">Company News</NavLink></li>
            </ul>
          )}
        </li>
        <li
          className="navbar-item dropdown"
          onMouseEnter={() => toggleDropdown('roadmaps')}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <button>Roadmaps</button>
          {activeDropdown === 'roadmaps' && (
            <ul className="dropdown-menu">
              <li><NavLink to="/roadmap-ethician">ETHICIAN Roadmap</NavLink></li>
              <li><NavLink to="/roadmap-mcx">MultiChatXpert Roadmap</NavLink></li>
            </ul>
          )}
        </li>
        <li className="navbar-item">
          <NavLink to="/multichatxpert">MultiChatXpert</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

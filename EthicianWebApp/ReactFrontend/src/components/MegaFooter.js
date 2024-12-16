import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for internal routing
import './MegaFooter.css';

function MegaFooter() {
  return (
    <footer className="mega-footer">
      <div className="footer-container">
        {/* ETHICIAN Category */}
        <div className="footer-column">
          <h3>ETHICIAN</h3>
          <ul>
            <li><NavLink to="/ethician-overview">Overview</NavLink></li>
            <li><NavLink to="/ethician-enterprise">Enterprise</NavLink></li>
            <li><NavLink to="/ethician-api">API</NavLink></li>
            <li><NavLink to="/ethician-pricing">Pricing</NavLink></li>
          </ul>
        </div>

        {/* Research Category */}
        <div className="footer-column">
          <h3>Research</h3>
          <ul>
            <li><NavLink to="/research-overview">Overview</NavLink></li>
            <li><NavLink to="/research-coherence">Coherence & Decoherence</NavLink></li>
            <li><NavLink to="/research-quantum-computing">Quantum Computing</NavLink></li>
            <li><NavLink to="/research-crypto">E-Coin</NavLink></li>
          </ul>
        </div>

        {/* Roadmaps Category */}
        <div className="footer-column">
          <h3>Roadmaps</h3>
          <ul>
            <li><NavLink to="/roadmap-ethician">ETHICIAN Roadmap</NavLink></li>
            <li><NavLink to="/roadmap-mcx">MultiChatXpert Roadmap</NavLink></li>
          </ul>
        </div>

        {/* Company Category */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><NavLink to="/overview">Overview</NavLink></li>
            <li><NavLink to="/goals">Our Goals</NavLink></li>
            <li><NavLink to="/governance">Governance</NavLink></li>
            <li><NavLink to="/news">Company News</NavLink></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HLB Technology Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default MegaFooter;

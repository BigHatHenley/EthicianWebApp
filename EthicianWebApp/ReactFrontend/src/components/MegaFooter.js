import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for internal routing
import './MegaFooter.css';

function MegaFooter() {
    return (
        <footer className="mega-footer">
          <div className="footer-container">
            {/* Products Link */}
            <div className="footer-column">
              <h3>Products</h3>
              <ul>
                <li><NavLink to="/ethician-overview">Products Overview</NavLink></li>
              </ul>
            </div>
    
            {/* Research Link */}
            <div className="footer-column">
              <h3>Research</h3>
              <ul>
                <li><NavLink to="/research-overview">Research Overview</NavLink></li>
              </ul>
            </div>
    
            {/* Company Link */}
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li><NavLink to="/overview">Company Overview</NavLink></li>
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
          </div>
    
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} HLB Technology Inc. All rights reserved.</p>
          </div>
        </footer>
      );
}

export default MegaFooter;

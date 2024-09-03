// components/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import CSS file for styling

function AboutPage() {
  return (
    <div className="about-page">
      <div className="glassmorphism-container">
        <h2>About Us</h2>
        <div className="person">
          <h3>Mr. HLB</h3>
          <p>
            Mr. HLB is an industry veteran with years of experience. He decided to get involved with AI in response to both its rapidly growing capabilities and the world's concerns of its misuse without proper ethical alignment.
          </p>
        </div>
        <div className="person">
          <h3>Mr. RHH</h3>
          <p>
            Mr. RHH is a software engineer with a passion for app development. He learned of Mr. HLB's mission and began his own journey into the depths of AI Development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
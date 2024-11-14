// components/AboutPage.js

import React from 'react';
import './AboutPage.css'; // Import CSS file for styling

function AboutPage() {
  return (
    <div className="about-page">
      <div className='glassmorphism-container1'>
        <h2>About HLB Technology, Inc.</h2>
        <p>
        HLB Technology, Inc. in Memphis offers ETHICIAN, an AI-driven platform that empowers individuals in self-discovery and ethical exploration. Through interactive dialogue and personalized learning, we foster a commitment to ethical AI alignment, enabling users to engage in introspection and critical thinking. Experience a transformative journey toward a more conscious and ethical world with our integrated ChattergptXpert AI Agent, enhancing conversational abilities and providing insightful responses.
        </p>
      </div>
      <div className="glassmorphism-container">
        <h2>About Us</h2>
        <div className="person">
          <h3>Mr. H</h3>
          <p>
            Mr. H is an industry veteran with years of experience. He decided to get involved with AI in response to both its rapidly growing capabilities and the world's concerns of its misuse without proper ethical alignment.
          </p>
        </div>
        <div className="person">
          <h3>Mr. R</h3>
          <p>
            Mr. R is a software engineer with a passion for app development. He learned of Mr. H's mission and began his own journey into the depths of AI Development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
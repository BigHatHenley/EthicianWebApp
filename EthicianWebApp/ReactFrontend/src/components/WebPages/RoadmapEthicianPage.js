import React from "react";
import './WebPageStylings/RoadmapEthicianPage.css';
import MegaFooter from '../MegaFooter';

const RoadmapEthicianPage = () => {
    return (
      <div className="roadmap-dynamic-gradient">
        <div className="roadmap-content-wrapper">
          <div className="roadmap-glassmorphic-container">
            <h1>ETHICIAN Roadmap: 2024–2026</h1>
            <div className="roadmap-content">
              <h2>2024:</h2>
              <ul>
                <li>Refine ETHICIAN’s conversational framework for more nuanced ethical reasoning.</li>
                <li>Begin research and development for voice and video analysis capabilities.</li>
                <li>Establish partnerships with research institutions for advancing AI alignment techniques.</li>
              </ul>
              <h2>2025:</h2>
              <ul>
                <li>Prototype ETHICIAN’s API for developers, including tools for ethical filtering and sentiment analysis.</li>
                <li>Beta test voice and video analysis, focusing on detecting intent, tone, and emotion.</li>
                <li>Expand ETHICIAN’s dataset with diverse, ethically vetted sources to enhance reasoning.</li>
              </ul>
              <h2>2026:</h2>
              <ul>
                <li>Launch ETHICIAN as a standalone Language Model with public API access.</li>
                <li>Deploy full-feature voice and video analysis capabilities.</li>
                <li>Integrate ETHICIAN into enterprise solutions for HR, education, and healthcare industries.</li>
                <li>Release an open ethical AI toolkit to promote responsible AI development globally.</li>
              </ul>
            </div>
          </div>
          <MegaFooter />
        </div>
      </div>
    );
};

export default RoadmapEthicianPage;

import React from "react";
import './WebPageStylings/RoadmapMCXPage.css';
import MegaFooter from '../MegaFooter';

const RoadmapMCXPage = () => {
    return (
      <div className="roadmap-dynamic-gradient">
        <div className="roadmap-content-wrapper">
          <div className="roadmap-glassmorphic-container">
            <h1>MultiChatXpert Roadmap: 2024–2026</h1>
            <div className="roadmap-content">
              <h2>2024:</h2>
              <ul>
                <li>Enhance core Alpha features, such as improving Text-to-Speech voices and refining Speech-to-Text accuracy.</li>
                <li>Expand file processing capabilities to handle a wider variety of file types, including images and PDFs.</li>
                <li>Introduce initial conversational analytics like sentiment tracking and basic conversation summaries.</li>
                <li>Focus on stability, scalability, and security enhancements to prepare for a broader user base.</li>
              </ul>
              <h2>2025:</h2>
              <ul>
                <li>Launch Beta version with significant UI/UX improvements and added functionality for AI customization.</li>
                <li>Integrate ETHICIAN’s voice and video analysis features for deeper conversational insights.</li>
                <li>Develop multilingual support and optimize performance for global users.</li>
                <li>Expand collaboration features to include simultaneous engagement with multiple AI Agents.</li>
                <li>Release mobile and desktop apps with synchronization across devices.</li>
              </ul>
              <h2>2026:</h2>
              <ul>
                <li>Launch the full version of MultiChatXpert, complete with tailored AI-agent configurations for enterprise clients.</li>
                <li>Optimize compatibility with VR/AR technologies for immersive conversational experiences.</li>
                <li>Introduce advanced analytics tools, including detailed conversation reports and predictive modeling.</li>
                <li>Expand subscription tiers with additional premium features designed for businesses and advanced users.</li>
              </ul>
            </div>
          </div>
          <MegaFooter />
        </div>
      </div>
    );
};

export default RoadmapMCXPage;

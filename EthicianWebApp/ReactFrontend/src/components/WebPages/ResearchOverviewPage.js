import React from "react";
import './WebPageStylings/ResearchOverviewPage.css'
import MegaFooter from '../MegaFooter';

const ResearchOverviewPage = () => {
  return (
    <div className="dynamic-gradient research-overview-page">
      <div className="glassmorphic-container">
        <h1>Our Research</h1>
        <p>
          At HLB Technology, research is the cornerstone of innovation. Our team
          is pioneering advancements in AI ethics and alignment, leveraging
          philosophical principles to create systems that think and reason with
          humanity's best interests in mind. By exploring groundbreaking topics
          like Quantum Consciousness and AI Coherence, we ensure our models
          operate on a foundation of ethical reasoning and human-aligned
          perspectives.
        </p>
      </div>
      <MegaFooter />
    </div>
  );
};

export default ResearchOverviewPage;
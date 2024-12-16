import React from "react";
import './WebPageStylings/ResearchCoherencePage.css';
import MegaFooter from '../MegaFooter';

const ResearchCoherencePage = () => {
    return (
      <div className="dynamic-gradient research-coherence-page">
        <div className="coherence-glassmorphic-container">
          <h1>Coherence and Decoherence</h1>
          <p>
            Coherence represents order and unity in reasoning, while decoherence
            introduces complexity and diversity, reflecting the real-world
            interplay between structured thought and spontaneous creativity. These
            principles form the backbone of ETHICIAN, enabling it to navigate
            intricate ethical dilemmas while remaining grounded in human-first
            principles. In MultiChatXpert, this balance manifests as an AI that
            can both focus on solving specific problems and explore open-ended,
            thought-provoking discussions, making it a versatile tool for users
            across disciplines.
          </p>
        </div>
        <MegaFooter />
      </div>
    );
};

export default ResearchCoherencePage;

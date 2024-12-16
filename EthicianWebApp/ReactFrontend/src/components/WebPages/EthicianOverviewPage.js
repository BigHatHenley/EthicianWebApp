import React from "react";
import './WebPageStylings/EthicianOverviewPage.css';
import MegaFooter from '../MegaFooter';

const EthicianOverviewPage = () => {
  return (
    <div className="ethician-overview-page">
      <div className="glassmorphic-container">
        <h1>Our Products</h1>
        <h2>MultiChatXpert</h2>
        <p>
          Dive into a next-generation conversational experience with
          MultiChatXpert. Engage with ETHICIAN, our groundbreaking ethical
          language model, or interact with other popular models—all under
          ETHICIAN's ethical supervision. Whether for personal use or
          professional needs, MultiChatXpert offers subscription-based access
          and custom AI agent solutions tailored for any industry.
        </p>
        <h2>ETHICIAN</h2>
        <p>
          ETHICIAN represents a new standard in AI alignment. Designed with
          human-first principles, it integrates advanced philosophical
          frameworks like Coherence/Decoherence, perspective, and Quantum
          Consciousness to deliver profound reasoning and a grounded ethical
          perspective. ETHICIAN is more than a language model—it’s a trusted
          companion for navigating complex challenges in an ethical and aligned
          way.
        </p>
      </div>
      <MegaFooter />
    </div>
  );
};

export default EthicianOverviewPage;

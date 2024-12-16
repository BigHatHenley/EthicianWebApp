import React from "react";
import './WebPageStylings/EthicianAPIPage.css';
import MegaFooter from '../MegaFooter';

const EthicianAPIPage = () => {
  return (
    <div className="ethician-api-page">
      {/* Content Section */}
      <div className="glassmorphic-container">
        <h1>ETHICIAN API: Empowering Ethical AI Development</h1>
        <p>
          HLB Technology Inc. is thrilled to announce plans for the ETHICIAN API—a
          revolutionary tool designed to empower developers and organizations to
          create ethical AI agents and models. The ETHICIAN API will provide access
          to our groundbreaking ethical language model, enabling users to integrate
          advanced ethical reasoning into their AI solutions effortlessly.
        </p>
        <p>
          Through a subscription-based model, the ETHICIAN API will include robust
          features such as tools for ethical filtering, sentiment analysis, and
          nuanced decision-making capabilities. Developers will have the freedom to
          design AI agents that align with their specific ethical goals while
          leveraging ETHICIAN’s foundational principles of Coherence, Decoherence,
          and Quantum Consciousness.
        </p>
        <p>
          Our API is set to support various applications, from enhancing
          conversational agents to designing systems for sensitive industries like
          healthcare, education, and HR. With ETHICIAN’s powerful reasoning
          capabilities and HLB Tech’s commitment to human-first AI, this API will
          ensure that ethical alignment becomes a standard in AI development.
        </p>
        <p>
          Join us on this journey to shape the future of responsible AI. The
          ETHICIAN API will open up new possibilities for collaboration,
          innovation, and trust in the AI ecosystem.
        </p>
      </div>

      {/* Footer Section */}
      <MegaFooter />
    </div>
  );
};

export default EthicianAPIPage;

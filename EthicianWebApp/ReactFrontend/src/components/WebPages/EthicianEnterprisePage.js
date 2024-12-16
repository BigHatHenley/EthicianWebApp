import React from "react";
import './WebPageStylings/EthicianEnterprisePage.css';
import MegaFooter from '../MegaFooter';

const EthicianEnterprisePage = () => {
  return (
    <div className="ethician-enterprise-page">
      {/* Content Section */}
      <div className="glassmorphic-container">
        <h1>ETHICIAN Enterprise Solutions: Redefining Ethical AI for Businesses</h1>
        <p>
          HLB Technology Inc. is dedicated to advancing ethical AI by tailoring
          ETHICIAN for enterprise-level applications. As organizations across
          industries recognize the importance of responsible AI, ETHICIAN
          Enterprise Solutions offer a groundbreaking opportunity to integrate
          ethical AI into mission-critical operations.
        </p>
        <p>
          Our vision is to equip businesses with ETHICIAN’s robust ethical
          reasoning capabilities through customized AI agents and tools. Whether
          in healthcare, education, human resources, or finance, ETHICIAN will
          enable organizations to address complex challenges with transparency,
          fairness, and accountability. Key features include advanced sentiment
          analysis, intent detection, and decision-making frameworks rooted in
          human-aligned principles.
        </p>
        <p>
          ETHICIAN’s enterprise solutions will also include modular APIs and
          customizable configurations, allowing businesses to create AI systems
          that align with their unique ethical values and operational needs.
          Additionally, ETHICIAN will support compliance with global ethical AI
          standards, ensuring enterprises stay ahead in an evolving regulatory
          landscape.
        </p>
        <p>
          At HLB Tech, we believe that ethical AI is not just a competitive
          advantage but a moral imperative. By entering the enterprise space,
          ETHICIAN aims to lead the charge in transforming industries with AI
          systems that are as principled as they are powerful.
        </p>
      </div>

      {/* Footer Section */}
      <MegaFooter />
    </div>
  );
};

export default EthicianEnterprisePage;

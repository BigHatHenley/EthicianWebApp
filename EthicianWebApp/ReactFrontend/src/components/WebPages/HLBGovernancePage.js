import React from "react";
import './WebPageStylings/HLBGovernancePage.css';
import MegaFooter from '../MegaFooter';

const HLBGovernancePage = () => {
  return (
    <div className="hlb-governance-page">
      <div className="glassmorphic-container">
        <h1>Our Leadership and Governance</h1>
        <p>
          At HLB Technology Inc., governance is driven by a shared commitment to
          ethical innovation and accountability. Mr. Bowers, our founder and
          owner, provides visionary leadership, ensuring the company’s strategic
          direction aligns with its core mission of humanity-first AI. Mr.
          Henley, our lead developer, oversees the technical roadmap with
          expertise in AI alignment, ensuring all projects adhere to the
          highest ethical and technological standards. Together, they form a
          governance structure that balances strategic foresight with technical
          rigor, fostering a culture of transparency, innovation, and
          responsibility. Though compact in size, HLB Technology operates with
          a robust governance model that underscores its commitment to making a
          meaningful impact through ethical AI solutions.
        </p>
      </div>
      <MegaFooter />
    </div>
  );
};

export default HLBGovernancePage;

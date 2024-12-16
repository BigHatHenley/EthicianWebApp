import React from "react";
import './WebPageStylings/HLBOverviewPage.css';
import MegaFooter from '../MegaFooter';

const HLBOverviewPage = () => {
  return (
    <div className="dynamic-gradient hlb-overview-page">
      <div className="glassmorphic-container">
        <h1>About HLB Technology Inc.</h1>
        <p>
          HLB Technology Inc. is a Memphis-based startup redefining what it
          means to create AI that serves humanity. Founded by Mr. Bowers and Mr.
          Henley, our mission is simple yet profound: to ensure artificial
          intelligence operates ethically and aligns with human values. Through
          innovative products like MultiChatXpert and ETHICIAN, we are at the
          forefront of developing AI solutions that are not just tools but
          trusted partners in shaping a better future.
        </p>
      </div>
      <MegaFooter />
    </div>
  );
};

export default HLBOverviewPage;

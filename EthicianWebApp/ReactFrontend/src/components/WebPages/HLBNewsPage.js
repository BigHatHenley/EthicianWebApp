import React from "react";
import './WebPageStylings/HLBNewsPage.css';
import MegaFooter from '../MegaFooter';

const HLBNewsPage = () => {
  const today = new Date().toLocaleString();

  return (
    <div className="hlb-news-page">
      <div className="glassmorphic-container">
        <h1>HLB Tech's New Website: A Work in Progress</h1>
        <p className="news-date">{today}</p>
        <p>
          HLB Technology Inc. is excited to announce the launch of our new
          website, a dynamic platform designed to showcase our innovative
          projects and research. As a work in progress, the site reflects our
          commitment to transparency and collaboration as we continue to refine
          its features.
        </p>
        <p>
          Coinciding with the Alpha release of the Lite version of
          MultiChatXpert, our new website provides a space for users to explore
          the capabilities of our AI systems, stay updated on our latest news,
          and connect with our vision for ethical AI.
        </p>
        <p>
          Stay tuned for more updates as we expand the site with additional
          content, features, and resources to support our growing community. We
          invite you to join us on this journey toward a more transparent and
          ethically-driven future.
        </p>
      </div>
      <MegaFooter />
    </div>
  );
};

export default HLBNewsPage;

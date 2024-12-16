import React from "react";
import './WebPageStylings/EthicianPricingPage.css';
import MegaFooter from '../MegaFooter';

const EthicianPricingPage = () => {
  return (
    <div className="ethician-pricing-page">
      <div className="glassmorphic-container">
        <h1>Pricing Plans: MultiChatXpert & ETHICIAN API</h1>
        <div className="pricing-content">
          <h2>MultiChatXpert Subscription Plans</h2>
          <ul>
            <li>
              <strong>Lite Tier (Free)</strong>: Perfect for individuals looking to explore the basic features of MultiChatXpert.
              <ul>
                <li>Access to core conversational tools.</li>
                <li>Limited interactions with AI Agents.</li>
                <li>Basic text-based communication.</li>
              </ul>
            </li>
            <li>
              <strong>Pro Tier ($19.99/month)</strong>: Unlock enhanced features for a richer experience.
              <ul>
                <li>Full access to MultiChatXpert’s conversational analytics.</li>
                <li>Expanded interactions with multiple AI Agents.</li>
                <li>Priority support and access to new updates.</li>
              </ul>
            </li>
            <li>
              <strong>Enterprise Tier (Custom Pricing)</strong>: Tailored solutions for businesses.
              <ul>
                <li>Dedicated AI-agent configurations.</li>
                <li>Collaboration tools for teams.</li>
                <li>Advanced analytics and integration with ETHICIAN.</li>
              </ul>
            </li>
          </ul>
          <h2>ETHICIAN API Subscription Plans</h2>
          <ul>
            <li>
              <strong>Developer Tier ($99/month)</strong>: Ideal for developers creating custom AI applications.
              <ul>
                <li>API access for ethical filtering and sentiment analysis.</li>
                <li>Limited API requests per month.</li>
              </ul>
            </li>
            <li>
              <strong>Business Tier ($499/month)</strong>: Designed for small to medium-sized businesses.
              <ul>
                <li>Enhanced API capabilities, including intent detection.</li>
                <li>Increased request limits and priority support.</li>
              </ul>
            </li>
            <li>
              <strong>Enterprise Tier (Custom Pricing)</strong>: Comprehensive solutions for large-scale implementations.
              <ul>
                <li>Unlimited API requests.</li>
                <li>Advanced tools for ethical reasoning and compliance.</li>
                <li>Full support for tailored integrations.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <MegaFooter />
    </div>
  );
};

export default EthicianPricingPage;

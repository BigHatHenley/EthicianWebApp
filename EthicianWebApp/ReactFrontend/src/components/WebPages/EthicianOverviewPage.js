import React from "react";
import './WebPageStylings/EthicianOverviewPage.css';
import MegaFooter from '../MegaFooter';

const EthicianOverviewPage = () => {
  return (
    <div className="ethician-overview-page">
        <h3>
        At HLB Technology, we are redefining the role of AI and digital innovation through a suite of products designed to empower individuals and businesses alike. From MultiChatXpert’s next-generation conversational experiences to the ETHICIAN framework’s groundbreaking ethical AI alignment, our offerings reflect a commitment to trust, transparency, and human-first principles. Whether you’re seeking advanced conversational tools, ethically aligned AI solutions, or a revolutionary approach to cryptocurrency with E-Coin, our products are built to serve humanity responsibly and drive equitable outcomes across industries. Explore the possibilities with HLB Technology and join us in shaping the future of ethical innovation.
        </h3>
      <div className="container multichatxpert-section">
        <h1>MultiChatXpert</h1>
        <p>
          Dive into a next-generation conversational experience with
          MultiChatXpert. Engage with ETHICIAN, our groundbreaking ethical
          language model, or interact with other popular models—all under
          ETHICIAN's ethical supervision. Whether for personal use or
          professional needs, MultiChatXpert offers subscription-based access
          and custom AI agent solutions tailored for any industry.
        </p>

        {/* MultiChatXpert Pricing Plans */}
        <div className="pricing-category">
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
        </div>
      </div>

      {/* ETHICIAN Framework Section */}
      <div className="container ethician-framework-section">
        <h1>ETHICIAN Framework</h1>
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

      {/* ETHICIAN API Section */}
      <div className="container api-section">
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

        {/* ETHICIAN API Pricing Plans */}
        <div className="pricing-category">
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

      {/* E-Coin Section */}
      <div className="container e-coin-section">
        <h1>E-Coin: An Ethically Aligned Cryptocurrency</h1>
        <p>
          HLB Technology Inc. is pioneering the development of E-Coin, an
          ethically aligned cryptocurrency designed to revolutionize financial
          systems with trust, transparency, and fairness. Leveraging advanced AI
          capabilities, E-Coin aims to ensure ethical oversight and analysis of
          transactions, fostering accountability and trust across all
          stakeholders.
        </p>
        <p>
          With E-Coin, every transaction will reflect the values of fairness,
          inclusivity, and sustainability. By integrating ETHICIAN’s ethical
          reasoning framework, E-Coin will empower investors, clients, and users
          to engage in a financial ecosystem that prioritizes integrity and
          ethical standards.
        </p>
        <p>
          E-Coin is designed for applications in diverse industries, from
          supporting sustainable projects to promoting equitable trade and
          addressing global financial disparities. As we continue to develop
          E-Coin, our vision is to create a digital currency that redefines the
          role of cryptocurrencies as a force for good in the world.
        </p>
      </div>
    <MegaFooter />
    </ div>
  );
};

export default EthicianOverviewPage;

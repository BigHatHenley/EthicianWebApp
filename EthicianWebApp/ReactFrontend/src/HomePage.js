import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import MultiChatXpertPage from './components/MultiChatXpertPage';
import LoginForm from './components/LoginForm';
import EthicianAPIPage from './components/WebPages/EthicianAPIPage';
import EthicianEnterprisePage from './components/WebPages/EthicianEnterprisePage';
import EthicianOverviewPage from './components/WebPages/EthicianOverviewPage';
import EthicianPricingPage from './components/WebPages/EthicianPricingPage';
import HLBGoalsPage from './components/WebPages/HLBGoalsPage';
import HLBGovernancePage from './components/WebPages/HLBGovernancePage';
import HLBNewsPage from './components/WebPages/HLBNewsPage';
import HLBOverviewPage from './components/WebPages/HLBOverviewPage';
import ResearchAIConsciousnessPage from './components/WebPages/ResearchAIConsciousnessPage';
import ResearchCoherencePage from './components/WebPages/ResearchCoherencePage';
import ResearchCryptoPage from './components/WebPages/ResearchCryptoPage';
import ResearchOverviewPage from './components/WebPages/ResearchOverviewPage';
import ResearchQuantumComputingPage from './components/WebPages/ResearchQuantumComputingPage';
import RoadmapEthicianPage from './components/WebPages/RoadmapEthicianPage';
import RoadmapMCXPage from './components/WebPages/RoadmapMCXPage';
import './HomePage.css';
import MegaFooter from './components/MegaFooter'; // Adjust the path if needed


function HomePageContent() {
  return (
    <div className="homepage">
      <div className="intro-section">
        <h1>Welcome to HLB Technology</h1>
        <p>
          Empowering Ethical AI for a Better Future. Discover cutting-edge
          AI solutions designed to align with humanity's best interests.
        </p>
        <NavLink to="/ethician-overview" className="cta-button">Explore ETHICIAN</NavLink>
        <NavLink to="/multichatxpert" className="cta-button secondary">Try MultiChatXpert</NavLink>
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          At HLB Technology, we combine innovation and ethical principles to create groundbreaking AI systems. Our mission is to lead the way in ethical AI alignment, ensuring technology serves humanity responsibly.
        </p>
      </div>

      <div className="features-section">
        <h2>Our Solutions</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>MultiChatXpert</h3>
            <p>
              Engage with multiple language models simultaneously to achieve unparalleled conversational capabilities tailored to your needs.
            </p>
            <NavLink to="/multichatxpert">Learn More</NavLink>
          </div>
          <div className="feature-card">
            <h3>ETHICIAN</h3>
            <p>
              Experience our groundbreaking AI ethical alignment model, built with principles like Quantum Consciousness and Coherence.
            </p>
            <NavLink to="/ethician-overview">Discover ETHICIAN</NavLink>
          </div>
          <div className="feature-card">
            <h3>AI for Industries</h3>
            <p>
              Transform your business with AI solutions tailored for healthcare, education, and more, ensuring ethical alignment and innovation.
            </p>
            <NavLink to="/ethician-enterprise">Explore Applications</NavLink>
          </div>
          <div className="feature-card">
            <h3>E-Coin</h3>
            <p>
              Our upcoming ethically focused cryptocurrency, E-Coin, ensures transparency, fairness, and sustainability in the financial world.
            </p>
            <NavLink to="/research-crypto">Learn About E-Coin</NavLink>
          </div>
        </div>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
      <MegaFooter />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePageContent />} />
        <Route path="/multichatxpert" element={<MultiChatXpertPage />} />
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/ethician-api" element={<EthicianAPIPage />} />
        <Route path="/ethician-enterprise" element={<EthicianEnterprisePage />} />
        <Route path="/ethician-overview" element={<EthicianOverviewPage />} />
        <Route path="/ethician-pricing" element={<EthicianPricingPage />} />
        <Route path="/goals" element={<HLBGoalsPage />} />
        <Route path="/governance" element={<HLBGovernancePage />} />
        <Route path="/news" element={<HLBNewsPage />} />
        <Route path="/overview" element={<HLBOverviewPage />} />
        <Route path="/research-ai-consciousness" element={<ResearchAIConsciousnessPage />} />
        <Route path="/research-coherence" element={<ResearchCoherencePage />} />
        <Route path="/research-crypto" element={<ResearchCryptoPage />} />
        <Route path="/research-overview" element={<ResearchOverviewPage />} />
        <Route path="/research-quantum-computing" element={<ResearchQuantumComputingPage />} />
        <Route path="/roadmap-ethician" element={<RoadmapEthicianPage />} />
        <Route path="/roadmap-mcx" element={<RoadmapMCXPage />} />
      </Routes>
    </>
  );
}

export default HomePage;

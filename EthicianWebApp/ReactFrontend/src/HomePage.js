import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import MultiChatXpertPage from './components/MultiChatXpertPage';
import LoginForm from './components/LoginForm';
import EthicianOverviewPage from './components/WebPages/EthicianOverviewPage';
import HLBOverviewPage from './components/WebPages/HLBOverviewPage';
import ResearchOverviewPage from './components/WebPages/ResearchOverviewPage';
import RoadmapEthicianPage from './components/WebPages/RoadmapEthicianPage';
import RoadmapMCXPage from './components/WebPages/RoadmapMCXPage';
import './HomePage.css';
import MegaFooter from './components/MegaFooter'; // Adjust the path if needed


function HomePageContent() {
  return (
    <div className="homepage">
      {/* Intro Section */}
      <div className="intro-section" >
        <div className="hero-text">
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 100 }}>
            Quantum-powered research for the ethical AI of the future
          </h1>
          <NavLink to="/ethician-overview" className="cta-button">Explore ETHICIAN</NavLink>
          <NavLink to="/multichatxpert" className="cta-button secondary">Try MultiChatXpert</NavLink>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section parallax" style={{ backgroundImage: `url('./components/images/RetroDay.png')` }}>
        <div className="about-image"></div>
        <div className="about-text">
          <h2>About Us</h2>
          <p>
          At HLB Technology, we merge cutting-edge innovation with unwavering ethical principles to pioneer a new era of responsible AI. Guided by our mission to lead in ethical AI alignment, we develop groundbreaking systems that prioritize humanity’s well-being. From advanced conversational platforms like MultiChatXpert to ethically-aligned cryptocurrency solutions like E-Coin, our products are designed to address the challenges of the modern digital landscape while upholding trust, transparency, and accountability.
          </p>
          <p>
          Our core philosophy centers on ensuring that AI serves humanity responsibly, empowering businesses and individuals with tools that are not only powerful but also aligned with the highest ethical standards. By integrating philosophical frameworks like Coherence/Decoherence and Quantum Consciousness into our AI models, we provide innovative solutions that inspire confidence and drive equitable outcomes.
          </p>
          <p>
          As leaders in ethical AI, we are committed to shaping a future where technology is a force for good—bridging the gap between innovation and responsibility to create a better, more inclusive world.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" >
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
            <NavLink to="/ethician-overview">Explore Applications</NavLink>
          </div>
          <div className="feature-card">
            <h3>E-Coin</h3>
            <p>
              Our upcoming ethically focused cryptocurrency, E-Coin, ensures transparency, fairness, and sustainability in the financial world.
            </p>
            <NavLink to="/research-overview">Learn About E-Coin</NavLink>
          </div>
        </div>
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
        <Route path="/ethician-overview" element={<EthicianOverviewPage />} />
        <Route path="/overview" element={<HLBOverviewPage />} />
        <Route path="/research-overview" element={<ResearchOverviewPage />} />
        <Route path="/roadmap-ethician" element={<RoadmapEthicianPage />} />
        <Route path="/roadmap-mcx" element={<RoadmapMCXPage />} />
      </Routes>
    </>
  );
}

export default HomePage;

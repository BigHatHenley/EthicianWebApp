import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import './HomePage.css'; // Import CSS file for styling
//import './Navbar.css';

// Components for other pages
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import MyUI from './components/MultiChatXpertPage';
import Navbar from './components/Navbar';


function HomePageUI() {
  return (
    <div className="homepage">
      <div className="glassmorphism-container">
        <h1>Welcome to MultiChatXpert</h1>
        <p>
          MultiChatXpert is a revolutionary app that allows you to work with multiple Language Models (LLMs) simultaneously.
          With a strong emphasis on ethical alignment, MultiChatXpert ensures responsible and fair AI interactions.
        </p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Render the Navbar component */}
      <Routes>
        <Route path="/" element={<HomePageUI />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/multichatxpert" element={<MyUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default HomePage;
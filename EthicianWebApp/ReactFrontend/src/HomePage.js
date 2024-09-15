import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import './HomePage.css'; // Import CSS file for styling

// Components for other pages
import AboutPage from './components/AboutPage';
import PricingPage from './components/PricingPage';
import MyUI from './components/MultiChatXpertPage';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

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
        <Route path="/login-form" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default HomePage;
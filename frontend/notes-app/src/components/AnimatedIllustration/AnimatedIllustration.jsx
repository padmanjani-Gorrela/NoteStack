import React from 'react';
import { Link } from 'react-router-dom'; // You'll need react-router-dom for navigation

// --- Animated SVG Illustration Component ---
const AnimatedIllustration = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Base of the illustration */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Main Notebook */}
        <path fill="#E2E8F0" d="M40,20 H160 a10,10 0 0 1 10,10 V170 a10,10 0 0 1 -10,10 H40 a10,10 0 0 1 -10,-10 V30 a10,10 0 0 1 10,-10 z" />
        <path fill="#4A5568" d="M40,20 H50 V180 H40 a10,10 0 0 1 -10,-10 V30 a10,10 0 0 1 10,-10 z" />
        <rect x="60" y="40" width="100" height="8" rx="2" fill="#CBD5E0" />
        <rect x="60" y="60" width="100" height="8" rx="2" fill="#CBD5E0" />
        <rect x="60" y="80" width="70" height="8" rx="2" fill="#CBD5E0" />
      </svg>
      
      {/* Floating Animated Elements */}
      <div className="absolute top-10 -left-10 w-16 h-16 bg-blue-100 rounded-full opacity-50 animate-float-slow"></div>
      <div className="absolute bottom-12 -right-12 w-24 h-24 bg-slate-200 rounded-lg opacity-50 animate-float-fast transform rotate-45"></div>
      
      {/* Animated Pen */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pen-float">
          <svg width="120" height="120" viewBox="0 0 24 24" className="transform -rotate-45 drop-shadow-lg">
              <path fill="#4299E1" d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825 0L4 13.586V18h4.414l10.631-10.599z"/>
              <path fill="#2B6CB0" d="M14.414 4L18 7.586l-2 2L12.414 6l2-2z"/>
          </svg>
      </div>
    </div>
  );
};

export default AnimatedIllustration;
import React from 'react';
import { Link } from 'react-router-dom'; 
import AnimatedIllustration from '../../components/AnimatedIllustration/AnimatedIllustration';

const LandingPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen overflow-hidden px-10">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-50/80 backdrop-blur-sm z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-slate-800">NoteStack</h1>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-600 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto pt-32 pb-16 px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Column: Text Content */}
        <div className="md:w-1/2 text-center md:text-left animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
            Effortless Note-Taking, <br/> Perfectly Organized.
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            NoteStack is your personal digital notebook. Capture ideas, organize your thoughts with tags, and access your notes from anywhere. Simple, fast, and secure.
          </p>
          <div className="mt-10">
            <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
              Get Started for Free
            </Link>
          </div>
        </div>

        {/* Right Column: Animated Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <AnimatedIllustration />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;


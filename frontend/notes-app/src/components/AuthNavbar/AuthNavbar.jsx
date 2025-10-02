import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthNavbar = () => (
    <header className="fixed top-0 left-0 right-0 bg-slate-50/80 backdrop-blur-sm z-10">
        <div className="container mx-auto flex justify-between items-center p-4">
            <Link to="/" className="text-2xl font-bold text-slate-800">NoteStack</Link>
            <div className="flex items-center gap-4">
                <span className="text-slate-600">Don't have an account?</span>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                    Sign Up
                </Link>
            </div>
        </div>
    </header>
);
export default AuthNavbar;
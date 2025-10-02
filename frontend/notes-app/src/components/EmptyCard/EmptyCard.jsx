import React from 'react';

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* Embedded SVG for the empty state illustration */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="180" 
        height="180" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-slate-300"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>

      <p className="w-1/2 text-lg font-medium text-slate-500 text-center leading-7 mt-5">
        {message || "No notes found! Create your first note with NoteStack😊."}
      </p>
    </div>
  );
};

export default EmptyCard;
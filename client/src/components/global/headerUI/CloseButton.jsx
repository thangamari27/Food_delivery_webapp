import React from 'react';

const CloseButton = ({ setIsMenuOpen }) => {
  return (
    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default CloseButton;
import React from 'react';

const MobileMenuButton = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg className="h-6 w-6 cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuButton;
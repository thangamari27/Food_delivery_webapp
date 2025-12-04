import React from 'react';
import CloseButton from './CloseButton';
import SignInButton from './SignInButton';

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, navLinks, ctaButtons }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
      isMenuOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      
      {/* Close Button */}
      <CloseButton setIsMenuOpen={setIsMenuOpen} />
      
      {/* Navigation Links */}
      {navLinks.map((link, i) => (
        <a 
          key={i} 
          href={link.path} 
          onClick={() => setIsMenuOpen(false)} 
          className="text-lg hover:text-orange-500"
        >
          {link.name}
        </a>
      ))}

      {/* Mobile Sign In Button */}
      <SignInButton ctaButtons={ctaButtons} />
    </div>
  );
};

export default MobileMenu;
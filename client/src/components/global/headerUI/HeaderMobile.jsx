import React from 'react';
import MobileMenuButton from './MobileMenuButton';
import MobileMenu from './MobileMenu';

const HeaderMobile = ({ isMenuOpen, setIsMenuOpen, navLinks, ctaButtons }) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      
      />

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        navLinks={navLinks}
        ctaButtons={ctaButtons}
      />
    </>
  );
};

export default HeaderMobile;
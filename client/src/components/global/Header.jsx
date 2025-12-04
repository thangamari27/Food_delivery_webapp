import React from 'react';
import Logo from './headerUI/Logo';
import HeaderDesktop from './headerUI/HeaderDesktop';
import HeaderMobile from './headerUI/HeaderMobile';
import { navLinks, brandConfig, ctaButtons } from '@/utils/constant/admin/HomeConstant'

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled 
          ? "bg-white shadow-md text-gray-700 py-3 md:py-4" 
          : "bg-transparent text-gray-800 py-4 md:py-6"
      }`}>
        
        {/* Logo and brand */}
        <Logo isScrolled={isScrolled} brandConfig={brandConfig} />
        
        {/* Desktop Navigation */}
        <HeaderDesktop isScrolled={isScrolled} navLinks={navLinks} ctaButtons={ctaButtons.primary} />
        
        {/* Mobile Navigation */}
        <HeaderMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navLinks={navLinks} ctaButtons={ctaButtons.primary} />
      </nav>
    </>
  );
};

export default Header;
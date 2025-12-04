import React from 'react';
import NavLink from './NavLink';
import SignInButton from './SignInButton';

const HeaderDesktop = ({ isScrolled, navLinks, ctaButtons }) => {
  return (
    <>
      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map((link, i) => (
          <NavLink
            key={i} 
            link={link} 
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="hidden md:flex items-center gap-2">
        <SignInButton ctaButtons={ctaButtons} />
      </div>
    </>
  );
};

export default HeaderDesktop;
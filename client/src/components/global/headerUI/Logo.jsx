import React from 'react';

const Logo = ({ isScrolled, brandConfig }) => {
  return (
    <a href={brandConfig.path} className="flex items-center gap-2 mr-2">
      <span className="text-2xl">{brandConfig.logo}</span>
      <span className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
        {brandConfig.name}
      </span>
    </a>
  );
};

export default Logo;
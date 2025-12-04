import React from 'react';

const NavLink = ({ link, isActive }) => {
  return (
    <a 
      href={link.path} 
      className={`group flex flex-col gap-0.5 font-medium hover:text-orange-500 transition-colors ${
        isActive ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : ''
      }`}
    >
      {link.name}
    </a>
  );
};

export default NavLink;
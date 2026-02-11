import React from 'react';

function Badge({ children, type = 'default', styles }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    status: children === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : children === 'Out of Stock' || children === 'Inactive'
      ? 'bg-red-100 text-red-800'
      : 'bg-yellow-100 text-yellow-800',
    type: children === 'Special Menu'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800',
    category: 'bg-orange-100 text-orange-800',
    cuisine: 'bg-teal-100 text-teal-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[type]}`}>
      {children}
    </span>
  );
}

export default Badge;
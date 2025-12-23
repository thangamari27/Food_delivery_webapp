import React from 'react';

const DemoToggleButton = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <button
      onClick={() => setIsLoggedIn(!isLoggedIn)}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
    >
      {isLoggedIn ? '🔓 Logout (Demo)' : '🔐 Login (Demo)'}
    </button>
  );
};

export default DemoToggleButton;
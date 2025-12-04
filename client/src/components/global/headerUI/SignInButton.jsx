import React from 'react';

const SignInButton = ({ ctaButtons }) => {
  return (
    <button className="bg-orange-500 text-white px-6 py-2.5 rounded-full ml-4 hover:bg-orange-600 transition-all duration-300 flex items-center gap-2">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
      </svg>
      <a href={ctaButtons.path} className='block md:hidden lg:block'>
        {ctaButtons.text}
      </a>
    </button>
  );
};

export default SignInButton;
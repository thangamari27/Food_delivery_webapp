import React from 'react';
import { Search } from 'lucide-react';

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex-1 relative">
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
        size={20} 
        aria-hidden="true"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
        aria-label="Search restaurants"
      />
    </div>
  );
}

export default SearchBar;   
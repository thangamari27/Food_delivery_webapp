import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch, placeholder, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <div className="relative flex-1">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-10 pr-10 py-3 border border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            disabled 
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
              : 'bg-white'
          }`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
      </div>
      {/* <button
        type="submit"
        disabled={disabled || !value}
        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
          disabled || !value
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
        aria-label="Search"
      >
        Search
      </button> */}
    </form>
  );
};

export default SearchBar;
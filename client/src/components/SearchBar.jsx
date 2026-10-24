import React from 'react';

function SearchBar({ value = '', onChange, placeholder = 'Search...' }) {
  return (
    <label className="search-box">
      <span aria-hidden="true">⌕</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        aria-label={placeholder}
      />
      <kbd>⌘ K</kbd>
    </label>
  );
}

export default SearchBar;

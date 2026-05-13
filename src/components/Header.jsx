import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="drag-region h-16 flex items-center justify-center px-8 bg-[#333333] border-b border-[#242424]">
      <form onSubmit={handleSearch} className="w-full max-w-2xl relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for applications..."
          className="block w-full pl-10 pr-10 py-2 bg-[#242424] border border-[#1a1a1a] rounded-lg text-sm text-[#f2f2f2] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#48b9c7] focus:border-[#48b9c7] transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-500 hover:text-gray-300" />
          </button>
        )}
      </form>
    </header>
  );
}

export default Header;

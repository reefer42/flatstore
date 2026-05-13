import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search } from 'lucide-react';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 drag-region">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer no-drag group"
          onClick={() => navigate('/')}
        >
          <Package className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors" />
          <span className="text-xl font-bold text-gray-800">FlatStore</span>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8 no-drag">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Flathub apps..."
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-base text-gray-900 shadow-sm transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Navbar;

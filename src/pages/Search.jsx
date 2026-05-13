import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppCard from '../components/AppCard';
import { Loader2, Search as SearchIcon } from 'lucide-react';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await window.api.searchFlathub(query);
        setResults(response.hits || response || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-[#48b9c7]" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <SearchIcon size={24} className="text-[#48b9c7]" />
        <h1 className="text-2xl font-bold">Results for "{query}"</h1>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-20 bg-[#242424] rounded-2xl border border-[#1a1a1a]">
          <p className="text-gray-500">No applications found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((app) => (
            <AppCard key={app.id || app.app_id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;

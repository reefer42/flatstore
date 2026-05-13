import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppCard from '../components/AppCard';
import { Loader2 } from 'lucide-react';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const response = await window.api.searchFlathub(query);
        setResults(response.hits || response || []);
      } catch (err) {
        setError('Failed to search apps.');
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query]);

  if (!query) {
    return <div className="p-8 text-center text-gray-500">Please enter a search term.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Search Results for "{query}"
      </h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">{error}</div>
      ) : results.length === 0 ? (
        <div className="text-center text-gray-500 p-8">No apps found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((app) => (
            <AppCard key={app.id || app.app_id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;

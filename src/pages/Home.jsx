import React, { useEffect, useState } from 'react';
import AppCard from '../components/AppCard';
import { Loader2 } from 'lucide-react';

function Home() {
  const [popularApps, setPopularApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await window.api.getPopularApps();
        setPopularApps(response.hits || response || []);
      } catch (err) {
        setError('Failed to load popular apps.');
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Popular on Flathub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularApps.map((app) => (
          <AppCard key={app.id || app.app_id} app={app} />
        ))}
      </div>
    </div>
  );
}

export default Home;

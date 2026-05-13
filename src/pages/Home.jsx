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
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-[#48b9c7]" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-12">
      {/* Hero / Featured Section */}
      <section>
        <div className="bg-gradient-to-r from-[#48b9c7] to-[#3a939e] rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to FlatStore</h2>
          <p className="text-white/80 max-w-xl">
            Discover the best open-source applications for your Linux desktop. Fast, secure, and always up to date.
          </p>
        </div>
      </section>

      {/* Popular Apps Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#f2f2f2]">Popular on Flathub</h2>
          <button className="text-sm text-[#48b9c7] hover:underline font-medium">View All</button>
        </div>
        
        {error ? (
          <div className="bg-[#242424] border border-red-500/50 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularApps.slice(0, 12).map((app) => (
              <AppCard key={app.id || app.app_id} app={app} />
            ))}
          </div>
        )}
      </section>

      {/* Categories Mockup */}
      <section className="pb-12">
        <h2 className="text-xl font-bold text-[#f2f2f2] mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {['Graphics', 'Internet', 'Office', 'Multimedia', 'Games', 'Development'].map((cat) => (
            <div key={cat} className="bg-[#242424] hover:bg-[#3d3d3d] border border-[#1a1a1a] rounded-xl p-4 text-center cursor-pointer transition-all">
              <p className="text-sm font-medium text-gray-300">{cat}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TerminalSquare, Loader2, Globe, ShieldCheck } from 'lucide-react';

function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await window.api.getAppDetails(id);
        setApp(data);
      } catch (err) {
        setError('Failed to load app details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleInstall = async () => {
    try {
      await window.api.installApp(id);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="text-center text-red-500 p-8">
        <p>{error || 'App not found'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <img 
          src={app.icon || 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'} 
          alt={app.name} 
          className="w-32 h-32 rounded-3xl object-cover shadow-sm bg-gray-50 flex-shrink-0"
          onError={(e) => { e.target.src = 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'; }}
        />
        
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{app.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{app.summary}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="font-medium text-gray-700">{app.developer_name}</span>
            {app.metadata && app.metadata['flathub::verification::verified'] === true && (
              <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <ShieldCheck className="w-4 h-4" /> Verified
              </span>
            )}
            {app.urls && app.urls.homepage && (
              <a href={app.urls.homepage} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-500">
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
          </div>

          <button 
            onClick={handleInstall}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            <TerminalSquare className="w-5 h-5" />
            Install via Flatpak
          </button>
        </div>
      </div>

      {app.screenshots && app.screenshots.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Screenshots</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
            {app.screenshots.map((shot, index) => {
              // Find the largest size or default
              const imgSize = shot.sizes.find(s => s.width >= 600) || shot.sizes[0];
              if (!imgSize) return null;
              
              return (
                <img 
                  key={index} 
                  src={imgSize.src} 
                  alt="Screenshot" 
                  className="h-64 md:h-80 w-auto rounded-xl shadow-md object-cover snap-center border border-gray-200"
                />
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div 
          className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: app.description || 'No description available.' }}
        />
      </div>
    </div>
  );
}

export default AppDetails;

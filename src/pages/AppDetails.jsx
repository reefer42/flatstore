import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Download, ExternalLink, ShieldCheck } from 'lucide-react';

function AppDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await window.api.getAppDetails(id);
        setApp(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleInstall = async () => {
    setInstalling(true);
    try {
      await window.api.installApp(id);
    } catch (err) {
      alert('Installation failed: ' + err);
    } finally {
      setInstalling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-[#48b9c7]" />
      </div>
    );
  }

  if (!app) return <div className="p-8 text-center">App not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-[#48b9c7] transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-10 mb-12">
        <img 
          src={app.icon || 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'} 
          alt={app.name} 
          className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-[#242424] p-4 shadow-2xl"
        />
        
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">{app.name}</h1>
            <p className="text-lg text-gray-400">{app.summary}</p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <button 
              onClick={handleInstall}
              disabled={installing}
              className="flex items-center gap-2 px-8 py-3 bg-[#48b9c7] hover:bg-[#3a939e] text-white rounded-lg font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {installing ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Download size={20} />
              )}
              {installing ? 'Installing...' : 'Install'}
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#242424] text-[#48b9c7] rounded-md text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} />
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">About this application</h2>
            <div 
              className="text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: app.description }}
            />
          </section>

          {app.screenshots && app.screenshots.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Screenshots</h2>
              <div className="grid grid-cols-1 gap-4">
                {app.screenshots.slice(0, 3).map((s, i) => (
                  <img 
                    key={i}
                    src={s.sizes?.[0]?.src} 
                    className="rounded-xl border border-[#242424] w-full shadow-lg"
                    alt="Screenshot"
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-[#242424] rounded-xl p-6 border border-[#1a1a1a]">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Developer</p>
                <p className="text-sm text-white">{app.developer_name || 'Community'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">License</p>
                <p className="text-sm text-white">{app.project_license || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm text-white">{app.categories?.[0] || 'Utility'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex items-center justify-between px-4 py-3 bg-[#242424] hover:bg-[#3d3d3d] rounded-lg transition-colors group">
              <span className="text-sm">Website</span>
              <ExternalLink size={16} className="text-gray-500 group-hover:text-[#48b9c7]" />
            </button>
            <button className="flex items-center justify-between px-4 py-3 bg-[#242424] hover:bg-[#3d3d3d] rounded-lg transition-colors group">
              <span className="text-sm">Help</span>
              <ExternalLink size={16} className="text-gray-500 group-hover:text-[#48b9c7]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;

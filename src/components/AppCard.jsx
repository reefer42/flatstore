import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppCard({ app }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/app/${app.app_id || app.id}`)}
      className="group bg-[#242424] hover:bg-[#3d3d3d] border border-[#1a1a1a] rounded-xl p-4 transition-all cursor-pointer flex flex-col h-full hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img 
            src={app.icon || 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'} 
            alt={app.name} 
            className="w-14 h-14 rounded-xl object-cover bg-[#1a1a1a] p-1"
            onError={(e) => { e.target.src = 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'; }}
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-[#f2f2f2] truncate text-sm" title={app.name}>{app.name}</h3>
          <p className="text-[11px] text-gray-500 truncate font-medium uppercase tracking-wider">
            {app.developer_name || 'Community'}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4" title={app.summary}>
        {app.summary}
      </p>
      
      <div className="mt-auto pt-2 flex items-center justify-between">
        <span className="text-[10px] px-2 py-0.5 rounded bg-[#1a1a1a] text-gray-500 font-mono">
          FLATPAK
        </span>
        <button className="text-xs font-bold text-[#48b9c7] opacity-0 group-hover:opacity-100 transition-opacity">
          Details →
        </button>
      </div>
    </div>
  );
}

export default AppCard;

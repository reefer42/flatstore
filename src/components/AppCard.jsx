import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppCard({ app }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/app/${app.app_id || app.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-start gap-4 mb-3">
        <img 
          src={app.icon || 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'} 
          alt={app.name} 
          className="w-16 h-16 rounded-2xl object-cover bg-gray-50"
          onError={(e) => { e.target.src = 'https://dl.flathub.org/media/icons/128x128/org.freedesktop.Platform.png'; }}
        />
        <div className="flex-1 overflow-hidden">
          <h3 className="font-semibold text-gray-900 truncate" title={app.name}>{app.name}</h3>
          <p className="text-xs text-gray-500 truncate">{app.developer_name || 'Unknown Developer'}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2 mt-auto" title={app.summary}>
        {app.summary}
      </p>
    </div>
  );
}

export default AppCard;

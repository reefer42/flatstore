import React from 'react';
import { Home, Download, RefreshCw, Info } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Download, label: 'Installed', path: '/installed' },
    { icon: RefreshCw, label: 'Updates', path: '/updates' },
  ];

  return (
    <div className="w-64 bg-[#242424] flex flex-col border-r border-[#1a1a1a]">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-[#48b9c7]">FlatStore</h1>
        
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-[#3d3d3d] text-[#48b9c7]' : 'text-gray-400 hover:bg-[#3d3d3d] hover:text-[#f2f2f2]'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-gray-300 cursor-pointer">
          <Info size={18} />
          <span className="text-sm">About</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

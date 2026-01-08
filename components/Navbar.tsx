
import React from 'react';

interface NavbarProps {
  userName: string;
  onSettingsClick: () => void;
  onInfoClick: () => void;
  onLogout: () => void;
  onHomeClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, onSettingsClick, onInfoClick, onLogout, onHomeClick }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={onHomeClick}
        >
          <div className="bg-emerald-600 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <i className="fas fa-atom"></i>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-sky-600">
            BioChe Academy
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-slate-600 text-sm">
            <span className="font-medium mr-2">Hello, {userName}!</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
              <i className="fas fa-user-graduate"></i>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={onInfoClick}
              className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-all"
              title="Project Info"
            >
              <i className="fas fa-info-circle text-xl"></i>
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              title="Settings"
            >
              <i className="fas fa-cog text-xl"></i>
            </button>
            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Header = ({ userName = 'Admin' }) => {
  const navigate = useNavigate();

  // Mock profile photo - in real app, this would come from user data
  const profilePhoto = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80';

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.avif" alt="Boys Gotta Run" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">Boys Gotta Run</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
            Admin
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{userName}</span>
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            title="View Profile"
          >
            <img
              src={profilePhoto}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-200 hover:border-orange-400 transition-colors"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;


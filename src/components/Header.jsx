import React from 'react';

const Header = ({ userName = 'Admin' }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Boys Gotta Run" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900">Boys Gotta Run</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
            Admin
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{userName}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;


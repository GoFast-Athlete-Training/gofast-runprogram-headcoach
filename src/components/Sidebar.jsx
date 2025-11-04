import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button.jsx';
import { 
  LayoutDashboard, 
  MessageSquare, 
  DollarSign,
  BookOpen,
  Settings,
  LogOut,
  Building,
  Network
} from 'lucide-react';
import { cn } from '../lib/utils.js';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/curriculum', label: 'Curriculum', icon: BookOpen },
    { path: '/communicate', label: 'Communicate', icon: MessageSquare },
    { path: '/crm', label: 'CRM', icon: Building },
    { path: '/ecosystem', label: 'Ecosystem', icon: Network },
    { path: '/pricing', label: 'Pricing', icon: DollarSign },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Building className="w-8 h-8 text-orange-500" />
          <span className="text-xl font-bold text-gray-900">Site Management</span>
        </div>
        <p className="text-xs text-gray-500">Admin & CRM</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                isActive && 'bg-orange-500 text-white hover:bg-orange-600'
              )}
              onClick={() => navigate(item.path)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;


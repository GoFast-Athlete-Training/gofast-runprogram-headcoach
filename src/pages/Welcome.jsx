import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { ArrowRight, Activity } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform">
              <img src="/logo.avif" alt="Boys Gotta Run" className="w-24 h-24" />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Hi Head Coach/Owner
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              Take a look inside and see how you'll manage the program across all sites.
            </p>
            
            {/* CTA Button */}
            <Button 
              onClick={handleViewDashboard}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-7 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-full"
            >
              Take a Look Inside
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>

          {/* Image/Visual Element */}
          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80" 
                  alt="Youth running program" 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 items-center justify-center">
                  <Activity className="w-24 h-24 text-white opacity-50" />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-300 rounded-full opacity-50 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;


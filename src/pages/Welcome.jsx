import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Hi Head Coach/Owner
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Take a look inside and see how you'll manage the program across all sites.
        </p>
        <Button 
          onClick={handleViewDashboard}
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg"
        >
          View My Dashboard
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Welcome;


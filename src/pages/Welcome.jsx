import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { 
  Building, 
  Users, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  ArrowRight,
  Activity
} from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    // Store mock head coach data for demo
    localStorage.setItem('bgr_headcoach_auth', JSON.stringify({
      email: 'headcoach@example.com',
      role: 'headcoach',
      name: 'Head Coach'
    }));
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Building,
      title: 'Multi-Site Management',
      description: 'Manage all program sites from one central dashboard'
    },
    {
      icon: BookOpen,
      title: 'Weekly Curriculum',
      description: 'Create and distribute workout plans across all sites'
    },
    {
      icon: Users,
      title: 'Coach & Parent Communication',
      description: 'Send messages to coaches and parents individually or in bulk'
    },
    {
      icon: TrendingUp,
      title: 'Site Funnel',
      description: 'Track prospects and manage your pipeline for new sites'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Activity className="w-12 h-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Boys Gotta Run</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hi Head Coach/Owner
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Take a look inside and see how you'll manage the program across all sites. 
            This is your command center for the entire Boys Gotta Run program.
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

        {/* Features Overview */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            What You Can Manage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader>
            <CardTitle className="text-center">Program Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-900 mb-1">5</div>
                <div className="text-sm text-orange-700">Active Sites</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-900 mb-1">12</div>
                <div className="text-sm text-orange-700">Coaches</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-900 mb-1">145</div>
                <div className="text-sm text-orange-700">Registered Athletes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;


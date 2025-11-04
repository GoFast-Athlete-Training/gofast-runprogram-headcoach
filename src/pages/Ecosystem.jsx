import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Network, ArrowLeft, Users, Building, GraduationCap, Link2 } from 'lucide-react';

const Ecosystem = ({ onLogout }) => {
  const navigate = useNavigate();

  const ecosystemData = {
    totalConnections: 47,
    activePartnerships: 12,
    potentialConnections: 23,
    byCategory: {
      'Educational Leaders': 15,
      'PTAs': 8,
      'Coaches & Runners': 12,
      'Connectors': 12
    }
  };

  const insights = [
    {
      title: 'Build Beyond Principals',
      description: 'Your network includes PTAs, coaches, and community connectors who can open doors to new schools.',
      icon: Network,
      color: 'blue'
    },
    {
      title: 'Leverage Relationships',
      description: 'Active partners in your network can provide warm introductions to schools in their districts.',
      icon: Link2,
      color: 'green'
    },
    {
      title: 'Think Ecosystem',
      description: 'Every connection is a potential pathway. A PTA member might know a principal, a coach might know a district admin.',
      icon: Users,
      color: 'purple'
    }
  ];

  const categories = [
    { name: 'Educational Leaders', icon: GraduationCap, count: 15, color: 'blue' },
    { name: 'PTAs', icon: Users, count: 8, color: 'purple' },
    { name: 'Coaches & Runners', icon: Building, count: 12, color: 'green' },
    { name: 'Connectors', icon: Network, count: 12, color: 'orange' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/crm')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to CRM
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Ecosystem</h1>
            <p className="text-gray-600">
              It's not just about hitting up principals. Build relationships across your entire network.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-blue-700">Total Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-900">{ecosystemData.totalConnections}</div>
                <p className="text-sm text-blue-700 mt-2">People in your network</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-green-700">Active Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-900">{ecosystemData.activePartnerships}</div>
                <p className="text-sm text-green-700 mt-2">Current collaborations</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-orange-700">Potential Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-900">{ecosystemData.potentialConnections}</div>
                <p className="text-sm text-orange-700 mt-2">Opportunities to explore</p>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-12 h-12 bg-${insight.color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${insight.color}-600`} />
                        </div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <CardDescription>{insight.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Ecosystem Breakdown */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Network by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${category.color}-600`} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{category.count}</div>
                      </div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/crm')}
                      >
                        View in CRM
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Ecosystem;


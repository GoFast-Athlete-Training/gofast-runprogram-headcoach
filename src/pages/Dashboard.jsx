import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { 
  Building, 
  Users, 
  MessageSquare, 
  BookOpen,
  Activity,
  ArrowRight,
  UserPlus,
  BarChart3
} from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // Mock stats
  const stats = {
    totalSites: 5,
    totalCoaches: 12,
    totalAthletes: 145,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Sheila" />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi Sheila, what do you want to do today?</h1>
            <p className="text-gray-600">Your command center for managing the Boys Gotta Run program</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center mb-2">
                <Building className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalSites}</p>
                  <p className="text-sm text-blue-700">Total Sites</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-purple-900">{stats.totalCoaches}</p>
                  <p className="text-sm text-purple-700">Total Coaches</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center mb-2">
                <Activity className="h-6 w-6 text-orange-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-orange-900">{stats.totalAthletes}</p>
                  <p className="text-sm text-orange-700">Total Athletes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-purple-400 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              onClick={() => navigate('/recruit')}
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Recruit</CardTitle>
                    <CardDescription>New sites, participants & coaches</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Goals & pipeline</span>
                  <ArrowRight className="w-5 h-5 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-400 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              onClick={() => navigate('/curriculum')}
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">Manage</CardTitle>
                    <CardDescription>Curriculum, communication & daily operations</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Week plans & messages</span>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-green-400 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              onClick={() => navigate('/performance')}
            >
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">View Performance</CardTitle>
                    <CardDescription>See how your program is performing</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Analytics & reports</span>
                  <ArrowRight className="w-5 h-5 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { ExternalLink, User, Users, ShoppingCart, Activity } from 'lucide-react';
import { getAllPortals } from '../config/portals.js';

const RunProgramExperience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/logo.avif" alt="Boys Gotta Run" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Run Program Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore all portals for the Boys Gotta Run program
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getAllPortals().map((portal) => {
            const getIcon = () => {
              switch(portal.icon) {
                case 'owner': return <Activity className="w-6 h-6" />;
                case 'coach': return <User className="w-6 h-6" />;
                case 'parent': return <Users className="w-6 h-6" />;
                case 'checkout': return <ShoppingCart className="w-6 h-6" />;
                default: return <ExternalLink className="w-6 h-6" />;
              }
            };

            const isActive = portal.url && portal.url.length > 0;
            
            return (
              <Card 
                key={portal.label}
                className={`transition-all hover:shadow-xl ${isActive ? 'cursor-pointer hover:border-orange-500 hover:scale-105' : 'opacity-60'}`}
                onClick={() => {
                  if (isActive) {
                    window.open(portal.url, '_blank');
                  }
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-orange-500">
                      {getIcon()}
                    </div>
                    {portal.meta && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                        Main
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl mb-2">{portal.label}</CardTitle>
                  <CardDescription className="text-sm">{portal.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isActive ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(portal.url, '_blank');
                      }}
                    >
                      Visit Portal
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <div className="text-sm text-gray-400 text-center py-2">
                      Coming Soon
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RunProgramExperience;


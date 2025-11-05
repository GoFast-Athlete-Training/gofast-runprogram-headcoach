import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { ExternalLink, User, Users, ShoppingCart, Activity } from 'lucide-react';
import { portalUrls } from '../config/portals.js';

const RunProgramExperience = () => {
  // Three main platforms
  const platforms = [
    portalUrls.owner,
    portalUrls.coach,
    portalUrls.parent
  ];

  // Checkout as add-on feature
  const checkoutFeature = portalUrls.checkout;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/logo.avif" alt="Boys Gotta Run" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hi Sheila!
          </h1>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              Click the links below to see how you can streamline your workflows and offer a better experience to parents. We've created three different platforms, one for you, one for coaches, and one for parents.
            </p>
            <p>
              The platforms will be synched so that you can make updates that your coaches will see and likewise your coaches can make updates the parents will see.
            </p>
            <p>
              Below that you'll see a specialized add on to your website that will streamline the checkout process to enhance pricing differences and directly give coaches rosters on payment/registrations success.
            </p>
          </div>
        </div>

        {/* Three Platforms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Management & Performance Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const getIcon = () => {
                switch(platform.icon) {
                  case 'owner': return <Activity className="w-6 h-6" />;
                  case 'coach': return <User className="w-6 h-6" />;
                  case 'parent': return <Users className="w-6 h-6" />;
                  default: return <ExternalLink className="w-6 h-6" />;
                }
              };

              const isActive = platform.url && platform.url.length > 0;
              
              return (
                <Card 
                  key={platform.label}
                  className={`transition-all hover:shadow-xl ${isActive ? 'cursor-pointer hover:border-orange-500 hover:scale-105' : 'opacity-60'}`}
                  onClick={() => {
                    if (isActive) {
                      window.open(platform.url, '_blank');
                    }
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-orange-500">
                        {getIcon()}
                      </div>
                      {platform.meta && (
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                          Your Portal
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{platform.label}</CardTitle>
                    <CardDescription className="text-sm">{platform.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isActive ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(platform.url, '_blank');
                        }}
                      >
                        Visit Platform
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

        {/* Checkout Add-On Section - Separate Section */}
        <div className="mt-16 pt-12 border-t-2 border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialized Website Add-On</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline the checkout process to enhance pricing differences and directly give coaches rosters on payment/registrations success.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <Card 
              className={`transition-all hover:shadow-xl border-2 ${checkoutFeature.url ? 'cursor-pointer hover:border-blue-400 hover:scale-105 border-blue-200 bg-blue-50' : 'opacity-60'}`}
              onClick={() => {
                if (checkoutFeature.url) {
                  window.open(checkoutFeature.url, '_blank');
                }
              }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Website Add-On
                  </span>
                </div>
                <CardTitle className="text-2xl mb-2">{checkoutFeature.label}</CardTitle>
                <CardDescription className="text-base">{checkoutFeature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {checkoutFeature.url ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(checkoutFeature.url, '_blank');
                    }}
                  >
                    View Checkout Flow
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <div className="text-sm text-gray-400 text-center py-2">
                    Coming Soon
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunProgramExperience;


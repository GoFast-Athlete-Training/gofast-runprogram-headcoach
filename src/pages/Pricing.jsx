import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { DollarSign, Save, Edit } from 'lucide-react';

const Pricing = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [pricing, setPricing] = useState({
    monthlyPerAthlete: 150,
    semesterPerAthlete: 600,
    annualPerAthlete: 1100,
    familyDiscount: 10, // percentage
    earlyBirdDiscount: 50, // dollar amount
    multiChildDiscount: 15, // percentage
  });

  const handleSave = () => {
    console.log('Saving pricing...', pricing);
    alert('Pricing updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pricing Management</h1>
              <p className="text-gray-600">Manage program pricing and packages</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Pricing
              </Button>
            ) : (
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Base Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Base Pricing</CardTitle>
                <CardDescription>Standard pricing packages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Monthly (per athlete)</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={pricing.monthlyPerAthlete}
                        onChange={(e) => setPricing({ ...pricing, monthlyPerAthlete: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">${pricing.monthlyPerAthlete}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Semester (per athlete)</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={pricing.semesterPerAthlete}
                        onChange={(e) => setPricing({ ...pricing, semesterPerAthlete: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">${pricing.semesterPerAthlete}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Annual (per athlete)</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={pricing.annualPerAthlete}
                        onChange={(e) => setPricing({ ...pricing, annualPerAthlete: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">${pricing.annualPerAthlete}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Discounts */}
            <Card>
              <CardHeader>
                <CardTitle>Discounts & Promotions</CardTitle>
                <CardDescription>Manage special pricing offers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Family Discount</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={pricing.familyDiscount}
                        onChange={(e) => setPricing({ ...pricing, familyDiscount: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{pricing.familyDiscount}% off</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Applied when multiple children from same family enroll</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Early Bird Discount</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">$</span>
                      <Input
                        type="number"
                        value={pricing.earlyBirdDiscount}
                        onChange={(e) => setPricing({ ...pricing, earlyBirdDiscount: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">${pricing.earlyBirdDiscount} off</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Applied for registrations before program start date</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Multi-Child Discount</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={pricing.multiChildDiscount}
                        onChange={(e) => setPricing({ ...pricing, multiChildDiscount: parseFloat(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-gray-500">%</span>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{pricing.multiChildDiscount}% off</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Additional discount for families with 3+ children</p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Summary */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle>Current Pricing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="font-semibold">${pricing.monthlyPerAthlete}/athlete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Semester:</span>
                    <span className="font-semibold">${pricing.semesterPerAthlete}/athlete</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual:</span>
                    <span className="font-semibold">${pricing.annualPerAthlete}/athlete</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family Discount:</span>
                      <span className="font-semibold">{pricing.familyDiscount}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Early Bird:</span>
                      <span className="font-semibold">${pricing.earlyBirdDiscount} off</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricing;


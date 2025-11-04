import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { TrendingUp, Building, Plus, Search, CheckCircle, Clock, XCircle } from 'lucide-react';

const Funnel = ({ onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSite, setNewSite] = useState({ name: '', contact: '', email: '', phone: '', stage: 'Interested' });

  // Mock sites data
  const [sites, setSites] = useState([
    { id: '1', name: 'Lincoln Elementary', contact: 'Principal Johnson', email: 'johnson@lincoln.edu', phone: '(555) 111-2222', stage: 'Interested', date: '2025-01-10', notes: 'Interested in starting program for 4th-6th graders' },
    { id: '2', name: 'Riverside Middle School', contact: 'Dr. Martinez', email: 'martinez@riverside.edu', phone: '(555) 222-3333', stage: 'In Discussion', date: '2025-01-08', notes: 'Budget approved, waiting on board approval' },
    { id: '3', name: 'Sunset Elementary', contact: 'Ms. Anderson', email: 'anderson@sunset.edu', phone: '(555) 333-4444', stage: 'Planning', date: '2025-01-12', notes: 'Coordinating schedule and start date' },
    { id: '4', name: 'Oak Park School', contact: 'Mr. Thompson', email: 'thompson@oakpark.edu', phone: '(555) 444-5555', stage: 'Setting Up', date: '2025-01-14', notes: 'Discussing pricing and start date' },
    { id: '5', name: 'Green Valley Elementary', contact: 'Principal Lee', email: 'lee@greenvalley.edu', phone: '(555) 555-6666', stage: 'Active', date: '2025-01-15', notes: 'Program started, starting Week 8' },
  ]);

  const stages = ['Interested', 'In Discussion', 'Planning', 'Setting Up', 'Active', 'Not Interested'];

  const getStageColor = (stage) => {
    const colors = {
      'Interested': 'bg-gray-100 text-gray-800',
      'In Discussion': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-purple-100 text-purple-800',
      'Setting Up': 'bg-orange-100 text-orange-800',
      'Active': 'bg-green-100 text-green-800',
      'Not Interested': 'bg-red-100 text-red-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getStageIcon = (stage) => {
    if (stage === 'Active') return <CheckCircle className="w-4 h-4" />;
    if (stage === 'Not Interested') return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSite = () => {
    if (newSite.name && newSite.contact) {
      setSites([...sites, { ...newSite, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }]);
      setNewSite({ name: '', contact: '', email: '', phone: '', stage: 'Interested' });
      setShowAddModal(false);
    }
  };

  const handleStageChange = (id, newStage) => {
    setSites(sites.map(s => s.id === id ? { ...s, stage: newStage } : s));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">New Sites</h1>
              <p className="text-gray-600">Track schools interested in starting the program</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add New School
            </Button>
          </div>

          {/* Site Status Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            {stages.map((stage) => {
              const count = sites.filter(s => s.stage === stage).length;
              return (
                <Card key={stage}>
                  <CardHeader>
                    <CardTitle className="text-lg">{count}</CardTitle>
                    <CardDescription>{stage}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search prospects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Sites List */}
          <div className="space-y-4">
            {filteredSites.map((site) => (
              <Card key={site.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{site.name}</CardTitle>
                      <CardDescription>{site.contact} • {site.email} • {site.phone}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={site.stage}
                        onChange={(e) => handleStageChange(site.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(site.stage)} border-0`}
                      >
                        {stages.map(stage => (
                          <option key={stage} value={stage}>{stage}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notes</p>
                      <p className="text-sm">{site.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Added: {site.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Add New School</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">School Name</label>
                    <Input
                      value={newSite.name}
                      onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                      placeholder="e.g., Lincoln Elementary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Name</label>
                    <Input
                      value={newSite.contact}
                      onChange={(e) => setNewSite({ ...newSite, contact: e.target.value })}
                      placeholder="e.g., Principal Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={newSite.email}
                      onChange={(e) => setNewSite({ ...newSite, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={newSite.phone}
                      onChange={(e) => setNewSite({ ...newSite, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddSite} className="flex-1">Add School</Button>
                    <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Funnel;


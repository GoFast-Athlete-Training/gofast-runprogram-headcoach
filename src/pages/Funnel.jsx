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
  const [newProspect, setNewProspect] = useState({ name: '', contact: '', email: '', phone: '', stage: 'Lead' });

  // Mock funnel data
  const [prospects, setProspects] = useState([
    { id: '1', name: 'Lincoln Elementary', contact: 'Principal Johnson', email: 'johnson@lincoln.edu', phone: '(555) 111-2222', stage: 'Lead', date: '2025-01-10', notes: 'Interested in starting program for 4th-6th graders' },
    { id: '2', name: 'Riverside Middle School', contact: 'Dr. Martinez', email: 'martinez@riverside.edu', phone: '(555) 222-3333', stage: 'Qualified', date: '2025-01-08', notes: 'Budget approved, waiting on board approval' },
    { id: '3', name: 'Sunset Elementary', contact: 'Ms. Anderson', email: 'anderson@sunset.edu', phone: '(555) 333-4444', stage: 'Proposal', date: '2025-01-12', notes: 'Proposal sent, following up next week' },
    { id: '4', name: 'Oak Park School', contact: 'Mr. Thompson', email: 'thompson@oakpark.edu', phone: '(555) 444-5555', stage: 'Negotiation', date: '2025-01-14', notes: 'Discussing pricing and start date' },
    { id: '5', name: 'Green Valley Elementary', contact: 'Principal Lee', email: 'lee@greenvalley.edu', phone: '(555) 555-6666', stage: 'Closed Won', date: '2025-01-15', notes: 'Signed contract, starting Week 8' },
  ]);

  const stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  const getStageColor = (stage) => {
    const colors = {
      'Lead': 'bg-gray-100 text-gray-800',
      'Qualified': 'bg-blue-100 text-blue-800',
      'Proposal': 'bg-purple-100 text-purple-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const getStageIcon = (stage) => {
    if (stage === 'Closed Won') return <CheckCircle className="w-4 h-4" />;
    if (stage === 'Closed Lost') return <XCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const filteredProspects = prospects.filter(prospect =>
    prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProspect = () => {
    if (newProspect.name && newProspect.contact) {
      setProspects([...prospects, { ...newProspect, id: Date.now().toString(), date: new Date().toISOString().split('T')[0] }]);
      setNewProspect({ name: '', contact: '', email: '', phone: '', stage: 'Lead' });
      setShowAddModal(false);
    }
  };

  const handleStageChange = (id, newStage) => {
    setProspects(prospects.map(p => p.id === id ? { ...p, stage: newStage } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Site Funnel</h1>
              <p className="text-gray-600">Track prospects for new program sites</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Prospect
            </Button>
          </div>

          {/* Funnel Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {stages.map((stage) => {
              const count = prospects.filter(p => p.stage === stage).length;
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

          {/* Prospects List */}
          <div className="space-y-4">
            {filteredProspects.map((prospect) => (
              <Card key={prospect.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{prospect.name}</CardTitle>
                      <CardDescription>{prospect.contact} • {prospect.email} • {prospect.phone}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={prospect.stage}
                        onChange={(e) => handleStageChange(prospect.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(prospect.stage)} border-0`}
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
                      <p className="text-sm">{prospect.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Added: {prospect.date}</p>
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
                  <CardTitle>Add New Prospect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Site Name</label>
                    <Input
                      value={newProspect.name}
                      onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
                      placeholder="e.g., Lincoln Elementary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Name</label>
                    <Input
                      value={newProspect.contact}
                      onChange={(e) => setNewProspect({ ...newProspect, contact: e.target.value })}
                      placeholder="e.g., Principal Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={newProspect.email}
                      onChange={(e) => setNewProspect({ ...newProspect, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={newProspect.phone}
                      onChange={(e) => setNewProspect({ ...newProspect, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddProspect} className="flex-1">Add Prospect</Button>
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


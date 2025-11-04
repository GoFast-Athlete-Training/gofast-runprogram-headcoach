import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Plus, Search, Building, Users, GraduationCap, Network } from 'lucide-react';

const CRM = ({ onLogout }) => {
  const navigate = useNavigate();
  const [activePipeline, setActivePipeline] = useState('educational-leaders');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ 
    name: '', 
    organization: '', 
    email: '', 
    phone: '', 
    pipeline: activePipeline,
    stage: 'Initial Contact' 
  });

  const pipelines = {
    'educational-leaders': {
      label: 'Educational Leaders',
      icon: GraduationCap,
      color: 'blue',
      description: 'Principals, superintendents, district administrators'
    },
    'ptas': {
      label: 'PTAs',
      icon: Users,
      color: 'purple',
      description: 'Parent Teacher Associations and parent groups'
    },
    'coaches-runners': {
      label: 'Coaches & Runners',
      icon: Building,
      color: 'green',
      description: 'Other coaches and runners in the DMV area'
    },
    'connectors': {
      label: 'All Other Connectors',
      icon: Network,
      color: 'orange',
      description: 'Community leaders, influencers, and connectors'
    }
  };

  const stages = ['Initial Contact', 'Building Relationship', 'Exploring Opportunity', 'Moving Forward', 'Active Partner', 'Not Interested'];

  // Mock data for each pipeline
  const [contacts, setContacts] = useState({
    'educational-leaders': [
      { id: '1', name: 'Principal Johnson', organization: 'Lincoln Elementary', email: 'johnson@lincoln.edu', phone: '(555) 111-2222', stage: 'Building Relationship', date: '2025-01-10', notes: 'Met at district meeting, interested in after-school program' },
      { id: '2', name: 'Dr. Martinez', organization: 'Riverside Middle School', email: 'martinez@riverside.edu', phone: '(555) 222-3333', stage: 'Exploring Opportunity', date: '2025-01-08', notes: 'Budget approved, discussing program details' },
      { id: '3', name: 'Ms. Anderson', organization: 'Sunset Elementary', email: 'anderson@sunset.edu', phone: '(555) 333-4444', stage: 'Moving Forward', date: '2025-01-12', notes: 'Coordinating schedule and start date' },
    ],
    'ptas': [
      { id: '4', name: 'Sarah Williams', organization: 'Discovery PTA', email: 'sarah@discoverypta.org', phone: '(555) 444-5555', stage: 'Building Relationship', date: '2025-01-15', notes: 'PTA president interested in fundraising for program' },
      { id: '5', name: 'Michael Chen', organization: 'Riverside PTA', email: 'michael@riversidepta.org', phone: '(555) 555-6666', stage: 'Initial Contact', date: '2025-01-14', notes: 'Reached out about program partnership' },
    ],
    'coaches-runners': [
      { id: '6', name: 'Coach Mike', organization: 'DMV Track Club', email: 'mike@dmvtrack.org', phone: '(555) 666-7777', stage: 'Active Partner', date: '2025-01-10', notes: 'Collaborating on cross-training programs' },
      { id: '7', name: 'Jessica Runner', organization: 'Local Running Community', email: 'jessica@runlocal.org', phone: '(555) 777-8888', stage: 'Building Relationship', date: '2025-01-12', notes: 'Interested in sharing resources and referrals' },
    ],
    'connectors': [
      { id: '8', name: 'David Community', organization: 'Youth Sports Network', email: 'david@ysn.org', phone: '(555) 888-9999', stage: 'Exploring Opportunity', date: '2025-01-11', notes: 'Community leader who connects programs with schools' },
    ]
  });

  const currentContacts = contacts[activePipeline] || [];
  const filteredContacts = currentContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStageColor = (stage) => {
    const colors = {
      'Initial Contact': 'bg-gray-100 text-gray-800',
      'Building Relationship': 'bg-blue-100 text-blue-800',
      'Exploring Opportunity': 'bg-purple-100 text-purple-800',
      'Moving Forward': 'bg-orange-100 text-orange-800',
      'Active Partner': 'bg-green-100 text-green-800',
      'Not Interested': 'bg-red-100 text-red-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.organization) {
      const updatedContacts = {
        ...contacts,
        [activePipeline]: [...contacts[activePipeline], {
          ...newContact,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          pipeline: activePipeline
        }]
      };
      setContacts(updatedContacts);
      setNewContact({ 
        name: '', 
        organization: '', 
        email: '', 
        phone: '', 
        pipeline: activePipeline,
        stage: 'Initial Contact' 
      });
      setShowAddModal(false);
    }
  };

  const handleStageChange = (id, newStage) => {
    const updatedContacts = {
      ...contacts,
      [activePipeline]: contacts[activePipeline].map(c => 
        c.id === id ? { ...c, stage: newStage } : c
      )
    };
    setContacts(updatedContacts);
  };

  const pipelineStats = stages.map(stage => {
    const count = currentContacts.filter(c => c.stage === stage).length;
    return { stage, count };
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Development CRM</h1>
              <p className="text-gray-600">Build relationships across your ecosystem</p>
            </div>
            <Button onClick={() => navigate('/ecosystem')} variant="outline" className="mr-2">
              <Network className="w-4 h-4 mr-2" />
              View Ecosystem
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Pipeline Tabs */}
          <div className="mb-6 flex space-x-2 border-b">
            {Object.entries(pipelines).map(([key, pipeline]) => {
              const Icon = pipeline.icon;
              const isActive = activePipeline === key;
              const count = contacts[key]?.length || 0;
              
              const getBorderColor = () => {
                if (!isActive) return 'border-transparent';
                const colors = { blue: 'border-blue-500', purple: 'border-purple-500', green: 'border-green-500', orange: 'border-orange-500' };
                return colors[pipeline.color] || 'border-blue-500';
              };
              
              const getTextColor = () => {
                if (!isActive) return 'text-gray-600 hover:text-gray-900';
                const colors = { blue: 'text-blue-600', purple: 'text-purple-600', green: 'text-green-600', orange: 'text-orange-600' };
                return colors[pipeline.color] || 'text-blue-600';
              };
              
              const getBadgeColor = () => {
                if (!isActive) return 'bg-gray-100 text-gray-600';
                const colors = { blue: 'bg-blue-100 text-blue-700', purple: 'bg-purple-100 text-purple-700', green: 'bg-green-100 text-green-700', orange: 'bg-orange-100 text-orange-700' };
                return colors[pipeline.color] || 'bg-blue-100 text-blue-700';
              };
              
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActivePipeline(key);
                    setNewContact({ ...newContact, pipeline: key });
                  }}
                  className={`px-6 py-3 flex items-center space-x-2 border-b-2 transition-colors ${getBorderColor()} ${getTextColor()} ${isActive ? 'font-semibold' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{pipeline.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getBadgeColor()}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Pipeline Description */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                {(() => {
                  const Icon = pipelines[activePipeline].icon;
                  const colorClasses = { blue: 'text-blue-600', purple: 'text-purple-600', green: 'text-green-600', orange: 'text-orange-600' };
                  return <Icon className={`w-5 h-5 ${colorClasses[pipelines[activePipeline].color] || 'text-blue-600'}`} />;
                })()}
                <p className="text-gray-600">{pipelines[activePipeline].description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Pipeline Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            {pipelineStats.map(({ stage, count }) => (
              <Card key={stage}>
                <CardHeader>
                  <CardTitle className="text-lg">{count}</CardTitle>
                  <CardDescription className="text-xs">{stage}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <CardDescription>
                        {contact.organization} • {contact.email} • {contact.phone}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={contact.stage}
                        onChange={(e) => handleStageChange(contact.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(contact.stage)} border-0`}
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
                      <p className="text-sm">{contact.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Added: {contact.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Contact Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Add New Contact</CardTitle>
                  <CardDescription>{pipelines[activePipeline].label}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Name</label>
                    <Input
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="e.g., Principal Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization</label>
                    <Input
                      value={newContact.organization}
                      onChange={(e) => setNewContact({ ...newContact, organization: e.target.value })}
                      placeholder="e.g., Lincoln Elementary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddContact} className="flex-1">Add Contact</Button>
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

export default CRM;


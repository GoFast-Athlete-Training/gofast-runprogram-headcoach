import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { MessageSquare, Users, Mail, Search, Send, ArrowLeft, User, Building } from 'lucide-react';

const Communicate = ({ onLogout }) => {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Mock contacts - would hydrate from API
  const [contacts] = useState({
    parents: [
      { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 123-4567', site: 'Discovery', athletes: ['Alex Johnson'], type: 'parent' },
      { id: '2', name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 234-5678', site: 'Hydrate', athletes: ['Emma Chen'], type: 'parent' },
      { id: '3', name: 'Jessica Williams', email: 'jessica@example.com', phone: '(555) 345-6789', site: 'Discovery', athletes: ['Ryan Williams'], type: 'parent' },
      { id: '4', name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', site: 'North Site', athletes: ['Olivia Brown'], type: 'parent' },
      { id: '5', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 567-8901', site: 'Hydrate', athletes: ['Noah Davis'], type: 'parent' },
    ],
    coaches: [
      { id: 'c1', name: 'Coach Sarah', email: 'sarah.coach@example.com', phone: '(555) 111-2222', site: 'Discovery', athletes: 15, type: 'coach', status: 'Active' },
      { id: 'c2', name: 'Coach Mike', email: 'mike.coach@example.com', phone: '(555) 222-3333', site: 'Hydrate', athletes: 12, type: 'coach', status: 'Active' },
      { id: 'c3', name: 'Coach Emily', email: 'emily.coach@example.com', phone: '(555) 333-4444', site: 'Discovery', athletes: 18, type: 'coach', status: 'Active' },
      { id: 'c4', name: 'Coach James', email: 'james.coach@example.com', phone: '(555) 444-5555', site: 'North Site', athletes: 10, type: 'coach', status: 'Active' },
    ]
  });

  const audienceOptions = [
    { 
      id: 'parents', 
      label: 'Parents', 
      icon: Users, 
      description: 'Communicate with registered parents',
      count: contacts.parents.length,
      color: 'bg-purple-100 text-purple-600 border-purple-200'
    },
    { 
      id: 'coaches', 
      label: 'Coaches', 
      icon: MessageSquare, 
      description: 'Send messages to coaches',
      count: contacts.coaches.length,
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    { 
      id: 'all', 
      label: 'Everyone', 
      icon: Mail, 
      description: 'Broadcast to all contacts',
      count: contacts.parents.length + contacts.coaches.length,
      color: 'bg-orange-100 text-orange-600 border-orange-200'
    }
  ];

  const currentContacts = selectedAudience === 'all' 
    ? [...contacts.parents, ...contacts.coaches]
    : contacts[selectedAudience] || [];

  const filteredContacts = currentContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.site?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleContact = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const selectAll = () => {
    setSelectedContacts(filteredContacts.map(c => c.id));
  };

  const deselectAll = () => {
    setSelectedContacts([]);
  };

  const handleSend = () => {
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    if (selectedContacts.length === 0) {
      alert('Please select at least one contact');
      return;
    }
    
    console.log('Sending message to:', selectedContacts, 'Message:', message);
    alert(`Message sent to ${selectedContacts.length} contact(s)!`);
    setMessage('');
    setSelectedContacts([]);
  };

  if (!selectedAudience) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <Header userName="Admin" />
          <main className="flex-1 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Communicate</h1>
              <p className="text-gray-600">Who would you like to communicate with?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audienceOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card
                    key={option.id}
                    className={`cursor-pointer hover:shadow-lg transition-all border-2 ${option.color} hover:scale-105`}
                    onClick={() => setSelectedAudience(option.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 rounded-lg ${option.color.split(' ')[0]} flex items-center justify-center`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <span className="text-2xl font-bold">{option.count}</span>
                      </div>
                      <CardTitle className="text-xl">{option.label}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Admin" />
        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setSelectedAudience(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {audienceOptions.find(o => o.id === selectedAudience)?.label}
                </h1>
                <p className="text-gray-600">Select contacts and compose your message</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAll}>
                Clear
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contacts List */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search */}
              <Card>
                <CardContent className="pt-6">
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
                </CardContent>
              </Card>

              {/* Selected Count */}
              {selectedContacts.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-orange-900">
                    {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}

              {/* Contacts List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredContacts.map((contact) => {
                  const isSelected = selectedContacts.includes(contact.id);
                  return (
                    <Card
                      key={contact.id}
                      className={`cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-2 border-orange-500 bg-orange-50' 
                          : 'hover:border-orange-200 hover:shadow-md'
                      }`}
                      onClick={() => toggleContact(contact.id)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleContact(contact.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                              {contact.type === 'coach' && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  Coach
                                </span>
                              )}
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>{contact.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Building className="w-4 h-4" />
                                <span>{contact.site}</span>
                              </div>
                              {contact.type === 'parent' && contact.athletes && (
                                <div className="flex items-center space-x-2">
                                  <User className="w-4 h-4" />
                                  <span>{contact.athletes.join(', ')}</span>
                                </div>
                              )}
                              {contact.type === 'coach' && (
                                <div className="flex items-center space-x-2">
                                  <Users className="w-4 h-4" />
                                  <span>{contact.athletes} athletes</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Message Composer */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                  <CardDescription>
                    {selectedContacts.length > 0 
                      ? `${selectedContacts.length} recipient${selectedContacts.length !== 1 ? 's' : ''} selected`
                      : 'Select contacts to send message'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input placeholder="Message subject..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex min-h-[200px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm"
                      placeholder="Type your message here..."
                    />
                  </div>
                  <Button 
                    onClick={handleSend} 
                    className="w-full" 
                    disabled={selectedContacts.length === 0 || !message.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to {selectedContacts.length || 0} Contact{selectedContacts.length !== 1 ? 's' : ''}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Communicate;


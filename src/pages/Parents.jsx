import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Users, MessageSquare, Search, Send, Mail } from 'lucide-react';

const Parents = ({ onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);
  const [message, setMessage] = useState('');

  // Mock parents data
  const parents = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '(555) 123-4567', site: 'Discovery', athletes: ['Alex Johnson'], lastContact: '2025-01-10' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', phone: '(555) 234-5678', site: 'Hydrate', athletes: ['Emma Chen'], lastContact: '2025-01-08' },
    { id: '3', name: 'Jessica Williams', email: 'jessica@example.com', phone: '(555) 345-6789', site: 'Discovery', athletes: ['Ryan Williams'], lastContact: '2025-01-12' },
    { id: '4', name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', site: 'North Site', athletes: ['Olivia Brown'], lastContact: '2025-01-05' },
    { id: '5', name: 'Emily Davis', email: 'emily@example.com', phone: '(555) 567-8901', site: 'Hydrate', athletes: ['Noah Davis'], lastContact: '2025-01-11' },
  ];

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.site.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (selectedParent && message) {
      console.log('Sending message to', selectedParent.name, ':', message);
      alert(`Message sent to ${selectedParent.name}!`);
      setMessage('');
      setSelectedParent(null);
    }
  };

  const handleSendBulk = () => {
    if (message) {
      console.log('Sending bulk message to all parents:', message);
      alert('Bulk message sent to all parents!');
      setMessage('');
    }
  };

  if (selectedParent) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <Header userName="Head Coach" />
          <main className="flex-1 p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedParent(null)} className="mb-6">
              ← Back to Parents
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>{selectedParent.name}</CardTitle>
                <CardDescription>{selectedParent.email} • {selectedParent.phone}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Site</p>
                  <p className="font-medium">{selectedParent.site}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Athletes</p>
                  <p className="font-medium">{selectedParent.athletes.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Contact</p>
                  <p className="font-medium">{selectedParent.lastContact}</p>
                </div>
                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-2">Send Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm mb-4"
                    placeholder="Type your message..."
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Communicate - Parents</h1>
              <p className="text-gray-600">Manage communication with all registered parents</p>
            </div>
            <Button onClick={handleSendBulk}>
              <Mail className="w-4 h-4 mr-2" />
              Send Bulk Message
            </Button>
          </div>

          {/* Bulk Message */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Send Message to All Parents</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm mb-4"
                placeholder="Type your message to all parents..."
              />
              <Button onClick={handleSendBulk}>
                <Send className="w-4 h-4 mr-2" />
                Send to All Parents
              </Button>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search parents by name, email, or site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Parents List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredParents.map((parent) => (
              <Card
                key={parent.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedParent(parent)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{parent.name}</CardTitle>
                    <MessageSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <CardDescription>{parent.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Site:</span> <span className="font-medium">{parent.site}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Athletes:</span> <span className="font-medium">{parent.athletes.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Contact:</span> <span className="font-medium">{parent.lastContact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Parents;


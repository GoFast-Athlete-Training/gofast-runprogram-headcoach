import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { MessageSquare, Search, Send, Users, Plus } from 'lucide-react';

const Coaches = ({ onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [message, setMessage] = useState('');

  // Mock coaches data
  const coaches = [
    { id: '1', name: 'Coach Sarah', email: 'sarah@example.com', site: 'Discovery', athletes: 15, status: 'Active', lastActive: '2025-01-15' },
    { id: '2', name: 'Coach Mike', email: 'mike@example.com', site: 'Hydrate', athletes: 12, status: 'Active', lastActive: '2025-01-15' },
    { id: '3', name: 'Coach Emily', email: 'emily@example.com', site: 'Discovery', athletes: 18, status: 'Active', lastActive: '2025-01-14' },
    { id: '4', name: 'Coach James', email: 'james@example.com', site: 'North Site', athletes: 10, status: 'Active', lastActive: '2025-01-15' },
    { id: '5', name: 'Coach Lisa', email: 'lisa@example.com', site: 'South Site', athletes: 14, status: 'Active', lastActive: '2025-01-13' },
  ];

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.site.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (selectedCoach && message) {
      console.log('Sending message to', selectedCoach.name, ':', message);
      alert(`Message sent to ${selectedCoach.name}!`);
      setMessage('');
      setSelectedCoach(null);
    }
  };

  const handleSendBulk = () => {
    if (message) {
      console.log('Sending bulk message to all coaches:', message);
      alert('Bulk message sent to all coaches!');
      setMessage('');
    }
  };

  if (selectedCoach) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col">
          <Header userName="Head Coach" />
          <main className="flex-1 p-8 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => setSelectedCoach(null)} className="mb-6">
              ← Back to Coaches
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>{selectedCoach.name}</CardTitle>
                <CardDescription>{selectedCoach.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Site</p>
                  <p className="font-medium">{selectedCoach.site}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Athletes</p>
                  <p className="font-medium">{selectedCoach.athletes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="font-medium">{selectedCoach.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Active</p>
                  <p className="font-medium">{selectedCoach.lastActive}</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Communicate - Coaches</h1>
              <p className="text-gray-600">Manage communication with all coaches</p>
            </div>
            <Button onClick={() => alert('Add new coach functionality')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Coach
            </Button>
          </div>

          {/* Bulk Message */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Send Message to All Coaches</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm mb-4"
                placeholder="Type your message to all coaches..."
              />
              <Button onClick={handleSendBulk}>
                <Send className="w-4 h-4 mr-2" />
                Send to All Coaches
              </Button>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search coaches by name, email, or site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Coaches List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCoaches.map((coach) => (
              <Card
                key={coach.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCoach(coach)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <MessageSquare className="w-5 h-5 text-orange-500" />
                  </div>
                  <CardDescription>{coach.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Site:</span> <span className="font-medium">{coach.site}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Athletes:</span> <span className="font-medium">{coach.athletes}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span> <span className="font-medium text-green-600">{coach.status}</span>
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

export default Coaches;


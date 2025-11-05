import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { TrendingUp, Users, Building, ArrowRight } from 'lucide-react';

// Goal Progress Component
function GoalProgress({ label, current, target, timeHorizon, color }) {
  const progressPercent = target > 0 ? (current / target) * 100 : 0;
  const remaining = Math.max(0, target - current);
  
  const progressColor = progressPercent >= 75 ? 'from-green-500 to-green-600' : 
                         progressPercent >= 50 ? 'from-yellow-500 to-yellow-600' :
                         'from-orange-500 to-orange-600';
  
  const getColorClasses = () => {
    if (color === 'blue') return 'border-blue-200 bg-blue-50';
    if (color === 'purple') return 'border-purple-200 bg-purple-50';
    if (color === 'green') return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-gray-50';
  };

  return (
    <Card className={`border-2 ${getColorClasses()}`}>
      <CardHeader>
        <CardTitle className="text-xl mb-2">{label}</CardTitle>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-3xl font-bold text-gray-900">{current}</div>
            <div className="text-sm text-gray-600">Current</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">{target}</div>
            <div className="text-sm text-gray-600">Target</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{progressPercent.toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className={`bg-gradient-to-r ${progressColor} h-4 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {remaining > 0 ? `${remaining} remaining • ` : ''}Target: {target} in {timeHorizon} months
        </div>
      </CardContent>
    </Card>
  );
}

// Stack Card Component (Attract/Engage/Nurture)
function StackCard({ name, metrics, insight, icon, color, route }) {
  const navigate = useNavigate();
  
  const hoverColors = {
    'bg-blue-500': 'hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg',
    'bg-orange-500': 'hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg',
    'bg-purple-500': 'hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg',
  };
  
  return (
    <Card 
      className={`cursor-pointer border-2 border-gray-200 ${hoverColors[color]} transition-all duration-300 group`}
      onClick={() => route && navigate(route)}
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Metrics */}
        <div className="mb-4 space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm font-medium">{metric.label}</span>
              <span className="font-bold text-gray-900 text-base">{metric.value}</span>
            </div>
          ))}
        </div>
        
        {/* Insight Quote */}
        <div className="text-sm text-gray-600 italic border-t border-gray-200 pt-4 bg-gray-50 -mx-6 px-6 pb-6 rounded-b-xl mt-4">
          "{insight}"
        </div>
      </CardContent>
    </Card>
  );
}

const Recruit = ({ onLogout }) => {
  const navigate = useNavigate();

  // Goal data
  const goals = {
    sites: {
      current: 5,
      target: 10,
      timeHorizon: 12,
      color: 'blue'
    },
    participants: {
      current: 145,
      target: 300,
      timeHorizon: 12,
      color: 'purple'
    },
    coaches: {
      current: 12,
      target: 20,
      timeHorizon: 12,
      color: 'green'
    }
  };

  // BD Framework Cards (Attract, Engage, Nurture)
  const stackCards = [
    {
      name: "Attract",
      metrics: [
        { label: "Upcoming Events", value: "5" },
        { label: "Content Posts", value: "12" },
        { label: "Outreach Channels", value: "3" }
      ],
      insight: "Strong acquisition channels, ready to scale",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      route: null // TODO: Add attract page
    },
    {
      name: "Engage",
      metrics: [
        { label: "Contacts in CRM", value: "47" },
        { label: "Meetings This Month", value: "8" },
        { label: "Events Scheduled", value: "4" }
      ],
      insight: "Active relationship building, strong networking",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/crm"
    },
    {
      name: "Nurture",
      metrics: [
        { label: "Campaigns Active", value: "3" },
        { label: "Newsletters Sent", value: "12" },
        { label: "Response Rate", value: "18.5%" }
      ],
      insight: "Strong engagement, ready to scale",
      icon: <Building className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: null // TODO: Add nurture page
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruit Dashboard</h1>
              <p className="text-gray-600">Your command center for program growth</p>
            </div>
            <Button onClick={() => navigate('/crm')} className="bg-orange-500 hover:bg-orange-600">
              <Building className="w-4 h-4 mr-2" />
              View Pipeline
            </Button>
          </div>

          {/* Goal Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GoalProgress
              label="New Site Goal"
              current={goals.sites.current}
              target={goals.sites.target}
              timeHorizon={goals.sites.timeHorizon}
              color={goals.sites.color}
            />
            <GoalProgress
              label="New Participants Goal"
              current={goals.participants.current}
              target={goals.participants.target}
              timeHorizon={goals.participants.timeHorizon}
              color={goals.participants.color}
            />
            <GoalProgress
              label="New Coaches Goal"
              current={goals.coaches.current}
              target={goals.coaches.target}
              timeHorizon={goals.coaches.timeHorizon}
              color={goals.coaches.color}
            />
          </div>

          {/* Growth Drivers Banner */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Growth Drivers
            </h2>
            <p className="text-xs text-gray-400 text-center max-w-2xl">
              Attract (Events, Content, Outreach) • Engage (Connect, Meetings, Events) • Nurture (Campaigns, Email)
            </p>
          </div>

          {/* 3-Card BD Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stackCards.map((card, index) => (
              <StackCard key={index} {...card} />
            ))}
          </div>

          {/* Quick Actions */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/crm')}
                variant="outline"
                className="p-5 h-auto bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 text-left"
              >
                <div className="text-blue-600 font-semibold mb-1 text-base">View CRM</div>
                <div className="text-sm text-gray-600">Manage your pipeline</div>
              </Button>
              <Button
                onClick={() => navigate('/coaches')}
                variant="outline"
                className="p-5 h-auto bg-purple-50 border-2 border-purple-200 hover:bg-purple-100 hover:border-purple-300 text-left"
              >
                <div className="text-purple-600 font-semibold mb-1 text-base">Add Coach</div>
                <div className="text-sm text-gray-600">Onboard new coaches</div>
              </Button>
              <Button
                onClick={() => navigate('/ecosystem')}
                variant="outline"
                className="p-5 h-auto bg-green-50 border-2 border-green-200 hover:bg-green-100 hover:border-green-300 text-left"
              >
                <div className="text-green-600 font-semibold mb-1 text-base">View Ecosystem</div>
                <div className="text-sm text-gray-600">See your network</div>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Recruit;


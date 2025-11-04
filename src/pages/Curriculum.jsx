import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { BookOpen, Save, Eye } from 'lucide-react';

const Curriculum = ({ onLogout }) => {
  const navigate = useNavigate();
  const [week, setWeek] = useState('7');
  const [weekFocus, setWeekFocus] = useState('Dependability & Loyalty');
  const [goal, setGoal] = useState('2 ¾ miles');
  const [description, setDescription] = useState('Instructor – Lesson is to be there when you say you will be & do the things you promised.');
  
  const [workout, setWorkout] = useState([
    { name: '3 lap warm up', exercises: [] },
    { name: 'Body weight conditioning', description: '2 sets of 10 each', exercises: ['Squats', 'Jumping jacks', 'Alternating reverse lunges', 'Single leg squats', 'Pushups', 'Sit ups'] },
    { name: 'Run 8 laps at Tempo', exercises: [] }
  ]);

  const [discussion, setDiscussion] = useState({
    topic: 'Discuss Loyalty & Dependability',
    example: 'Parents are dependable because they pick you up after school when they say they will and you can depend on parents to feed you and fix things.',
    story: "My best friend asked me to help him practice for the school spelling bee. I promised I'd help him every day after school. Even when I really wanted to go home and play video games, I still showed up to help him practice. That's called being dependable; keeping your promises and showing others they can count on you. And loyalty means standing by your friends and supporting them, even when it's not always easy or fun. My friend didn't win first place, but he said he felt like a winner because I was there for him.",
    dependability: 'keeping your word and being reliable',
    loyalty: 'being a good friend and sticking with someone through thick and thin'
  });

  const [instructorNotes, setInstructorNotes] = useState([
    'Map out the 5K run course which should be 600-800m laps for optimal spectator viewing.',
    "Speak with Extended Day manager to coordinate the Extended day students' spectating and supporting the runners of the final 5K.",
    'Encourage Extended Day to make signs and bring noise makers to the 5K finish line.'
  ]);

  const [homeAssignment, setHomeAssignment] = useState('Running assignment of 10 minutes 1 X this week and stretch for 2 minutes each day.');

  const handleSave = () => {
    // Save to backend
    console.log('Saving curriculum...', { week, weekFocus, goal, description, workout, discussion, instructorNotes, homeAssignment });
    alert('Curriculum saved and published to all coaches!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col">
        <Header userName="Head Coach" />
        <main className="flex-1 p-8 max-w-5xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Weekly Curriculum</h1>
              <p className="text-gray-600">Create and publish workout plans for all sites</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save & Publish
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Week Info */}
            <Card>
              <CardHeader>
                <CardTitle>Week Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Week Number</label>
                  <Input value={week} onChange={(e) => setWeek(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Character Focus</label>
                  <Input value={weekFocus} onChange={(e) => setWeekFocus(e.target.value)} placeholder="e.g., Dependability & Loyalty" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Goal</label>
                  <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., 2 ¾ miles" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm"
                    placeholder="Lesson description..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Workout Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Workout Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {workout.map((item, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Input
                        value={item.name}
                        onChange={(e) => {
                          const newWorkout = [...workout];
                          newWorkout[index].name = e.target.value;
                          setWorkout(newWorkout);
                        }}
                        className="flex-1"
                      />
                    </div>
                    {item.description && (
                      <Input
                        value={item.description}
                        onChange={(e) => {
                          const newWorkout = [...workout];
                          newWorkout[index].description = e.target.value;
                          setWorkout(newWorkout);
                        }}
                        placeholder="Description (e.g., 2 sets of 10 each)"
                        className="mt-2"
                      />
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => setWorkout([...workout, { name: '', exercises: [] }])}>
                  Add Exercise
                </Button>
              </CardContent>
            </Card>

            {/* Discussion */}
            <Card>
              <CardHeader>
                <CardTitle>Discussion Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Topic</label>
                  <Input value={discussion.topic} onChange={(e) => setDiscussion({...discussion, topic: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Example</label>
                  <textarea
                    value={discussion.example}
                    onChange={(e) => setDiscussion({...discussion, example: e.target.value})}
                    className="flex min-h-[80px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Story</label>
                  <textarea
                    value={discussion.story}
                    onChange={(e) => setDiscussion({...discussion, story: e.target.value})}
                    className="flex min-h-[120px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dependability Definition</label>
                    <Input value={discussion.dependability} onChange={(e) => setDiscussion({...discussion, dependability: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Loyalty Definition</label>
                    <Input value={discussion.loyalty} onChange={(e) => setDiscussion({...discussion, loyalty: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coach Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Coach Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructorNotes.map((note, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={note}
                      onChange={(e) => {
                        const newNotes = [...instructorNotes];
                        newNotes[index] = e.target.value;
                        setInstructorNotes(newNotes);
                      }}
                    />
                    <Button variant="ghost" onClick={() => setInstructorNotes(instructorNotes.filter((_, i) => i !== index))}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => setInstructorNotes([...instructorNotes, ''])}>
                  Add Instruction
                </Button>
              </CardContent>
            </Card>

            {/* Home Assignment */}
            <Card>
              <CardHeader>
                <CardTitle>Home Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={homeAssignment}
                  onChange={(e) => setHomeAssignment(e.target.value)}
                  className="flex min-h-[80px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Curriculum;


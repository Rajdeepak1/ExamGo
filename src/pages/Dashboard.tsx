import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, Clock, MapPin, Star, CheckCircle, AlertCircle, User, Car } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Mock data for sessions and bookings
  const upcomingSessions = [
    {
      id: '1',
      mentorName: 'Priya Sharma',
      mentorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Travel Guidance',
      status: 'confirmed',
      examCenter: 'IIT Bombay'
    },
    {
      id: '2',
      mentorName: 'Rajesh Kumar',
      mentorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-02-20',
      time: '2:00 PM',
      type: 'Travel + Exam Mentoring',
      status: 'pending',
      examCenter: 'AIIMS Delhi'
    }
  ];

  const completedSessions = [
    {
      id: '3',
      mentorName: 'Anita Patel',
      mentorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      date: '2024-01-25',
      time: '11:00 AM',
      type: 'Travel Guidance',
      status: 'completed',
      rating: 5,
      examCenter: 'IISC Bangalore'
    }
  ];

  const travelChecklist = [
    { item: 'Book accommodation', completed: true },
    { item: 'Check route to exam center', completed: true },
    { item: 'Confirm cab booking', completed: false },
    { item: 'Pack required documents', completed: false },
    { item: 'Set multiple alarms', completed: false }
  ];

  useEffect(() => {
    gsap.fromTo(dashboardRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your exam preparation dashboard</p>
        </div>

        <div ref={dashboardRef} className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{upcomingSessions.length}</p>
                    <p className="text-gray-600 text-sm">Upcoming Sessions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{completedSessions.length}</p>
                    <p className="text-gray-600 text-sm">Completed Sessions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">4.8</p>
                    <p className="text-gray-600 text-sm">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Sessions</h2>
              
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={session.mentorAvatar} 
                            alt={session.mentorName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{session.mentorName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{session.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{session.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{session.examCenter}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(session.status)}`}>
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">{session.type}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming sessions</p>
                  <p className="text-gray-500 text-sm">Book a session with a mentor to get started</p>
                </div>
              )}
            </div>

            {/* Session History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Sessions</h2>
              
              {completedSessions.length > 0 ? (
                <div className="space-y-4">
                  {completedSessions.map(session => (
                    <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={session.mentorAvatar} 
                            alt={session.mentorName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{session.mentorName}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{session.date}</span>
                              <span>{session.type}</span>
                              <span>{session.examCenter}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < session.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-600">({session.rating}/5)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">No completed sessions yet</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Travel Checklist */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Travel Checklist</h3>
              <div className="space-y-3">
                {travelChecklist.map((item, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Find New Mentor</span>
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Car className="h-4 w-4" />
                  <span>Book Travel Session</span>
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>Rate Past Session</span>
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-gradient-to-b from-yellow-50 to-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Session Reminder</p>
                    <p className="text-xs text-gray-600">Your session with Priya is tomorrow at 10 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Travel Guide Ready</p>
                    <p className="text-xs text-gray-600">Your personalized travel guide has been shared</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MapPin, Star, Shield, Car, Filter, Search } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  avatar: string;
  city: string;
  specialization: string[];
  travelRating: number;
  examMentoringRating: number;
  totalReviews: number;
  experience: number;
  languages: string[];
  verified: boolean;
  price: number;
  availability: 'available' | 'busy' | 'offline';
}

const MentorDiscovery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    city: '',
    exam: '',
    priceRange: '',
    rating: '',
    availability: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Mumbai',
      specialization: ['JEE Main', 'JEE Advanced', 'Travel Guidance'],
      travelRating: 4.9,
      examMentoringRating: 4.7,
      totalReviews: 145,
      experience: 5,
      languages: ['Hindi', 'English', 'Marathi'],
      verified: true,
      price: 50,
      availability: 'available'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Delhi',
      specialization: ['NEET', 'Travel Guidance', 'Safety'],
      travelRating: 4.8,
      examMentoringRating: 4.5,
      totalReviews: 203,
      experience: 7,
      languages: ['Hindi', 'English'],
      verified: true,
      price: 60,
      availability: 'available'
    },
    {
      id: '3',
      name: 'Anita Patel',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Bangalore',
      specialization: ['CAT', 'GATE', 'Travel Guidance'],
      travelRating: 4.7,
      examMentoringRating: 4.8,
      totalReviews: 89,
      experience: 4,
      languages: ['English', 'Kannada', 'Tamil'],
      verified: true,
      price: 45,
      availability: 'busy'
    },
    {
      id: '4',
      name: 'Mohammed Ali',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
      city: 'Hyderabad',
      specialization: ['UPSC', 'Travel Guidance', 'Interview Prep'],
      travelRating: 4.9,
      examMentoringRating: 4.6,
      totalReviews: 167,
      experience: 8,
      languages: ['English', 'Hindi', 'Telugu'],
      verified: true,
      price: 70,
      availability: 'available'
    }
  ];

  useEffect(() => {
    gsap.fromTo(containerRef.current?.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    return (
      (filters.city === '' || mentor.city === filters.city) &&
      (filters.exam === '' || mentor.specialization.includes(filters.exam)) &&
      (filters.availability === '' || mentor.availability === filters.availability) &&
      (searchTerm === '' || mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       mentor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Travel Mentor</h1>
          <p className="text-xl text-gray-600">Verified mentors with proven track records of safe exam center guidance</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or exam type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filters.city}
                onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>

              <select
                value={filters.exam}
                onChange={(e) => setFilters(prev => ({ ...prev, exam: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Exams</option>
                <option value="JEE Main">JEE Main</option>
                <option value="NEET">NEET</option>
                <option value="CAT">CAT</option>
                <option value="UPSC">UPSC</option>
              </select>

              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map(mentor => (
            <div key={mentor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getAvailabilityColor(mentor.availability)} rounded-full border-2 border-white`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                      {mentor.verified && <Shield className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{mentor.city}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Car className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Travel: {mentor.travelRating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(mentor.travelRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm mt-1">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Exam: {mentor.examMentoringRating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(mentor.examMentoringRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-gray-500">({mentor.totalReviews} reviews)</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {mentor.specialization.map(spec => (
                      <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-800">₹{mentor.price}</span>
                    <span className="text-gray-600">/session</span>
                  </div>
                  <Link
                    to={`/mentor/${mentor.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No mentors found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDiscovery;
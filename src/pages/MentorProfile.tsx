import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { MapPin, Star, Shield, Car, Clock, Phone, Mail, Calendar, CheckCircle, Award, Users } from 'lucide-react';

const MentorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock mentor data - in real app, fetch based on ID
  const mentor = {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    city: 'Mumbai',
    specialization: ['JEE Main', 'JEE Advanced', 'Travel Guidance'],
    travelRating: 4.9,
    examMentoringRating: 4.7,
    totalReviews: 145,
    experience: 5,
    languages: ['Hindi', 'English', 'Marathi'],
    verified: true,
    price: 500,
    availability: 'available',
    bio: 'Experienced travel mentor with 5+ years of helping students reach their exam centers safely. I provide comprehensive guidance on routes, accommodations, and emergency support. Optional exam strategy sessions available.',
    services: [
      'Pre-exam travel planning',
      'Route recommendations',
      'Hotel and accommodation suggestions',
      'Cab fare estimates',
      'Morning-of-exam support',
      'Emergency assistance',
      'Optional exam strategy mentoring'
    ],
    achievements: [
      'Helped 500+ students reach exam centers safely',
      'Zero incidents in 5 years',
      '98% on-time arrival rate',
      'Verified by ExamMentor platform'
    ],
    reviews: [
      {
        id: 1,
        student: 'Rahul M.',
        rating: 5,
        comment: 'Priya helped me navigate Mumbai for my JEE exam. Her route suggestions saved me 2 hours!',
        date: '2 weeks ago',
        type: 'travel'
      },
      {
        id: 2,
        student: 'Sneha K.',
        rating: 5,
        comment: 'Excellent travel guidance and the hotel recommendation was perfect. Felt completely safe.',
        date: '1 month ago',
        type: 'travel'
      },
      {
        id: 3,
        student: 'Arjun S.',
        rating: 4,
        comment: 'Great exam strategy session. Helped calm my nerves before NEET.',
        date: '3 weeks ago',
        type: 'exam'
      }
    ]
  };

  useEffect(() => {
    gsap.fromTo(profileRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={profileRef} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold">{mentor.name}</h1>
                  {mentor.verified && <Shield className="h-8 w-8 text-yellow-400" />}
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Available</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{mentor.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-5 w-5" />
                    <span>{mentor.experience} years experience</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Car className="h-5 w-5" />
                    <span className="font-medium">Travel: {mentor.travelRating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(mentor.travelRating) ? 'text-yellow-400 fill-current' : 'text-white/50'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">Exam: {mentor.examMentoringRating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(mentor.examMentoringRating) ? 'text-yellow-400 fill-current' : 'text-white/50'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-blue-100">({mentor.totalReviews} reviews)</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-4xl font-bold mb-1">₹{mentor.price}</div>
                <div className="text-blue-100">per session</div>
                <Link 
                  to={`/booking/${mentor.id}`}
                  className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* About */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                  <p className="text-gray-600 leading-relaxed">{mentor.bio}</p>
                </div>

                {/* Specialization */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Specialization</h2>
                  <div className="flex flex-wrap gap-2">
                    {mentor.specialization.map(spec => (
                      <span key={spec} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Services Offered</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {mentor.services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Reviews</h2>
                  <div className="space-y-4">
                    {mentor.reviews.map(review => (
                      <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{review.student}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${review.type === 'travel' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {review.type === 'travel' ? 'Travel' : 'Exam Mentoring'}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                
                {/* Quick Stats */}
                <div className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Students Helped</span>
                      <span className="font-bold text-blue-600">500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Success Rate</span>
                      <span className="font-bold text-green-600">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Response Time</span>
                      {/* <span className="font-bold text-orange-600">< 1 hour</span> */}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
                  <div className="space-y-3">
                    {mentor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Award className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="bg-gradient-to-b from-green-50 to-white p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map(lang => (
                      <span key={lang} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <Link 
                  to={`/booking/${mentor.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book Session</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
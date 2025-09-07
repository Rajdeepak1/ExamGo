import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { User, Mail, Phone, MapPin, BookOpen, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SignUp: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    examCenter: '',
    exams: [] as string[],
    wantsExamMentoring: false
  });

  const examOptions = ['JEE Main', 'JEE Advanced', 'NEET', 'CAT', 'UPSC', 'SSC', 'Bank PO', 'GATE'];
  const cityOptions = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      userType: 'student' as const
    };

    login(userData);
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => navigate('/mentors')
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleExamChange = (exam: string) => {
    setFormData(prev => ({
      ...prev,
      exams: prev.exams.includes(exam) 
        ? prev.exams.filter(e => e !== exam)
        : [...prev.exams, exam]
    }));
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Profile</h1>
            <p className="text-gray-600">Get personalized travel guidance and mentoring for your exams</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Location Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Your City</span>
                </label>
                <select
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Your City</option>
                  {cityOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Exam Center</span>
                </label>
                <select
                  name="examCenter"
                  required
                  value={formData.examCenter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Exam Center</option>
                  {cityOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Exams */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                <BookOpen className="h-4 w-4" />
                <span>Exams You're Appearing For (Optional)</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {examOptions.map(exam => (
                  <label key={exam} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.exams.includes(exam)}
                      onChange={() => handleExamChange(exam)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{exam}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Exam Mentoring Option */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="wantsExamMentoring"
                  checked={formData.wantsExamMentoring}
                  onChange={(e) => setFormData(prev => ({ ...prev, wantsExamMentoring: e.target.checked }))}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="font-medium text-gray-800">I want optional exam strategy mentoring</span>
                  <p className="text-sm text-gray-600 mt-1">
                    Get additional guidance on exam strategies, stress management, and academic tips from qualified mentors.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Create Profile & Find Mentors</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Calendar, Clock, MapPin, Car, CheckCircle, CreditCard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Booking: React.FC = () => {
  const { mentorId } = useParams<{ mentorId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [bookingData, setBookingData] = useState({
    sessionType: 'travel',
    date: '',
    time: '',
    examDate: '',
    examCenter: '',
    additionalRequests: '',
    includeExamMentoring: false
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock mentor data
  const mentor = {
    id: '1',
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    price: 50,
    city: 'Mumbai'
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }

    gsap.fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setBookingData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success animation
    gsap.to(formRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setStep(3); // Success step
        setIsSubmitting(false);
      }
    });
  };

  const nextStep = () => {
    gsap.to(formRef.current, {
      x: -20,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => setStep(step + 1)
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>1</div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
          </div>
          <div className="flex justify-center space-x-12 mt-2 text-sm">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Details</span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Payment</span>
            <span className={step >= 3 ? 'text-green-600 font-medium' : 'text-gray-500'}>Confirmed</span>
          </div>
        </div>

        <div ref={formRef} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Mentor Info */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <img 
                src={mentor.avatar} 
                alt={mentor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h2 className="text-2xl font-bold">{mentor.name}</h2>
                <div className="flex items-center space-x-1 text-blue-100">
                  <MapPin className="h-4 w-4" />
                  <span>{mentor.city}</span>
                </div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-3xl font-bold">₹{mentor.price}</div>
                <div className="text-blue-100">per session</div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h3>
              
              <form className="space-y-6">
                {/* Session Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Session Type</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${bookingData.sessionType === 'travel' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                      <input
                        type="radio"
                        name="sessionType"
                        value="travel"
                        checked={bookingData.sessionType === 'travel'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <Car className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-800">Travel Guidance Only</h4>
                          <p className="text-sm text-gray-600">Routes, hotels, cab fares, safety tips</p>
                        </div>
                      </div>
                    </label>
                    
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${bookingData.sessionType === 'full' ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
                      <input
                        type="radio"
                        name="sessionType"
                        value="full"
                        checked={bookingData.sessionType === 'full'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <User className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-800">Travel + Exam Mentoring</h4>
                          <p className="text-sm text-gray-600">Includes exam strategy sessions</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Session Date</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Preferred Time</span>
                    </label>
                    <select
                      name="time"
                      required
                      value={bookingData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date</label>
                    <input
                      type="date"
                      name="examDate"
                      value={bookingData.examDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Center</label>
                    <input
                      type="text"
                      name="examCenter"
                      placeholder="e.g., IIT Bombay"
                      value={bookingData.examCenter}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Additional Requests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requests</label>
                  <textarea
                    name="additionalRequests"
                    rows={4}
                    placeholder="Any specific requirements or questions..."
                    value={bookingData.additionalRequests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!bookingData.date || !bookingData.time}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5" />
                          <span>Pay ₹{mentor.price}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-4">Booking Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mentor</span>
                      <span className="font-medium">{mentor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Session Type</span>
                      <span className="font-medium">{bookingData.sessionType === 'travel' ? 'Travel Only' : 'Travel + Exam'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="font-medium">{bookingData.date} at {bookingData.time}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{mentor.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h3>
              <p className="text-xl text-gray-600 mb-8">Your session with {mentor.name} has been successfully booked.</p>
              
              <div className="bg-blue-50 p-6 rounded-xl mb-8 text-left">
                <h4 className="font-bold text-gray-800 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Your mentor will contact you within 24 hours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Receive detailed travel guidance and checklist</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Get hotel and transportation recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Optional exam-day morning support available</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
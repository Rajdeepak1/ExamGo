import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Shield, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current?.children[0], 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(heroRef.current?.children[1], 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 }
    );

    gsap.fromTo(heroRef.current?.children[2], 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 0.9 }
    );

    // Features animation
    ScrollTrigger.create({
      trigger: featuresRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(featuresRef.current?.children, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );
      }
    });

    // Steps animation
    ScrollTrigger.create({
      trigger: stepsRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(stepsRef.current?.children, 
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: "power3.out" }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div ref={heroRef} className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Safe Travel to Your <span className="text-yellow-400">Exam Center</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Expert travel guidance, verified mentors, and stress-free exam day experience. 
            Optional academic mentoring available.
          </p>
          <Link to="/signup" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-xl font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <span>Find Your Mentor Now</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Key Benefits */}
      <div ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose ExamMentor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Travel Guidance</h3>
              <p className="text-gray-600">Get routes, cab fares, and travel tips from experienced mentors who know your exam center.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-green-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety First</h3>
              <p className="text-gray-600">Verified mentors ensure your safe arrival with emergency support and trusted recommendations.</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-b from-orange-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Optional Mentoring</h3>
              <p className="text-gray-600">Choose to add exam strategy sessions, stress management, and academic guidance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div ref={stepsRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            How It Works
          </h2>
          <div className="space-y-12">
            <div className="flex items-center space-x-8">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">1</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign Up & Share Details</h3>
                <p className="text-gray-600 text-lg">Tell us your exam center, city, and whether you want optional academic mentoring.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">2</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Find Your Perfect Mentor</h3>
                <p className="text-gray-600 text-lg">Browse verified mentors with travel experience and ratings for your specific exam center.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">3</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Get Travel Guidance</h3>
                <p className="text-gray-600 text-lg">Receive routes, hotel recommendations, cab fares, and a complete travel checklist.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">4</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Exam Day Support</h3>
                <p className="text-gray-600 text-lg">Optional morning-of-exam assistance to ensure you reach safely and on time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready for Stress-Free Exam Travel?</h2>
          <p className="text-xl mb-8 text-blue-100">We take care of the travel, you take care of the answers.</p>
          <Link to="/signup" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full text-xl font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <span>Get Started Now</span>
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      {/* Sticky Navbar - Enhanced Professional Design with Better Contrast */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-2 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "py-4 bg-[#0F172A]/80 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="relative pt-4 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between" aria-label="Global">
              {/* Logo Section with Animation */}
              <div className="flex items-center flex-grow-0">
                <Link href="/" className="group flex items-center">
                  <span className="sr-only">Adermis</span>
                  <div className="mr-2 h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg transform transition duration-300 group-hover:scale-110 shadow-md">A</div>
                  <span className={`text-xl font-bold ${scrolled ? 'text-[#1E3A8A]' : 'text-white'} transition-colors duration-300`}>Adermis</span>
                </Link>
              </div>
              
              {/* Center Navigation Links with Improved Visibility */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-8">
                  <Link href="/scan/upload/" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-[#1E3A8A]' : 'text-white hover:text-blue-300'} transition-colors duration-300 relative group`}>
                    Skin Analyzer
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${scrolled ? 'bg-[#1E3A8A]' : 'bg-blue-300'} transition-all duration-300 group-hover:w-full`}></span>
                  </Link>
                  <Link href="/women" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-[#1E3A8A]' : 'text-white hover:text-blue-300'} transition-colors duration-300 relative group`}>
                    Women Health
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${scrolled ? 'bg-[#1E3A8A]' : 'bg-blue-300'} transition-all duration-300 group-hover:w-full`}></span>
                  </Link>
                </div>
              </div>
              
              {/* Right Side - Login/Signup with Improved Visibility */}
              <div className="flex items-center space-x-5">
                <Link href="/login" className={`hidden md:block font-medium ${scrolled ? 'text-gray-600 hover:text-[#1E3A8A]' : 'text-white hover:text-blue-300'} transition-colors duration-300`}>
                  Login
                </Link>
                <Link href="/register" className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#1E3A8A] hover:bg-[#152a65] transition-colors duration-300 shadow-sm hover:shadow-md">
                  Sign up
                </Link>
                
                {/* Mobile Menu Button - Only visible on small screens */}
                <button type="button" className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${scrolled ? 'text-gray-700 hover:text-[#1E3A8A] hover:bg-gray-100' : 'text-white hover:text-blue-300 hover:bg-[#172B4D]'} focus:outline-none transition duration-150 ease-in-out`} aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section with Advanced Design */}
      <div className="relative min-h-screen overflow-hidden flex items-center text-white"
          style={{
            backgroundImage: "url('1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}>
        {/* Dark overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 to-[#172B4D]/77"></div>
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute animate-pulse bg-blue-400/10 rounded-full -top-20 -left-20 w-96 h-96 blur-3xl"></div>
          <div className="absolute animate-pulse bg-blue-400/10 rounded-full -bottom-20 -right-20 w-96 h-96 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Title with Staggered Animation */}
            <h1 className="text-5xl font-bold mb-6 relative">
              <span className="block text-white">AI-Powered</span>
              <span className="block text-[#4A6CF7] transform transition-all duration-300 hover:scale-105 hover:translate-x-2">
                Skin Disease Detection
              </span>
            </h1>

            {/* Description with Hover Effect */}
            <p className="text-gray-300 text-lg mb-10 relative group">
              <span className="relative">
                Upload a photo of your skin concern and get instant AI analysis.
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
              </span>
              {' '}
              <span className="relative">
                Identify potential conditions, receive recommendations, and take control of your skin health.
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </p>

            {/* Action Buttons with Advanced Hover */}
            <div className="flex justify-center space-x-6 mb-10">
              <Link 
                href="/scan/upload/" 
                className="px-12 py-4 text-lg bg-[#4A6CF7] text-white rounded-xl 
                transform transition-all duration-300 ease-in-out
                hover:bg-[#3A5AE0] hover:shadow-2xl hover:scale-105
                flex items-center space-x-3 group
                relative overflow-hidden
                shadow-md shadow-[#4A6CF7]/50"
              >
                {/* Gradient Overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#4A6CF7]/20 to-[#4A6CF7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                <span className="relative z-10">Try It Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link 
                href="/register" 
                className="px-12 py-4 text-lg border-2 border-[#4A6CF7] text-[#4A6CF7] rounded-xl
                transform transition-all duration-300 ease-in-out
                hover:bg-[#4A6CF7] hover:text-white hover:shadow-2xl hover:scale-105
                relative overflow-hidden
                shadow-md shadow-[#4A6CF7]/30"
              >
                {/* Subtle Gradient Overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#4A6CF7]/10 to-[#4A6CF7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                
                <span className="relative z-10">Sign Up</span>
              </Link>
            </div>

            {/* Clinically Validated Badge */}
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <div className="w-6 h-6 bg-[#4A6CF7]/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#4A6CF7]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm">Clinically Validated AI Technology</span>
            </div>
          </div>
        </div>

        {/* Subtle Disclaimer */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500 text-xs px-4">
          * Adermis helps you understand potential skin conditions. Always consult a healthcare professional for accurate diagnosis.
        </div>

        {/* Optional: Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundSize: '50px 50px',
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)'
          }}></div>
        </div>
      </div>
        

      {/* How It Works Section - Enhanced with Light Background */}
      <div className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title with Animation */}
          <div className="text-center relative">
            <div className="inline-block">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-50 rounded-full animate-pulse"></div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A8A] relative">How It Works</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-4"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process for professional skin analysis and condition management
            </p>
          </div>

          {/* Cards Grid with Animation */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            
            {/* Card 1: Upload Photo - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Upload your skin photo"
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] mb-6 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Photo</h3>
                <p className="text-gray-600 text-lg">
                  Capture and upload a high-resolution image of your skin concern using our secure, HIPAA-compliant platform.
                </p>
                <div className="mt-6 bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700"><strong>Pro Tip:</strong> Ensure good lighting and focus for the most accurate analysis.</p>
                </div>
              </div>
            </div>

            {/* Card 2: AI Analysis - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Advanced AI skin analysis"
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] mb-6 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI Analysis</h3>
                <p className="text-gray-600 text-lg">
                  Our proprietary machine learning algorithms provide medical-grade skin condition assessment with 98% accuracy.
                </p>
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Analysis Accuracy</span>
                    <span className="text-sm font-medium text-blue-700">98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Personalized Report - Enhanced */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mix-blend-overlay"></div>
                <img
                  src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Comprehensive skin health results"
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-[#1E3A8A]/10 flex items-center justify-center text-[#1E3A8A] mb-6 shadow-inner">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalized Report</h3>
                <p className="text-gray-600 text-lg">
                  Receive a comprehensive analysis with clinically-backed treatment recommendations tailored to your specific needs.
                </p>
                <div className="mt-6 flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Condition Identification</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Treatment Options</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>PDF Export Option</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call-to-action button with scan link */}
          <div className="mt-16 text-center">
            <a 
              href="/scan/upload/" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Try Skin Analysis Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

{/* Why Choose Adermis - Enhanced Professional Section */}
<div className="py-24 bg-gradient-to-b from-white to-blue-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header with Enhanced Typography */}
    <div className="text-center mb-16 relative">
      <div className="inline-block">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 relative">
          Why Choose Adermis
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto"></div>
      </div>
      <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
        Our advanced technology makes skin analysis accessible, accurate, and actionable for everyone
      </p>
    </div>
    
    {/* Features Cards with Animation and Enhanced Design */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
      {/* Smart - Enhanced */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group">
        <div className="absolute -top-10 inset-x-0 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
            </svg>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligence-Driven</h3>
          <p className="text-gray-600">
            Powered by advanced machine learning algorithms that analyze skin conditions with 98% accuracy, trained on a diverse dataset of over 100,000 clinical images.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-500">Diagnostic Accuracy</span>
              <span className="text-sm font-bold text-[#00BCD4]">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#00BCD4] h-1.5 rounded-full" style={{width: '98%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple - Enhanced */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group">
        <div className="absolute -top-10 inset-x-0 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Effortlessly Simple</h3>
          <p className="text-gray-600">
            Capture and upload an image of your skin concern, and within 60 seconds, receive comprehensive insights and personalized recommendations.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-1 text-[#00BCD4]">
                <span className="block w-2 h-2 rounded-full bg-[#00BCD4]"></span>
                <span className="block w-2 h-2 rounded-full bg-[#00BCD4]"></span>
                <span className="block w-2 h-2 rounded-full bg-[#00BCD4]"></span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">60-second analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accessible - Enhanced */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group">
        <div className="absolute -top-10 inset-x-0 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3" />
            </svg>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Always Accessible</h3>
          <p className="text-gray-600">
            Access professional-grade skin analysis anytime, anywhere, on any device. Your skin health insights are always at your fingertips.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-center space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00BCD4" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15.75h3" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00BCD4" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#00BCD4" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Affordable - Enhanced */}
      <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative group">
        <div className="absolute -top-10 inset-x-0 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Effective</h3>
          <p className="text-gray-600">
            Access premium dermatological insights at a fraction of traditional costs, with flexible plans designed to fit your specific needs.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-[#00BCD4] font-bold">80%</span>
              <span className="text-sm text-gray-500">lower cost than in-person consultations</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="mt-16 text-center">
      <a 
        href="/register" 
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#00BCD4] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00838F] transition-all duration-300 transform hover:scale-105"
      >
        Explore All Features
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
</div>



 {/* Professional Footer with Modern Design */}
<footer className="bg-gradient-to-r from-[#1A1A2E] to-[#16213E] text-white">
  <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    {/* Top Section with Logo and Description */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-gray-700 pb-12">
      {/* Brand */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md mr-3">A</div>
          <span className="text-2xl font-bold text-white">Adermis</span>
        </div>
        <p className="text-gray-400 mb-6 max-w-md">
          Advanced AI-powered skin health analysis for personalized skin care recommendations and early detection of potential conditions.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
        <ul className="space-y-3">
          <li>
            <a href="/scan/upload/" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Skin Analysis
            </a>
          </li>
          <li>
            <a href="/women" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Women's Health
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Treatment Recommendations
            </a>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/privacy" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Terms
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-400 hover:text-[#00D8FF] transition duration-300 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="flex flex-col md:flex-row justify-center items-center pt-8 border-t border-gray-800">
      <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Adermis. All rights reserved.</p>
    </div>
  </div>
</footer>

      <style jsx global>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
        }
      `}</style>
    </main>
  );
}
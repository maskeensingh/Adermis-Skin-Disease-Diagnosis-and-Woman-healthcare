'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  delay?: number;
}

function StatCard({ title, value, icon, change, changeType = 'neutral', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-3 shadow-md">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-xl font-bold text-gray-900">{value}</div>
              </dd>
              {change && (
                <dd className="flex items-center text-sm">
                  {changeType === 'positive' && (
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {changeType === 'negative' && (
                    <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1v-5a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586 20.293 5.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0L13 9.414l-3.293 3.293A1 1 0 019 13H7z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span
                    className={`${
                      changeType === 'positive'
                        ? 'text-green-600 font-medium'
                        : changeType === 'negative'
                        ? 'text-red-600 font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    {change}
                  </span>
                </dd>
              )}
            </dl>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ScanHistory {
  id: number;
  date: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  imageUrl: string;
}

interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  scanCount: number;
  lastScan: string;
  subscription: 'Free' | 'Premium' | 'Professional';
}

export default function Dashboard() {
  // Simulated user profile data that would normally come from auth context
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recentScans, setRecentScans] = useState<ScanHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Simulate API call to get user profile and scans
    setTimeout(() => {
      setUserProfile({
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        memberSince: '2022-11-15',
        scanCount: 12,
        lastScan: '2023-03-15',
        subscription: 'Premium'
      });
      
      setRecentScans([
        {
          id: 1,
          date: '2023-03-15',
          condition: 'Eczema',
          confidence: 92,
          severity: 'Medium',
          imageUrl: 'https://dermnetnz.org/assets/Uploads/eczema-close.jpg',
        },
        {
          id: 2,
          date: '2023-02-28',
          condition: 'Psoriasis',
          confidence: 87,
          severity: 'High',
          imageUrl: 'https://dermnetnz.org/assets/Uploads/psoriasis-plaque3.jpg',
        },
        {
          id: 3,
          date: '2023-01-10',
          condition: 'Acne',
          confidence: 95,
          severity: 'Low',
          imageUrl: 'https://dermnetnz.org/assets/Uploads/acne-mild3.jpg',
        },
      ]);
      setIsLoading(false);
    }, 1200);
  }, []);

  // Function to format date to nicer display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionColor = (type: string) => {
    switch(type) {
      case 'Premium': 
        return 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white';
      case 'Professional': 
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      default: 
        return 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800';
    }
  };

  // animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative animate-spin">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-full py-6">
      {userProfile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {greeting}, {userProfile.name}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Here's what's happening with your skin health today
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSubscriptionColor(userProfile.subscription)}`}>
                {userProfile.subscription} Plan
              </span>
              <Link
                href="/scan"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Scan
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8 border border-indigo-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-indigo-900">Your Skin Health Summary</h2>
                <p className="mt-1 text-sm text-indigo-700">Member since {formatDate(userProfile.memberSince)}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-white text-indigo-800 shadow-sm border border-indigo-200">
                  <svg className="mr-1.5 h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Last analysis: {formatDate(userProfile.lastScan)}
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-gray-900 text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <StatCard
              title="Total Scans"
              value={userProfile.scanCount}
              change="+20% from last month"
              changeType="positive"
              delay={0.1}
              icon={
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <StatCard
              title="Conditions Detected"
              value={new Set(recentScans.map(scan => scan.condition)).size}
              delay={0.2}
              icon={
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
            />
            <StatCard
              title="Last Scan"
              value={formatDate(userProfile.lastScan)}
              delay={0.3}
              icon={
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-lg font-semibold">Recent Scans</h2>
            <Link 
              href="/dashboard/history" 
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center"
            >
              View all
              <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <motion.div 
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentScans.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentScans.map((scan, index) => (
                  <motion.li 
                    key={scan.id} 
                    variants={itemVariants}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors duration-200"
                  >
                    <Link href={`/dashboard/history/${scan.id}`} className="block">
                      <div className="px-6 py-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-14 w-14 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                              <img src={scan.imageUrl} alt={scan.condition} className="h-14 w-14 object-cover" />
                            </div>
                            <div className="ml-4">
                              <p className="text-base font-medium text-indigo-600 truncate">{scan.condition}</p>
                              <div className="flex items-center mt-1">
                                <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm text-gray-500">
                                  {formatDate(scan.date)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="mr-4">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">Confidence:</span>
                                <span className="ml-1 text-sm font-bold text-indigo-600">{scan.confidence}%</span>
                              </div>
                              <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                                <div 
                                  className="h-full bg-indigo-600 rounded-full" 
                                  style={{ width: `${scan.confidence}%` }}
                                ></div>
                              </div>
                            </div>
                            <span
                              className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                scan.severity === 'High'
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : scan.severity === 'Medium'
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-green-100 text-green-800 border border-green-200'
                              }`}
                            >
                              {scan.severity}
                            </span>
                            <svg className="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No scans yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new scan.</p>
                <div className="mt-6">
                  <Link
                    href="/scan"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Scan
                  </Link>
                </div>
              </div>
            )}
          </motion.div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skin Health Trends</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500 text-sm">Premium feature: Detailed analytics and trends of your skin health over time</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600">Regular skin checkups are recommended every 3 months</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600">Maintain a skincare routine with cleansers suitable for your skin type</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600">Apply SPF 30+ sunscreen daily, even on cloudy days</p>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-gray-600">Stay hydrated by drinking at least 8 glasses of water daily</p>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/resources"
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  View more resources
                  <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
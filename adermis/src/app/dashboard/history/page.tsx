'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ScanHistoryItem {
  id: number;
  date: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  imageUrl: string;
}

export default function History() {
  const [scans, setScans] = useState<ScanHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setScans([
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
        {
          id: 4,
          date: '2022-12-05',
          condition: 'Rosacea',
          confidence: 89,
          severity: 'Medium',
          imageUrl: 'https://dermnetnz.org/assets/Uploads/rosacea-6.jpg',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter by severity and search term
  const filteredScans = scans
    .filter(scan => 
      filter === 'all' 
        ? true
        : filter === 'high' 
          ? scan.severity === 'High' 
          : filter === 'medium' 
            ? scan.severity === 'Medium' 
            : scan.severity === 'Low'
    )
    .filter(scan => 
      searchTerm
        ? scan.condition.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'confidence') {
        return sortOrder === 'asc'
          ? a.confidence - b.confidence
          : b.confidence - a.confidence;
      } else {
        // Sort by condition name
        return sortOrder === 'asc'
          ? a.condition.localeCompare(b.condition)
          : b.condition.localeCompare(a.condition);
      }
    });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getConditionDescription = (condition: string) => {
    switch (condition) {
      case 'Eczema':
        return 'Inflammation causing itchy, red, dry skin';
      case 'Psoriasis':
        return 'Condition causing scaly patches on the skin';
      case 'Acne':
        return 'Skin condition with pimples and spots';
      case 'Rosacea':
        return 'Facial redness with small red bumps';
      default:
        return 'Skin condition detected by AI analysis';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' };
      case 'Medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
      case 'Low':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Scan History</h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search conditions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Severities</option>
                  <option value="high">High Severity</option>
                  <option value="medium">Medium Severity</option>
                  <option value="low">Low Severity</option>
                </select>
              </div>
              
              {/* New Scan Button - FIXED LINK */}
              <Link
                href="/scan/upload"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Scan
              </Link>
            </div>
          </div>
        </div>

        {/* Sorting Options */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-3">Sort by:</span>
            <button
              onClick={() => toggleSort('date')}
              className={`mr-4 flex items-center ${sortBy === 'date' ? 'font-medium text-indigo-600' : ''}`}
            >
              Date
              {sortBy === 'date' && (
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'desc' ? (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
            <button
              onClick={() => toggleSort('confidence')}
              className={`mr-4 flex items-center ${sortBy === 'confidence' ? 'font-medium text-indigo-600' : ''}`}
            >
              Confidence
              {sortBy === 'confidence' && (
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'desc' ? (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
            <button
              onClick={() => toggleSort('condition')}
              className={`flex items-center ${sortBy === 'condition' ? 'font-medium text-indigo-600' : ''}`}
            >
              Condition
              {sortBy === 'condition' && (
                <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  {sortOrder === 'desc' ? (
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  )}
                </svg>
              )}
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">
            <svg className="animate-spin mx-auto h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-500">Loading scan history...</p>
          </div>
        ) : filteredScans.length > 0 ? (
          <motion.ul 
            role="list" 
            className="divide-y divide-gray-200"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {filteredScans.map((scan) => (
              <motion.li 
                key={scan.id} 
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                className="transition-all duration-200"
              >
                <div className="px-6 py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden shadow-sm border border-gray-200">
                      <img src={scan.imageUrl} alt={scan.condition} className="h-20 w-20 object-cover" />
                    </div>
                    <div className="ml-5 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                            <Link href={`/dashboard/history/${scan.id}`}>{scan.condition}</Link>
                          </p>
                          <div className="flex items-center mt-1">
                            <svg className="h-4 w-4 text-gray-400 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-500">
                              {new Date(scan.date).toLocaleDateString(undefined, { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {/* Confidence indicator */}
                          <div className="mr-4">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-700">Confidence:</span>
                              <span className="ml-1 text-sm font-bold text-indigo-600">{scan.confidence}%</span>
                            </div>
                            <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                              <div 
                                className="h-full bg-indigo-600 rounded-full" 
                                style={{ width: `${scan.confidence}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* Severity badge */}
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              getSeverityColor(scan.severity).bg
                            } ${getSeverityColor(scan.severity).text} border ${
                              getSeverityColor(scan.severity).border
                            }`}
                          >
                            {scan.severity} Severity
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          {getConditionDescription(scan.condition)}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedScan(scan)}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                          >
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Quick View
                          </button>
                          <Link
                            href={`/dashboard/history/${scan.id}`}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                          >
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M12 13a1 1 0 110-2 1 1 0 010 2zm0-5a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scan results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm 
                ? `No results matching "${searchTerm}"`
                : filter !== 'all'
                  ? `No ${filter} severity scans found`
                  : 'You haven\'t performed any scans yet'}
            </p>
            <div className="mt-6">
              {/* Perform a Scan Button - FIXED LINK */}
              <Link
                href="/scan/upload/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Perform a Scan
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedScan && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedScan(null)}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <motion.div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedScan.condition}
                      </h3>
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          getSeverityColor(selectedScan.severity).bg
                        } ${getSeverityColor(selectedScan.severity).text}`}
                      >
                        {selectedScan.severity}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={selectedScan.imageUrl} 
                          alt={selectedScan.condition} 
                          className="object-cover w-full h-48"
                        />
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(selectedScan.date).toLocaleDateString(undefined, { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Confidence</p>
                          <p className="mt-1 text-sm text-gray-900">{selectedScan.confidence}%</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm font-medium text-gray-500">Description</p>
                          <p className="mt-1 text-sm text-gray-900">
                            {getConditionDescription(selectedScan.condition)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link
                  href={`/dashboard/history/${selectedScan.id}`}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  View Full Details
                </Link>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedScan(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
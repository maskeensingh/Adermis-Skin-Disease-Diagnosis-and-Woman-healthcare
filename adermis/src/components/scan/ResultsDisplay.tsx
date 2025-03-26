interface AnalysisResult {
    condition: string;
    confidence: number;
    severity: 'Low' | 'Medium' | 'High';
    description: string;
    recommendations: string[];
  }
  
  interface ResultsDisplayProps {
    results: AnalysisResult;
    image: string | null;
    onReset: () => void;
  }
  
  export default function ResultsDisplay({ results, image, onReset }: ResultsDisplayProps) {
    const { condition, confidence, description, recommendations, severity } = results;
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Uploaded Image</h3>
            {image && (
              <div className="relative w-full h-64">
                <img
                  src={image}
                  alt="Analyzed skin image"
                  className="mx-auto max-h-64 max-w-full object-contain"
                />
              </div>
            )}
          </div>
          
          {/* Primary Results */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Results</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Detected Condition</h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">{condition}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Confidence</h3>
                <div className="mt-1 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div 
                      style={{ width: `${confidence}%` }} 
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                        confidence > 80 ? 'bg-green-500' : confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-700">{confidence}%</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Severity</h3>
                <p className={`mt-1 font-medium ${
                  severity === 'High' ? 'text-red-600' : 
                  severity === 'Medium' ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {severity}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900">About this condition</h3>
            <p className="mt-2 text-gray-600">{description}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Recommendations</h3>
            <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  This analysis is for informational purposes only and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Analysis
          </button>
          
          <button
            type="button"
            onClick={() => {
              // Save result functionality
              alert('Result saved to your history');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Result
          </button>
        </div>
      </div>
    );
  }
  
'use client';

import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSkinAnalysis } from '../context/SkinAnalysisContext';

export default function AnalysisPage() {
  const { input, result, setResult, finalTreatment, setFinalTreatment } = useSkinAnalysis();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [followUpAnswers, setFollowUpAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleAnalysis = async () => {
    if (!input.image && !input.textDescription) {
      toast.error('Please provide an image or a text description for analysis');
      return;
    }

    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      if (input.image) {
        formData.append('image', input.image);
      }
      if (input.textDescription) {
        formData.append('description', input.textDescription);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend analysis failed");
      }

      const backendResult = await response.json();
      console.log("Analysis response from backend:", backendResult);

      const predictions = backendResult.predictions;
      const mainPrediction = predictions && predictions.length > 0 ? predictions[0] : null;

      if (!mainPrediction) {
        throw new Error("No predictions received from backend");
      }

      const confidencePercent = Math.round(mainPrediction.score * 100);
      const severity = confidencePercent > 80 ? 'High' : confidencePercent > 50 ? 'Medium' : 'Low';

      setResult({
        condition: mainPrediction.disease,
        confidence: confidencePercent,
        severity,
        description: `The analysis indicates a likelihood of ${mainPrediction.disease}.`,
        recommendations: [
          "Consult with a dermatologist for a definitive diagnosis.",
          "Consider additional tests if symptoms persist.",
          "Maintain a healthy skincare routine."
        ],
        followUpQuestions: backendResult.followup_questions || []
      });

      toast.success('Analysis Complete!');
    } catch (err) {
      toast.error('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFollowUpSubmit = async () => {
    if (!result) {
      toast.error("No analysis result found to finalize.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/final-diagnosis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          predictions: result,
          user_answers: followUpAnswers
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to retrieve final diagnosis");
      }

      const finalData = await response.json();
      console.log("Final diagnosis data:", finalData);

      setFinalTreatment(finalData.treatment);
      console.log("Received Final Treatment:", finalData.treatment);
      toast.success("Final diagnosis and treatment received!");
    } catch (err) {
      toast.error("Failed to fetch final diagnosis. Try again.");
      console.error(err);
    }
  };

  const resetAnalysis = () => {
    router.push('/scan/upload');
  };

  const goToClinics = () => {
    router.push('/scan/clinics');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-lg text-black font-bold mb-4">Step 2: Analysis Page</h1>

        {!result && (
          <button
            onClick={handleAnalysis}
            disabled={isAnalyzing || (!input.image && !input.textDescription)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </button>
        )}

        {result && (
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Analysis Results</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Detected Condition</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xl font-bold text-blue-700">{result.condition}</p>
                  <div className="mt-2">
                    <span className="font-medium">Confidence:</span>{' '}
                    <span className={
                      result.confidence > 80 ? 'text-green-600' :
                      result.confidence > 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }>
                      {result.confidence}%
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Severity</h3>
                <div className={`p-4 rounded-lg ${
                  result.severity === 'High' ? 'bg-red-50 text-red-700' :
                  result.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <p className="font-bold">{result.severity} Severity</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{result.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-700">{rec}</li>
                ))}
              </ul>
            </div>

            {result.followUpQuestions && result.followUpQuestions.length > 0 && (
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Follow-up Questions</h3>
                {result.followUpQuestions.map((question, index) => (
                  <div key={index} className="mb-2">
                    <p className="text-gray-700 font-medium">{question}</p>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-lg"
                      value={followUpAnswers[question] || ""}
                      onChange={(e) =>
                        setFollowUpAnswers({
                          ...followUpAnswers,
                          [question]: e.target.value
                        })
                      }
                    />
                  </div>
                ))}
                <button
                  onClick={handleFollowUpSubmit}
                  className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit Answers
                </button>
              </div>
            )}

            {finalTreatment && (
              <div className="mt-6 p-6 bg-green-50 rounded-lg">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Final Treatment Plan</h2>
                {finalTreatment.split(/\n(?=\*\*)/).map((section, idx) => {
                  const match = section.match(/\*\*(.+?)\*\*:?[\s\n]*(.*)/s);
                  if (!match) {
                    return (
                      <p key={idx} className="text-gray-700 mt-2 whitespace-pre-line">
                        {section.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^\*+/, '').trim()}
                      </p>
                    );
                  }
                  const [_, title, content] = match;
                  const listItems = content
                    .split(/\n[\*\-•]\s+/)
                    .filter((line, i) => i !== 0 || content.startsWith("*") || content.startsWith("-") || content.startsWith("•"));
                  const isList = listItems.length > 1;

                  return (
                    <div key={idx} className="mb-4">
                      <h3 className="text-lg font-semibold text-green-800">{title.replace(/\*\*/g, '').trim()}</h3>
                      {isList ? (
                        <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                          {listItems.map((item, i) => {
                            const subpoints = item
                              .split(/\n[\*\-•]\s+/)
                              .map(s => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^\*+/, '').trim())
                              .filter(Boolean);

                            if (subpoints.length > 1) {
                              return (
                                <li key={i}>
                                  {subpoints[0]}
                                  <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                    {subpoints.slice(1).map((sub, j) => (
                                      <li key={j}>{sub}</li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            } else {
                              return (
                                <li key={i}>{subpoints[0]}</li>
                              );
                            }
                          })}
                        </ul>
                      ) : (
                        <p className="mt-2 text-gray-700 whitespace-pre-line">
                          {content.replace(/\*\*(.+?)\*\*/g, '$1').replace(/^\*+/, '').trim()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <button
                onClick={resetAnalysis}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                New Analysis
              </button>
              <button
                onClick={goToClinics}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Find Nearby Clinics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

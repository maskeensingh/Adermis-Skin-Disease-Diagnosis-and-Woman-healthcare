// 'use client';

// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { toast, Toaster } from 'react-hot-toast';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// interface SkinConcernInput {
//   image?: File | null;
//   imagePreview?: string | null;
//   textDescription?: string;
// }

// interface AnalysisResult {
//   condition: string;
//   confidence: number;
//   severity: 'Low' | 'Medium' | 'High';
//   description: string;
//   recommendations: string[];
//   followUpQuestions?: string[];
// }

// const PREDEFINED_CONCERNS = [
//   "Persistent redness",
//   "Itching or burning sensation",
//   "Dry, scaly patches",
//   "Bumps or blisters",
//   "Changes in skin color",
//   "Unusual moles or growths",
//   "Sudden skin sensitivity"
// ];

// // A separate ClinicsMap component
// function ClinicsMap({
//   clinics,
//   center
// }: {
//   clinics: any[];
//   center: { lat: number; lng: number };
// }) {
//   const mapContainerStyle = { width: '100%', height: '400px' };
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   console.log("ClinicsMap -> API Key:", googleMapsApiKey);
//   console.log("ClinicsMap -> clinics:", clinics);
//   console.log("ClinicsMap -> center:", center);

//   if (!googleMapsApiKey) {
//     return (
//       <div className="text-red-500 font-semibold">
//         No API key found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
//       </div>
//     );
//   }

//   return (
//     <LoadScript googleMapsApiKey={googleMapsApiKey}>
//       <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
//         {clinics.map((clinic, index) => {
//           // If location is missing lat/lng, skip
//           if (!clinic.location || !clinic.location.lat || !clinic.location.lng) {
//             console.warn("Clinic missing lat/lng:", clinic);
//             return null;
//           }
//           return (
//             <Marker
//               key={index}
//               position={{
//                 lat: clinic.location.lat,
//                 lng: clinic.location.lng
//               }}
//             />
//           );
//         })}
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default function Page() {
//   const [input, setInput] = useState<SkinConcernInput>({
//     image: null,
//     imagePreview: null,
//     textDescription: ''
//   });
//   const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
//   const [result, setResult] = useState<AnalysisResult | null>(null);
//   const [finalTreatment, setFinalTreatment] = useState<string>('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [followUpAnswers, setFollowUpAnswers] = useState<{ [key: string]: string }>({});
//   const [clinics, setClinics] = useState<any[]>([]);
//   const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // Check environment variable on mount
//   useEffect(() => {
//     console.log("API Key on mount:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
//   }, []);

//   const startCamera = useCallback(async () => {
//     try {
//       const constraints = {
//         video: {
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: 'environment'
//         }
//       };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current?.play();
//         };
//       }
//     } catch (err) {
//       toast.error('Camera access denied. Please check permissions.');
//       console.error(err);
//     }
//   }, []);

//   const capturePhoto = () => {
//     if (videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;

//       if (video.videoWidth === 0 || video.videoHeight === 0) {
//         toast.error('Camera not ready. Please try again.');
//         return;
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       const context = canvas.getContext('2d');
//       context?.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL('image/jpeg');

//       setInput(prev => ({ ...prev, imagePreview: dataUrl }));
//       fetch(dataUrl)
//         .then(res => res.blob())
//         .then(blob => {
//           const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
//           setInput(prev => ({ ...prev, image: file }));
//           toast.success('Photo captured successfully!');
//         })
//         .catch(err => {
//           toast.error('Failed to process image');
//           console.error(err);
//         });

//       const stream = video.srcObject as MediaStream;
//       const tracks = stream.getTracks();
//       tracks.forEach(track => track.stop());
//     } else {
//       toast.error('Camera or canvas not available');
//     }
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setInput(prev => ({
//           ...prev,
//           image: file,
//           imagePreview: reader.result as string
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const toggleConcern = (concern: string) => {
//     setSelectedConcerns(prev =>
//       prev.includes(concern)
//         ? prev.filter(c => c !== concern)
//         : [...prev, concern]
//     );
//   };

//   const handleAnalysis = async () => {
//     if (!input.image && !input.textDescription) {
//       toast.error('Please provide an image or a text description for analysis');
//       return;
//     }

//     setIsAnalyzing(true);
//     try {
//       const formData = new FormData();
//       if (input.image) {
//         formData.append('image', input.image);
//       }
//       if (input.textDescription) {
//         formData.append('description', input.textDescription);
//       }
//       const response = await fetch("http://localhost:5000/api/analyze", {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error("Backend analysis failed");
//       }
//       const backendResult = await response.json();
//       console.log("Analysis response from backend:", backendResult);

//       const predictions = backendResult.predictions;
//       const mainPrediction = predictions && predictions.length > 0 ? predictions[0] : null;
//       if (!mainPrediction) {
//         throw new Error("No predictions received from backend");
//       }
//       const confidencePercent = Math.round(mainPrediction.score * 100);
//       const severity = confidencePercent > 80 ? 'High' : confidencePercent > 50 ? 'Medium' : 'Low';

//       setResult({
//         condition: mainPrediction.disease,
//         confidence: confidencePercent,
//         severity,
//         description: `The analysis indicates a likelihood of ${mainPrediction.disease}.`,
//         recommendations: [
//           "Consult with a dermatologist for a definitive diagnosis.",
//           "Consider additional tests if symptoms persist.",
//           "Maintain a healthy skincare routine."
//         ],
//         followUpQuestions: backendResult.followup_questions || []
//       });
//       toast.success('Analysis Complete!');
//     } catch (err) {
//       toast.error('Analysis failed. Please try again.');
//       console.error(err);
//     } finally {
//       setIsAnalyzing(false);
//     }
//   };

//   const handleFollowUpSubmit = async () => {
//     if (!result) {
//       toast.error("No analysis result found to finalize.");
//       return;
//     }
//     try {
//       const response = await fetch("http://localhost:5000/api/final-diagnosis", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           predictions: result,
//           user_answers: followUpAnswers
//         }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to retrieve final diagnosis");
//       }
//       const finalData = await response.json();
//       console.log("Final diagnosis data:", finalData);

//       setFinalTreatment(finalData.treatment);
//       toast.success("Final diagnosis and treatment received!");
//     } catch (err) {
//       toast.error("Failed to fetch final diagnosis. Try again.");
//       console.error(err);
//     }
//   };

//   const handleFindClinics = async () => {
//     if (!result) {
//       toast.error("Please complete analysis to get a disease prediction first.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });
//         console.log("User's current location:", { lat: latitude, lng: longitude });

//         try {
//           const response = await fetch("http://localhost:5000/api/find_clinics", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               disease: result.condition,
//               location: { lat: latitude, lng: longitude },
//               range: 5
//             }),
//           });
//           if (!response.ok) {
//             throw new Error("Failed to fetch clinics");
//           }
//           const data = await response.json();
//           console.log("Clinics data from backend:", data);

//           setClinics(data.clinics || []);
//           toast.success("Clinics found!");
//         } catch (err) {
//           toast.error("Error fetching clinics.");
//           console.error(err);
//         }
//       },
//       (error) => {
//         toast.error("Failed to get your location.");
//         console.error(error);
//       }
//     );
//   };

//   const resetAnalysis = () => {
//     setInput({
//       image: null,
//       imagePreview: null,
//       textDescription: ''
//     });
//     setSelectedConcerns([]);
//     setResult(null);
//     setFinalTreatment('');
//     setFollowUpAnswers({});
//     setClinics([]);
//     setUserLocation(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
//       <Toaster position="top-right" />

//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
//         <div className="p-6">
//           <h1 className="text-lg text-black font-bold mb-4">
//             Comprehensive Skin Concern Analysis
//           </h1>

//           {/* Image Upload/Camera Section */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Image Input */}
//             <div>
//               <h2 className="text-lg text-black font-bold mb-4">Upload Image or Take Photo</h2>
//               <div className="space-y-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="file-upload"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition"
//                 >
//                   {input.imagePreview ? (
//                     <img
//                       src={input.imagePreview}
//                       alt="Preview"
//                       className="mx-auto max-h-64 object-contain rounded-lg"
//                     />
//                   ) : (
//                     <div className="text-gray-500">Click to Upload Image</div>
//                   )}
//                 </label>

//                 <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
//                   <video
//                     ref={videoRef}
//                     className="w-full h-48 object-cover"
//                     playsInline
//                     autoPlay
//                   />
//                   <canvas ref={canvasRef} className="hidden" />
//                 </div>
//                 <button
//                   onClick={startCamera}
//                   className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-2"
//                 >
//                   Open Camera
//                 </button>
//                 <button
//                   onClick={capturePhoto}
//                   className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mt-2"
//                 >
//                   Capture Photo
//                 </button>
//               </div>
//             </div>

//             {/* Description and Concerns */}
//             <div>
//               <h2 className="text-lg text-black font-bold mb-4">Describe Your Skin Concern</h2>
//               <textarea
//                 placeholder="Provide detailed information about your skin condition..."
//                 value={input.textDescription}
//                 onChange={(e) =>
//                   setInput(prev => ({
//                     ...prev,
//                     textDescription: e.target.value
//                   }))
//                 }
//                 className="w-full p-4 border-2 border-gray-300 rounded-lg min-h-[200px] mb-4 focus:border-blue-500 transition"
//               />
//               <div>
//                 <p className="text-sm text-black font-bold mb-2">Select any additional concerns:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {PREDEFINED_CONCERNS.map((concern) => (
//                     <button
//                       key={concern}
//                       onClick={() => toggleConcern(concern)}
//                       className={`px-3 py-1 rounded-full text-sm transition ${
//                         selectedConcerns.includes(concern)
//                           ? 'bg-blue-500 text-white'
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       {concern}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Analysis Button */}
//           <div className="mt-6">
//             <button
//               onClick={handleAnalysis}
//               disabled={isAnalyzing || (!input.image && !input.textDescription)}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isAnalyzing ? 'Analyzing...' : 'Get Analysis'}
//             </button>
//           </div>

//           {/* Results Section */}
//           {result && (
//             <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 Analysis Results
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-2">Detected Condition</h3>
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <p className="text-xl font-bold text-blue-700">{result.condition}</p>
//                     <div className="mt-2">
//                       <span className="font-medium">Confidence:</span>{' '}
//                       <span className={
//                         result.confidence > 80 ? 'text-green-600' :
//                         result.confidence > 50 ? 'text-yellow-600' :
//                         'text-red-600'
//                       }>
//                         {result.confidence}%
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-2">Severity</h3>
//                   <div className={`p-4 rounded-lg ${
//                     result.severity === 'High' ? 'bg-red-50 text-red-700' :
//                     result.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
//                     'bg-green-50 text-green-700'
//                   }`}>
//                     <p className="font-bold">{result.severity} Severity</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Description</h3>
//                 <p className="text-gray-700">{result.description}</p>
//               </div>

//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
//                 <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
//                   {result.recommendations.map((rec, index) => (
//                     <li key={index} className="text-gray-700">{rec}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Follow-up Questions */}
//               {result.followUpQuestions && result.followUpQuestions.length > 0 && (
//                 <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-2">Follow-up Questions</h3>
//                   {result.followUpQuestions.map((question, index) => (
//                     <div key={index} className="mb-2">
//                       <p className="text-gray-700 font-medium">{question}</p>
//                       <input
//                         type="text"
//                         className="w-full border p-2 rounded-lg"
//                         value={followUpAnswers[question] || ""}
//                         onChange={(e) =>
//                           setFollowUpAnswers({
//                             ...followUpAnswers,
//                             [question]: e.target.value
//                           })
//                         }
//                       />
//                     </div>
//                   ))}
//                   <button
//                     onClick={handleFollowUpSubmit}
//                     className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg"
//                   >
//                     Submit Answers
//                   </button>
//                 </div>
//               )}

//               {/* Final Treatment Plan */}
//               {finalTreatment && (
//                 <div className="mt-6 p-4 bg-green-50 rounded-lg">
//                   <h2 className="text-lg font-semibold">Final Treatment Plan</h2>
//                   <p className="text-gray-700 whitespace-pre-line">{finalTreatment}</p>
//                 </div>
//               )}

//               <div className="mt-6 flex space-x-4">
//                 <button
//                   onClick={resetAnalysis}
//                   className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition"
//                 >
//                   New Analysis
//                 </button>
//                 <button
//                   onClick={() => {/* Save to history functionality */}}
//                   className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
//                 >
//                   Save Results
//                 </button>
//               </div>

//               {/* Clinics Map Section */}
//               <div className="mt-6">
//                 <button
//                   onClick={handleFindClinics}
//                   className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
//                 >
//                   Find Nearby Clinics
//                 </button>

//                 {/* Always show map if userLocation is set */}
//                 {userLocation ? (
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold mb-2">Nearby Clinics</h3>
//                     <ClinicsMap clinics={clinics} center={userLocation} />
//                   </div>
//                 ) : (
//                   <p className="mt-4 text-gray-600">
//                     Location not set. Click "Find Nearby Clinics" to allow geolocation.
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

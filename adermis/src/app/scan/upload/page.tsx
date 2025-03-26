'use client';

import React, { useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { useSkinAnalysis } from '../context/SkinAnalysisContext';
import { FaCamera, FaUpload, FaArrowRight, FaRegLightbulb, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PREDEFINED_CONCERNS = [
  "Persistent redness",
  "Itching or burning sensation",
  "Dry, scaly patches",
  "Bumps or blisters",
  "Changes in skin color",
  "Unusual moles or growths",
  "Sudden skin sensitivity"
];

export default function UploadPage() {
  const { input, setInput } = useSkinAnalysis();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setIsCameraActive(true);
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment'
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    } catch (err) {
      toast.error('Camera access denied. Please check permissions.');
      console.error(err);
      setIsCameraActive(false);
    }
  }, []);

  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        toast.error('Camera not ready. Please try again.');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Update context state
      setInput(prev => ({ ...prev, imagePreview: dataUrl }));

      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
          setInput(prev => ({ ...prev, image: file }));
          toast.success('Photo captured successfully!');
        })
        .catch(err => {
          toast.error('Failed to process image');
          console.error(err);
        });

      // Stop camera
      const stream = video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    } else {
      toast.error('Camera or canvas not available');
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string
        }));
        toast.success('Image uploaded successfully!');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle concern
  const toggleConcern = (concern: string) => {
    setInput(prev => {
      const selectedConcerns = prev.selectedConcerns || [];
      return {
        ...prev,
        selectedConcerns: selectedConcerns.includes(concern)
          ? selectedConcerns.filter(c => c !== concern)
          : [...selectedConcerns, concern]
      };
    });
  };

  // Navigate to analysis page
  const goToAnalysis = () => {
    router.push('/scan/analysis');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex items-center justify-center p-6 relative">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/5 w-64 h-64 rounded-full bg-blue-200 opacity-30 blur-xl"></div>
        <div className="absolute top-2/3 left-1/5 w-72 h-72 rounded-full bg-sky-200 opacity-30 blur-xl"></div>
      </div>

      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#3b82f6',
          color: '#fff',
          fontWeight: '500',
        },
      }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
      >
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 relative">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white text-center"
          >
            AI Skin Analysis <span className="text-white/90 font-light ml-2">• Step 1</span>
          </motion.h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8 bg-blue-50/50">          
          {/* Image Upload Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              whileHover={{ scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              className={`border-2 border-dashed rounded-xl p-6 text-center 
              transition-all duration-300 relative group cursor-pointer
              ${input.imagePreview 
                ? 'border-blue-400 bg-white' 
                : 'border-blue-300 hover:border-blue-500 bg-white'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {input.imagePreview ? (
                <div className="relative">
                  <img
                    src={input.imagePreview}
                    alt="Preview"
                    className="mx-auto max-h-64 object-contain rounded-xl shadow"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1.5 shadow">
                    <FaCheck className="text-xs" />
                  </div>
                </div>
              ) : (
                <div className="py-12">
                  {isUploading ? (
                    <div className="flex items-center justify-center flex-col">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-blue-600 font-medium">Processing...</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUpload className="text-3xl text-blue-500" />
                      </div>
                      <p className="text-gray-800 font-medium text-lg">
                        Click to Upload Image
                      </p>
                      <p className="text-blue-600 text-sm mt-2">JPG, PNG or GIF</p>
                    </>
                  )}
                </div>
              )}
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startCamera}
                className="flex items-center justify-center gap-2 
                bg-blue-500 text-white py-3 rounded-xl 
                shadow-md hover:bg-blue-600 transition"
              >
                <FaCamera /> Open Camera
              </motion.button>
              <motion.button
                whileHover={{ scale: isCameraActive ? 1.02 : 1 }}
                whileTap={{ scale: isCameraActive ? 0.98 : 1 }}
                onClick={capturePhoto}
                disabled={!isCameraActive}
                className={`flex items-center justify-center gap-2 
                py-3 rounded-xl shadow-md transition
                ${isCameraActive 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                Capture Photo
              </motion.button>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-white border border-gray-200">
              <video
                ref={videoRef}
                className={`w-full rounded-xl ${isCameraActive ? 'opacity-100' : 'opacity-70'}`}
                playsInline
                autoPlay
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {isCameraActive && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                  LIVE
                </div>
              )}
            </div>
          </motion.div>

          {/* Description & Concerns Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <textarea
              placeholder="Describe your skin concern in detail..."
              value={input.textDescription}
              onChange={(e) =>
                setInput(prev => ({
                  ...prev,
                  textDescription: e.target.value
                }))
              }
              className="w-full p-4 border-2 border-blue-200 rounded-xl 
              min-h-[250px] focus:border-blue-400 focus:ring-1 focus:ring-blue-300 focus:outline-none
              shadow-inner bg-white text-gray-800"
            />

            <div className="bg-white p-5 rounded-xl shadow border border-blue-100">
              <div className="flex items-center mb-4">
                <FaRegLightbulb className="text-amber-500 mr-2" />
                <p className="text-gray-800 font-semibold">
                  Select Additional Concerns:
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_CONCERNS.map((concern) => (
                  <motion.button
                    key={concern}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleConcern(concern)}
                    className={`px-4 py-2 rounded-full text-sm font-medium
                    transition duration-200 
                    ${input.selectedConcerns?.includes(concern)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {input.selectedConcerns?.includes(concern) && <FaCheck className="inline mr-1 text-xs" />}
                    {concern}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goToAnalysis}
              className="w-full flex items-center justify-center gap-2 
              bg-blue-600 hover:bg-blue-700
              text-white py-4 rounded-xl 
              shadow-lg transition font-semibold text-lg"
            >
              Get Analysis <FaArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
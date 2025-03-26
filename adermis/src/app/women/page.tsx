"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaCommentMedical, FaVideo, FaUserMd, FaPaperPlane, FaPhone, FaMicrophone, FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import Peer, { Instance as PeerInstance } from "simple-peer";

type ConsultationType = "chat" | "video" | null;

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function WomensHealthConsultation() {
  const [consultationType, setConsultationType] = useState<ConsultationType>(null);

  // ----- Chat States -----
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ----- Video Call States -----
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<PeerInstance | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Auto-scroll chat to bottom when new messages come in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ----- Chat Handler -----
  const handleChatSubmit = async () => {
    if (!userInput.trim()) return toast.error("Please enter a question.", {
      style: {
        border: '1px solid #ffb5d1',
        padding: '16px',
        color: '#e83f85',
        background: '#fff5f8'
      },
      iconTheme: {
        primary: '#e83f85',
        secondary: '#FFFAEE',
      },
    });
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { sender: "user", text: userInput, timestamp }]);
    setChatLoading(true);
    const question = userInput;
    setUserInput("");

    try {
      // Using your IP address
      const res = await fetch("http://172.20.10.4:5000/api/health_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (res.ok) {
        const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "ai", text: data.response, timestamp: aiTimestamp }]);
          setChatLoading(false);
        }, 500); // Small delay for more natural conversation flow
      } else {
        toast.error(data.error || "Something went wrong", {
          style: {
            border: '1px solid #ffb5d1',
            padding: '16px',
            color: '#e83f85',
            background: '#fff5f8'
          },
        });
        setChatLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect to server", {
        style: {
          border: '1px solid #ffb5d1',
          padding: '16px',
          color: '#e83f85',
          background: '#fff5f8'
        },
      });
      setChatLoading(false);
    }
  };

  // ----- Video Call Handlers -----
  useEffect(() => {
    if (consultationType === "video") {
      // Connect to your Flask-SocketIO server using your IP
      const s = io("http://172.20.10.4:5000");
      setSocket(s);

      s.on("signal", (data) => {
        if (peerRef.current) {
          peerRef.current.signal(data.signalData);
        }
      });

      s.on("room_joined", (data) => {
        toast.success(data.message, {
          style: {
            border: '1px solid #c3b5ff',
            padding: '16px',
            color: '#7b5df9',
            background: '#f5f3ff'
          },
          iconTheme: {
            primary: '#7b5df9',
            secondary: '#FFFAEE',
          },
        });
      });

      return () => {
        s.disconnect();
      };
    }
  }, [consultationType]);

  const joinVideoRoom = async () => {
    if (!room) {
      return toast.error("Please enter a room name", {
        style: {
          border: '1px solid #c3b5ff',
          padding: '16px',
          color: '#7b5df9',
          background: '#f5f3ff'
        },
      });
    }
    setJoined(true);
    socket?.emit("join", { room });
    await startLocalStream();
  };

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      createPeer(stream, true);
    } catch (err) {
      console.error(err);
      toast.error("Could not access camera/microphone", {
        style: {
          border: '1px solid #c3b5ff',
          padding: '16px',
          color: '#7b5df9',
          background: '#f5f3ff'
        },
      });
    }
  };

  const createPeer = (stream: MediaStream, initiator: boolean) => {
    const peer = new Peer({
      initiator,
      trickle: false,
      stream,
    });

    peer.on("signal", (signalData) => {
      socket?.emit("signal", { room, signalData });
    });

    peer.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
    });

    peerRef.current = peer;
  };
  
  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };
  
  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };
  
  const handleBackButton = () => {
    setConsultationType(null);
    // Clean up resources if needed
    if (consultationType === "video" && socket) {
      socket.disconnect();
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  // ----- Render Consultation Section -----
  const renderConsultationSection = () => {
    if (consultationType === "chat") {
      return (
        <div className="bg-pink-50 p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light text-pink-700 flex items-center">
              <span className="w-1 h-8 bg-pink-500 rounded mr-3"></span>
              AI Health Assistant
            </h2>
            <button 
              onClick={handleBackButton}
              className="border border-pink-300 text-pink-600 px-5 py-2 rounded-full hover:bg-pink-100 transition-colors text-sm font-light"
            >
              Back to Options
            </button>
          </div>
          
          <div className="border border-pink-200 rounded-2xl h-96 overflow-y-auto bg-white mb-6 shadow-inner text-black">
            <div className="p-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                    <FaCommentMedical className="text-3xl text-pink-400" />
                  </div>
                  <p className="text-gray-600 font-light">Start a conversation with our AI Health Assistant</p>
                  <p className="text-xs mt-3 text-gray-400">Your conversation is private and confidential</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-6 ${
                      msg.sender === "user" ? "ml-auto text-right" : "mr-auto"
                    }`}
                  >
                    <div className={`inline-block rounded-2xl px-4 py-3 max-w-xs md:max-w-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                        : "bg-gray-100"
                    }`}>
                      <p className={`text-sm ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}>{msg.text}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">{msg.timestamp}</p>
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="mr-auto">
                  <div className="inline-block rounded-2xl px-4 py-3 bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-pink-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-pink-700 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <div className="flex mt-4">
            <input
              className="flex-grow bg-white border-none rounded-l-full p-4 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
              placeholder="Ask a question about women's health..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
            />
            <button
              onClick={handleChatSubmit}
              disabled={chatLoading}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-r-full shadow-md hover:from-pink-600 hover:to-pink-700 transition-all"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      );
    } else if (consultationType === "video") {
      return (
        <div className="bg-purple-50 p-8 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-light text-purple-700 flex items-center">
              <span className="w-1 h-8 bg-purple-500 rounded mr-3"></span>
              Video Consultation
            </h2>
            <button 
              onClick={handleBackButton}
              className="border border-purple-300 text-purple-600 px-5 py-2 rounded-full hover:bg-purple-100 transition-colors text-sm font-light"
            >
              Back to Options
            </button>
          </div>
          
          {!joined ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg text-center">
                <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <FaVideo className="text-3xl text-purple-500" />
                </div>
                <h3 className="text-2xl font-light text-purple-800 mb-6">Join Virtual Consultation</h3>
                <p className="text-gray-500 mb-8 font-light">Enter a room name to start or join a consultation with a healthcare professional</p>
                <div className="space-y-4">
                  
                <input
  className="w-full bg-purple-50 border-none p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 text-center shadow-inner text-gray-900 black-placeholder"
  placeholder="Enter room code" 
  value={room}
  onChange={(e) => setRoom(e.target.value)}
/>


                  <button
                    onClick={joinVideoRoom}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-full hover:from-purple-600 hover:to-purple-700 transition-all shadow-md"
                  >
                    Join Consultation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></div>
                        <h3 className="font-light">You</h3>
                      </div>
                    </div>
                    <div className="bg-black aspect-video relative overflow-hidden">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {isVideoOff && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center">
                            <FaUserMd className="text-purple-500 text-3xl" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></div>
                        <h3 className="font-light">Healthcare Provider</h3>
                      </div>
                    </div>
                    <div className="bg-black aspect-video relative overflow-hidden">
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {!remoteVideoRef.current?.srcObject && (
                        <div className="absolute inset-0 flex items-center justify-center bg-purple-900 bg-opacity-20 backdrop-blur-sm">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 mx-auto rounded-full bg-purple-200 bg-opacity-30 flex items-center justify-center mb-4">
                              <FaUserMd className="text-white text-3xl" />
                            </div>
                            <p className="font-light">Waiting for provider...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <button 
                  onClick={toggleMute} 
                  className={`rounded-full w-12 h-12 flex items-center justify-center shadow-md ${isMuted ? 'bg-red-500 text-white' : 'bg-white text-purple-600'}`}
                >
                  {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button 
                  className="rounded-full w-12 h-12 bg-red-500 text-white flex items-center justify-center shadow-md"
                  onClick={handleBackButton}
                >
                  <FaPhone className="rotate-225" />
                </button>
                <button 
                  onClick={toggleVideo} 
                  className={`rounded-full w-12 h-12 flex items-center justify-center shadow-md ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white text-purple-600'}`}
                >
                  {isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                </button>
              </div>
              
              <div className="bg-white p-4 rounded-xl text-center shadow-md">
                <p className="text-gray-600 font-light">Room: <span className="font-medium text-purple-700">{room}</span></p>
                <p className="text-xs text-gray-400 mt-1">Share this room code with your healthcare provider</p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Initial selection screen - more elegant version
      return (
        <div className="grid md:grid-cols-2 gap-10 py-12 px-4">
          <div
            onClick={() => setConsultationType("chat")}
            className="group cursor-pointer"
          >
            <div className="bg-white p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 text-center h-full flex flex-col">
              <div className="w-24 h-24 mx-auto bg-pink-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-pink-100 transition-colors duration-300">
                <FaCommentMedical className="text-3xl text-pink-500" />
              </div>
              <h3 className="text-2xl font-light text-pink-800 mb-6">AI Health Chatbot</h3>
              <p className="text-gray-500 mb-8 font-light">Instant, confidential health consultations</p>
              
              <div className="mt-auto">
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <ul className="text-left text-sm text-gray-500 space-y-3 font-light">
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-pink-500 text-xs">✓</span>
                      </div>
                      <span>Immediate answers to health questions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-pink-500 text-xs">✓</span>
                      </div>
                      <span>24/7 availability</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-pink-500 text-xs">✓</span>
                      </div>
                      <span>Private and secure conversations</span>
                    </li>
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 px-6 rounded-full group-hover:from-pink-500 group-hover:to-pink-600 transition-all">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
          
          <div
            onClick={() => setConsultationType("video")}
            className="group cursor-pointer"
          >
            <div className="bg-white p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 text-center h-full flex flex-col">
              <div className="w-24 h-24 mx-auto bg-purple-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-purple-100 transition-colors duration-300">
                <FaVideo className="text-3xl text-purple-500" />
              </div>
              <h3 className="text-2xl font-light text-purple-800 mb-6">Video Consultation</h3>
              <p className="text-gray-500 mb-8 font-light">Live consultation with healthcare professionals</p>
              
              <div className="mt-auto">
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <ul className="text-left text-sm text-gray-500 space-y-3 font-light">
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-purple-500 text-xs">✓</span>
                      </div>
                      <span>Face-to-face virtual appointments</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-purple-500 text-xs">✓</span>
                      </div>
                      <span>Consult with certified specialists</span>
                    </li>
                    <li className="flex items-start">
                      <div className="min-w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-purple-500 text-xs">✓</span>
                      </div>
                      <span>Secure and encrypted connection</span>
                    </li>
                  </ul>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-400 to-purple-500 text-white py-3 px-6 rounded-full group-hover:from-purple-500 group-hover:to-purple-600 transition-all">
                  Start Video Call
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-light text-white flex items-center">
              <FaUserMd className="mr-4" />
              Women's Health Consultation
            </h1>
            <div className="text-white text-sm hidden md:block font-light">
              Secure & Confidential Healthcare Services
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8">{renderConsultationSection()}</div>
      </div>
    </div>
  );
}
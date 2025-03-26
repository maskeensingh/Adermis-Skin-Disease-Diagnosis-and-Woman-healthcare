"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSkinAnalysis } from "../context/SkinAnalysisContext";
import useGoogleMaps from "../../../hooks/useGoogleMaps";

// Define a union type for valid clinic categories
type ClinicCategory = "NGO" | "Government" | "Private" | "User";

interface Clinic {
  category: ClinicCategory; // Now strictly one of the four
  name: string;
  place_id: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  location: {
    lat: number;
    lng: number;
  };
  hours?: string[];
}

interface ClinicsMapProps {
  clinics: Clinic[];
  center: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number };
}

const ClinicsMap: React.FC<ClinicsMapProps> = ({ clinics, center, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Memoize the icons so they don't recreate on every render
  const icons = useMemo(
    () => ({
      NGO: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      Government: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      Private: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      User: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" // User location
    }),
    []
  );

  // Wait for the Google Maps script to load
  const googleMapsLoaded = useGoogleMaps(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

  // Initialize the map once the script is loaded
  useEffect(() => {
    if (googleMapsLoaded && mapRef.current && !map) {
      const initMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
      });
      setMap(initMap);
    }
  }, [googleMapsLoaded, mapRef, map, center]);

  // Update markers whenever clinics or userLocation changes
  useEffect(() => {
    if (map) {
      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for clinics
      clinics.forEach(clinic => {
        const marker = new window.google.maps.Marker({
          position: { lat: clinic.location.lat, lng: clinic.location.lng },
          map: map,
          title: clinic.name,
          // TS now knows clinic.category is one of the keys in icons
          icon: icons[clinic.category] || undefined,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div>
              <strong>${clinic.name}</strong><br/>
              ${clinic.address ? clinic.address + "<br/>" : ""}
              ${clinic.phone ? "Phone: " + clinic.phone + "<br/>" : ""}
              ${clinic.website ? `<a href="${clinic.website}" target="_blank">Website</a><br/>` : ""}
              ${clinic.rating ? "Rating: " + clinic.rating : ""}
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        markersRef.current.push(marker);
      });

      // Add a marker for the user's current location
      if (userLocation) {
        const userMarker = new window.google.maps.Marker({
          position: userLocation,
          map,
          title: "You are here",
          icon: icons.User,
        });

        const userInfoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>You are here</strong></div>`,
        });

        userMarker.addListener("click", () => {
          userInfoWindow.open(map, userMarker);
        });

        markersRef.current.push(userMarker);
      }
    }
  }, [clinics, map, icons, userLocation]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default function ClinicsPage() {
  const { result } = useSkinAnalysis();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleFindClinics = async () => {
    if (!result) {
      toast.error("Please complete analysis to get a disease prediction first.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        console.log("User's current location:", { lat: latitude, lng: longitude });

        try {
          const response = await fetch("http://localhost:5000/api/find_clinics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              disease: result.condition,
              location: { lat: latitude, lng: longitude },
              range: 5,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch clinics");
          }
          const data = await response.json();
          console.log("Clinics data from backend:", data);

          setClinics(data.clinics || []);
          toast.success("Clinics found!");
        } catch (err) {
          toast.error("Error fetching clinics.");
          console.error(err);
        }
      },
      error => {
        toast.error("Failed to get your location.");
        console.error(error);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <h1 className="text-lg text-black font-bold mb-4">Step 3: Nearby Clinics</h1>

        <button
          onClick={handleFindClinics}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Find Nearby Clinics
        </button>

        {userLocation ? (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Nearby Clinics</h3>
            <ClinicsMap clinics={clinics} center={userLocation} userLocation={userLocation} />

            {/* Legend */}
            <div className="mt-4 p-3 border rounded-lg bg-gray-50 flex flex-wrap gap-4 items-center text-sm">
              <div className="flex items-center gap-2">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  alt="NGO"
                  className="w-4 h-4"
                />
                <span>NGO</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  alt="Government"
                  className="w-4 h-4"
                />
                <span>Government</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  alt="Private"
                  className="w-4 h-4"
                />
                <span>Private</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  alt="You"
                  className="w-4 h-4"
                />
                <span>You</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">
            Location not set. Click "Find Nearby Clinics" to allow geolocation.
          </p>
        )}
      </div>
    </div>
  );
}

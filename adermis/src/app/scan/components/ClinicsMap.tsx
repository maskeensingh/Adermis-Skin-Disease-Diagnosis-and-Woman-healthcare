'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function ClinicsMap({
  clinics,
  center
}: {
  clinics: any[];
  center: { lat: number; lng: number };
}) {
  const mapContainerStyle = { width: '100%', height: '400px' };
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="text-red-500 font-semibold">
        No API key found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        {clinics.map((clinic, index) => {
          if (!clinic.location || !clinic.location.lat || !clinic.location.lng) {
            console.warn("Clinic missing lat/lng:", clinic);
            return null;
          }
          return (
            <Marker
              key={index}
              position={{
                lat: clinic.location.lat,
                lng: clinic.location.lng
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

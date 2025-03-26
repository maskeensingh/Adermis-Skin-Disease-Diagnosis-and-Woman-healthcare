// hooks/useGoogleMaps.ts
import { useEffect, useState } from 'react';

const useGoogleMaps = (apiKey: string): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // If already loaded globally, do nothing
    if (typeof window !== 'undefined' && window.google?.maps) {
      setLoaded(true);
      return;
    }

    // Avoid multiple script tags
    if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
      const checkIfLoaded = () => {
        if (window.google?.maps) {
          setLoaded(true);
        } else {
          setTimeout(checkIfLoaded, 100);
        }
      };
      checkIfLoaded();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, [apiKey]);

  return loaded;
};

export default useGoogleMaps;

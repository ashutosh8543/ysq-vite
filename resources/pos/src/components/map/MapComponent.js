import React, {useEffect, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: 'auto',
  height: '50vh'
};

const center = {
  lat: 51.505,
  lng: -0.09
};

const MapComponent = () => {
  const [position, setPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyD52EEFAgh_c5twiZ_f3-i1XJMdz9xPHQ0'
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);
  const handleMapClick = useCallback((event) => {
    setPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={handleMapClick}
      >
        {position && (
          <Marker position={position} />
        )}
      </GoogleMap>
      {position && (
        <div>
          Selected Location: <br />
          Latitude: {position.lat} <br />
          Longitude: {position.lng}
        </div>
      )}
    </div>
  );
};

export default MapComponent;

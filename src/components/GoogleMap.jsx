import React from 'react';
import mapStyles from '../styles/mapStyles';
import { useSelector } from 'react-redux';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

export default function Map() {
  const { startLocation, directions } = useSelector((state) => state.map).value;

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
  };

  const containerStyle = {
    width: '100vw',
    height: '100vh',
  };

  return (
    <GoogleMap
      id="mapContainer"
      mapContainerStyle={containerStyle}
      center={startLocation}
      zoom={15}
      options={options}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#ff00bf',
            },
            preserveViewport: true,
          }}
        />
      )}
    </GoogleMap>
  );
}

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapWithPin = ({ latitude, longitude, locationName }) => {
  const position = [latitude, longitude];
  console.log(latitude, longitude);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '200px', width: '50%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{locationName}</Popup>
      </Marker>
      <div className="pin-label">{locationName}</div>
    </MapContainer>
  );
};

// Example usage with latitude, longitude, and location name

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [askforPermission, setAskForPermission] = useState(true);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={() => getLocation()}>Get Current Location</button>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
      {latitude && longitude && (
        <MapWithPin
          latitude={latitude}
          longitude={longitude}
          locationName={'my-location'}
        />
      )}
    </div>
  );
};

export default LocationComponent;

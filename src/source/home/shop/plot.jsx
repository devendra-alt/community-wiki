import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapWithMultiplePins = ({ locations }) => {
  if (!locations || locations.length === 0) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  const bangaloreLocations = [
    { id: 1, name: 'Bangalore Palace', latitude: 12.9985, longitude: 77.5923 },
    {
      id: 2,
      name: 'Lalbagh Botanical Garden',
      latitude: 12.9507,
      longitude: 77.5848,
    },
    { id: 3, name: 'Cubbon Park', latitude: 12.9767, longitude: 77.5958 },
    {
      id: 4,
      name: 'ISKCON Temple Bangalore',
      latitude: 13.0092,
      longitude: 77.5511,
    },
    { id: 5, name: 'Ulsoor Lake', latitude: 12.9779, longitude: 77.6245 },
    {
      id: 6,
      name: 'Bannerghatta National Park',
      latitude: 12.8,
      longitude: 77.577,
    },
    {
      id: 7,
      name: 'Wonderla Amusement Park',
      latitude: 12.8342,
      longitude: 77.401,
    },
    {
      id: 8,
      name: 'Visvesvaraya Industrial and Technological Museum',
      latitude: 12.9742,
      longitude: 77.5955,
    },
    {
      id: 9,
      name: 'Innovative Film City',
      latitude: 12.7752,
      longitude: 77.4116,
    },
    { id: 10, name: 'Nandi Hills', latitude: 13.3705, longitude: 77.6835 },
    // Add more locations as needed
  ];

  const redIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
  return (
    <MapContainer
      center={[12.9742, 77.5955
      ]}
      zoom={10}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bangaloreLocations?.map(
        (location) =>
          location && (
            <Marker
              key={location.key}
              position={[location.latitude, location.longitude]}
              icon={redIcon}
            >
              <Popup>{location.name}</Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

// Example usage with latitude, longitude, and location name

export default MapWithMultiplePins;

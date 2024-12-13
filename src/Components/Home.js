import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import Images from './Images';

function Home({ userEmail, userName }) {

    const [locations, setLocations] = useState('');

    const customMarker = new L.Icon({
        iconUrl: "/Icons/MapMarker.svg",
        iconSize: [32, 32],
        iconAnchor: [16,32],
        popupAnchor: [0, -32],
    });

    const fetchMaps = useCallback(async () => {
      try {
          const response = await fetch(
              `http://127.0.0.1:8000/location/${userEmail}`
          );
          const data = await response.json();
          setLocations(data);
      } catch (error) {
          console.error("Error al obtener los detalles de mapas:", error);
      }
    }, [userEmail]);

    useEffect(() => {
        fetchMaps();
    }, [fetchMaps])

    const MapComponent = ({ loc }) => {


        return (
            <MapContainer center={["50.3785", "14.9706"]} zoom={3} style={{ height: '400px', width: '50%', border: '1px solid red' }}>
              {/* Add OpenStreetMap tiles */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Add a Marker to show the location */}

                <Marker position={["50.3785" , "14.9706"]} icon={customMarker}>
                  <Popup>
                    <span>Marker</span>
                  </Popup>
                </Marker>

            </MapContainer>
          );
    };

    return (
        <div>
            <h2>Mapa de {userName}</h2>
            <MapComponent loc={locations} />
            <Images userEmail={userEmail}/>
        </div>
    );
}

export default Home;
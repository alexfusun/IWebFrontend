import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

function Maps({ userEmail }) {

    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [locationList, setLocationList] = useState([]);

    const customMarker = new L.Icon({
        iconUrl: "/Icons/MapMarker.svg",
        iconSize: [32, 32],
        iconAnchor: [16,32],
        popupAnchor: [0, -32],
    });

    const handleInputChange = (event) => {
        setLocation(event.target.value);
    }

    const handleSearchLocation = async () => {
        let params = "";

        try {
            // Construct the URL with query parameters using URLSearchParams
            params = new URLSearchParams({
              q: location,
              format: 'json',
              addressdetails: '1', // Optional: includes address details in the response
            });
        } catch(error) {
            console.error("Error:", error);
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'iwebparcial-alexfu/1.0 alexfusun@gmail.com',
                },
            });

            if (!response.ok) {
                throw new Error('Respuesta del servidor no valida');
              }

            const responseJSON = await response.json();
            const location = responseJSON[0];
            
            setLocationList(responseJSON);
            setLatitude(location.lat);
            setLongitude(location.lon);
            setLocationName(location.display_name);

        } catch(error) {
            console.error("Error:", error);
        }
    }

    const handleChangeLocation = (lat, lon, name) => {
        setLatitude(lat);
        setLongitude(lon);
        setLocationName(name);
    }

    const handleSaveLocation = async () => {
        const data = {
            latitude: latitude,
            longitude: longitude,
            name: locationName,
            user: userEmail,
        }

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/location`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                }
            );
        } catch(error) {
            console.error("Error:", error);
        }
    }

    const MapComponent = ({ lat, lon, name}) => {
        if (!lat || !lon) {
            return <div>Cargando mapa...</div>
        }


        return (
            <MapContainer center={[lat, lon]} zoom={13} style={{ height: '400px', width: '50%', border: '1px solid red' }}>
              {/* Add OpenStreetMap tiles */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Add a Marker to show the location */}
              <Marker position={[lat, lon]} icon={customMarker}>
                <Popup>
                  <span>{name}</span>
                </Popup>
              </Marker>
            </MapContainer>
          );
    };

    return (
        <div>
            <h2>Añadir ubicación a mi mapa</h2>

            Ubicación:
                <input 
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                    placeholder="Introduce ubicación...">
                </input>
                <button onClick={handleSearchLocation}>Buscar</button>

                <div>
                    {locationList.length > 0 ? (
                    <ul>
                        {locationList.map((location) => (
                        <li key={location.place_id}>
                            <button onClick={() => handleChangeLocation(location.lat, location.lon, location.display_name)}>
                                {location.display_name}
                            </button>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p>Ninguna ubicación encontrada</p>
                    )}
                </div>

            {latitude && longitude && (
                <div>
                    <MapComponent lat={latitude} lon={longitude} name={locationName} />
                    <button onClick={handleSaveLocation}>Añadir</button>
                </div>    
            )}
        </div>
    );
}

export default Maps;
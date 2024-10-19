import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for congestion levels
const getIconColor = (level) => {
    if (level > 0.7) return 'red'; // High congestion
    if (level > 0.3) return 'yellow'; // Medium congestion
    return 'green'; // Low congestion
};

const MapView = () => {
    const [trafficData, setTrafficData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/congestion'); // No limit specified
                const apiData = response.data;

                // Set the fetched data to the state
                setTrafficData(apiData);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching traffic data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading traffic data...</div>;
    }

    return (
        <MapContainer center={[28.6139, 77.2090]} zoom={12} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {trafficData.map((data, index) => {
                const { congestion_level, latitude, longitude, location } = data;
                const color = getIconColor(congestion_level); // Use the congestion level directly
                const icon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
                    iconSize: [20, 20],
                });

                return (
                    latitude && longitude && (
                        <Marker key={index} position={[latitude, longitude]} icon={icon}>
                            <Popup>
                                <span>Location: {location}</span><br />
                                <span>Congestion Level: {Math.round(congestion_level * 100)}%</span> {/* Display as percentage */}
                            </Popup>
                        </Marker>
                    )
                );
            })}
        </MapContainer>
    );
};

export default MapView;

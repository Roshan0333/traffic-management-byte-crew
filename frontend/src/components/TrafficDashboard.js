import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './MapView';
import ControlPanel from './ControlPanel';
import Alerts from './Alerts';
import '../styles/TrafficDashboard.css';

function TrafficDashboard() {
    const [trafficPredictions, setTrafficPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [minLat, setMinLat] = useState(27.5); // Set your desired min latitude
    const [maxLat, setMaxLat] = useState(27.6); // Set your desired max latitude
    const [minLng, setMinLng] = useState(-48.2); // Set your desired min longitude
    const [maxLng, setMaxLng] = useState(-48.1); // Set your desired max longitude

    useEffect(() => {
        const fetchTrafficPredictions = async () => {
            try {
                const response = await axios.get('/api/congestion', {
                    params: { minLat, maxLat, minLng, maxLng },
                });
                setTrafficPredictions(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching traffic predictions:', error);
                setIsLoading(false);
            }
        };

        fetchTrafficPredictions();
    }, [minLat, maxLat, minLng, maxLng]);

    if (isLoading) {
        return <div className="loading">Loading traffic data...</div>;
    }

    return (
        <div className="traffic-dashboard">
            <h1>Smart Traffic Management Dashboard</h1>
            <MapView trafficData={trafficPredictions} />
            <ControlPanel />
            <Alerts trafficData={trafficPredictions} />
        </div>
    );
}

export default TrafficDashboard;

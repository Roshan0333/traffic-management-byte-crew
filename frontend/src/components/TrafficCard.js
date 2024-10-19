import React from 'react';
import '../styles/TrafficCard.css';

const TrafficCard = ({ location, congestionLevel }) => {
    return (
        <div className={`traffic-card ${congestionLevel.toLowerCase()}`}>
            <h3>{location}</h3>
            <p>Congestion Level: <strong>{congestionLevel}</strong></p>
        </div>
    );
};

export default TrafficCard;

import { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '340px',
};

const defaultCenter = {
    lat: 26.8524588, // Default Lat
    lng: 81.0202533  // Default Lng
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (err) => {
                    setError("Unable to retrieve your location.");
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        };

        updatePosition();
        const intervalId = setInterval(updatePosition, 5000);

        return () => clearInterval(intervalId); 
    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <MarkerF position={currentPosition} />
            </GoogleMap>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </LoadScript>
    );
};

export default LiveTracking;

// VolcanoDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API_URL from './config';
import MyMap from './MyMap';
import NavigationTabs from './navigationtabs';
import MyChart from './MyChart';
function VolcanoDetails() {
  const { id } = useParams();
  const [volcanoDetails, setVolcanoDetails] = useState(null);
  const [showPopulationChart, setShowPopulationChart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchVolcanoDetails();
    checkLoggedIn();
  }, []);

  const fetchVolcanoDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await fetch(`${API_URL}/volcano/${id}`, { headers });
      const data = await response.json();
      setVolcanoDetails(data);
    } catch (error) {
      console.error('Error fetching volcano details:', error);
    }
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Check if token exists
  };

  if (!volcanoDetails) {
    return <div>Loading volcano details...</div>;
  }

  const handleViewPopulationChart = () => {
    if (!isLoggedIn) {
      alert('You need to be logged in to view the chart.');
    } else {
      setShowPopulationChart(true);
    }
  };

  return (
    <div>
      <NavigationTabs />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h2>{volcanoDetails.name}</h2>
          <p>Country: {volcanoDetails.country}</p>
          <p>Region: {volcanoDetails.region}</p>
          <p>Subregion: {volcanoDetails.subregion}</p>
          <p>Last Eruption: {volcanoDetails.last_eruption}</p>
          <p>Summit: {volcanoDetails.summit}</p>
          <p>Elevation: {volcanoDetails.elevation}</p>
          <p>Latitude: {volcanoDetails.latitude}</p>
          <p>Longitude: {volcanoDetails.longitude}</p>
          {!showPopulationChart && (
            <button onClick={handleViewPopulationChart}>View Population Chart</button>
          )}
          {showPopulationChart && (
            // Render population chart component here
            <MyChart populationData={volcanoDetails} />
          )}
        </div>
        <div style={{ flex: '1' }}>
          <MyMap latitude={parseFloat(volcanoDetails.latitude)} longitude={parseFloat(volcanoDetails.longitude)} />
        </div>
      </div>
    </div>
  );
}

export default VolcanoDetails;

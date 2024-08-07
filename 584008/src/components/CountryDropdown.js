import React, { useState, useEffect } from 'react';
import API_URL from './config';

function CountryDropdown({ setSelectedCountry }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/countries`);
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching countries');
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  if (loading) {
    return <div>Loading countries...</div>;
  }

  if (error) {
    return <div>Error fetching countries. Please try again later.</div>;
  }

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountryDropdown;

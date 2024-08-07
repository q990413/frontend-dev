// VolcanoList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryDropdown from './CountryDropdown';
import MyGrid from './MyGrid';
import NavigationTabs from './navigationtabs';
function VolcanoList() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const navigate = useNavigate();

  const handleVolcanoSelect = (id) => {
    navigate(`/volcano/${id}`);
  };

  return (
    <div>
      <NavigationTabs />
      <h2>Volcano List</h2>
      <CountryDropdown setSelectedCountry={setSelectedCountry} />
      {selectedCountry && <MyGrid selectedCountry={selectedCountry} onVolcanoSelect={handleVolcanoSelect} />}
    </div>
  );
}

export default VolcanoList;

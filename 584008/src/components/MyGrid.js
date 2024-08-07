// MyGrid.js
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import API_URL from './config';
import { Link } from 'react-router-dom';

function MyGrid({ selectedCountry, onVolcanoSelect }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      fetchVolcanoes(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchVolcanoes = async (country) => {
    try {
      const response = await fetch(`${API_URL}/volcanoes?country=${country}`);
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error('Error fetching volcanoes:', error);
    }
  };

  const columnDefs = [
    { headerName: 'ID', field: 'id' },
    { headerName: 'Name', field: 'name', cellRendererFramework: VolcanoNameRenderer },
    { headerName: 'Country', field: 'country' },
    { headerName: 'Region', field: 'region' },
    { headerName: 'Subregion', field: 'subregion' }
  ];

  const onRowClicked = (event) => {
    const volcanoId = event.data.id;
    onVolcanoSelect(volcanoId);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}

const VolcanoNameRenderer = ({ value }) => (
  <Link to={`/volcano/${value}`}>{value}</Link>
);

export default MyGrid;

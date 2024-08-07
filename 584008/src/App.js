import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import VolcanoList from './components/volcanolist';
import VolcanoDetails from './components/VolcanoDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VolcanoList" element={<VolcanoList />} />
        <Route path="/volcano/:id" element={<VolcanoDetails />} />



      </Routes>
    </Router>
  );
}

export default App;
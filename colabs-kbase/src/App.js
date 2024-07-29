import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Banner from './componentes/Banner/Banner';
import Dashboard from './componentes/Dashboard';
import ColaboradoresPage from './pages/Colaboradores.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <Routes>
          <Route  path="/" element={<Dashboard/>} />
          <Route path="/colaboradores" element={<ColaboradoresPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

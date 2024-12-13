import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import About from './Components/About';
import Maps from './Components/Maps';
import Images from './Components/Images';

function App() {
  return (
    <div className="App">
      <Login />
      <Router>
        <div>
          <nav className='navbar'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Informacion</Link></li>
              <li><Link to="/maps">Mapas</Link></li>
              <li><Link to="/images">Fotos</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="images" element={<Images/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

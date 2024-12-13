import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { signInWithGoogle, logout } from './Firebase/firebase';
import { auth, onAuthStateChanged } from './Firebase/firebase-config';

import Home from './Components/Home';
import Maps from './Components/Maps';

import './App.css';
import './Styles/Login.css';

function App() {
  //Login
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
              setUser(currentUser);
          } else {
              setUser(null);
          }
      });

      return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
      const loggedInUser = await signInWithGoogle();
      setUser(loggedInUser);
  };

  const handleLogout = async () => {
      await logout();
      setUser(null);
  }

  return (
    <div className="App">
      <h1>Plantilla IWeb</h1>
          {user ? (
            <div>
              <div className='header'>
                <div className='user'>
                    <h2>{user.displayName}</h2>
                    <img src={user.photoURL} alt={user.displayName} />
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
              </div> 
              <Router>
                  <nav className='navbar'>
                    <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/maps">Mapas</Link></li>
                    </ul>
                  </nav>
    
                <Routes>
                  <Route path="/" element={<Home userEmail={user.email} userName={user.displayName} />} />
                  <Route path="/maps" element={<Maps userEmail={user.email} />} />
                </Routes>
              </Router>  
            </div>
            ) : (
            <div className='login'>
                <h2>Login</h2>
                <button onClick={handleLogin}>Iniciar sesión con Google</button>
            </div>
      )}
    </div>
  );
}

export default App;

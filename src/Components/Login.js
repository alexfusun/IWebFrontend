import React, { useEffect, useState } from 'react';
import { signInWithGoogle, logout } from '../Firebase/firebase';
import { auth, onAuthStateChanged } from '../Firebase/firebase-config';
import '../Styles/Login.css';

function Login() {
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
        <div className='header'>
            <h1>Plantilla IWeb</h1>
            {user ? (
                <div className='user'>
                    <h2>{user.displayName}</h2>
                    <img src={user.photoURL} alt={user.displayName} />
                    <button onClick={handleLogout}>Cerrar sesión</button>
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

export default Login
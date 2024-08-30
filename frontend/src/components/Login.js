// src/components/Login.js
import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './formStyles.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });
            localStorage.setItem('token', data.token);
            setError('');
            // Redirect to dashboard or home after successful login
            window.location.href = '/dashboard'; // Redirecciona a la página del dashboard después del login
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

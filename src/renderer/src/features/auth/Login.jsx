
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const result = await window.api.auth.login({ username, password });

            if (result.success) {
                console.log('Login success:', result.user);
                login(result.user);
                navigate('/'); // Redirect to Dashboard
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Please enter your details to sign in.</p>
            </div>

            {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-actions">
                    <label className="remember-me">
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-password">
                        Forgot Password?
                    </Link>
                </div>

                <button type="submit" className="auth-button">
                    Sign in
                </button>
            </form>

            <div className="auth-footer">
                <p>
                    Don't have an account?
                    <Link to="/register" className="auth-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

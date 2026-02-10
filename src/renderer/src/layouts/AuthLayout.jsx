
import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-branding">
                    <h1>Sellora</h1>
                    <p>Manage your business with ease.</p>
                </div>
                <div className="auth-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;

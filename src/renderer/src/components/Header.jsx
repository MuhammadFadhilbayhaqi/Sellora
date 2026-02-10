
import React, { useState } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ title = "Dashboard" }) => {
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowDropdown(false);
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="page-title">{title}</h1>
            </div>

            <div className="header-right">
                <button className="notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <div className="user-profile-container">
                    <div
                        className="user-profile"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="avatar">{user?.fullName?.charAt(0) || 'U'}</div>
                        <div className="user-info">
                            <span className="user-name">{user?.fullName || 'User'}</span>
                            <span className="user-role">{user?.role || 'Guest'}</span>
                        </div>
                        <ChevronDown size={16} color="#64748b" />
                    </div>

                    {showDropdown && (
                        <div className="profile-dropdown">
                            <button className="dropdown-item logout" onClick={handleLogoutClick}>
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showLogoutConfirm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={cancelLogout}>Cancel</button>
                            <button className="btn-confirm" onClick={confirmLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

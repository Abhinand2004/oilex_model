import React from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSellItemClick = () => {
        if (token) {
            navigate("/sell");
        } else {
            navigate("/login");
        }
    };

    const handleProfileClick = () => {
        if (token) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-category">
                <select>
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                </select>
            </div>
            <div className="navbar-logo">
                <img src="/path/to/logo.png" alt="Logo" />
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="navbar-buttons">
                <button className="sell-button" onClick={handleSellItemClick}>Sell Item</button>
                {token && (
                    <button className="profile-button" onClick={handleProfileClick}>
                        <img src="https://via.placeholder.com/40" alt="Profile" />
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Nav;

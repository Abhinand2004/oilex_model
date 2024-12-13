import React from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";

const Nav = ({user,setFilter,image,filter,setName}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSellItemClick = () => {
        if (token) {
            navigate("/sell");
        } else {
            navigate("/login");
        }
    };
    const handleChange = (event) => { 
         const value = event.target.value; 
         setFilter(value === "all" ? "" : value);
        
        };
    const handleProfileClick = () => {
        if (token) {
            navigate("/profile");
        } else {
            navigate("/login");
        }
    };


// console.log(user);
const msg=()=>{
    navigate("/notification")
}

    return (
        <nav className="navbar">
            <div className="navbar-category">
                <select value={filter} onChange={handleChange}>
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                        <option value="phone">SmartPhone</option>
                        <option value="telivision">Telivision</option>
                        <option value="computer">Computer</option>
                        <option value="fashion">Fashion</option>
                        <option value="pants">Pants</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="car">car</option>
                        <option value="two_weeler">Two_weeler</option>
                        <option value="home">Home</option>
                        <option value="toys">Toys</option>
                        <option value="sports">Sports</option>
                </select>
            </div>
            <div className="navbar-logo">
                <img src="/path/to/logo.png" alt="Logo" />
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Search..." onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <h3>{user}</h3>
            </div>
            <div className="navbar-buttons">
                <button className="sell-button" onClick={handleSellItemClick}>Sell Item</button>
                {token && (
                    <button className="profile-button" onClick={handleProfileClick}>
                        <img src={image || "https://via.placeholder.com/40"} alt="Profile" />
                    </button>
                )}
            </div>
            <div onClick={msg}>✉</div>
        </nav>
    );
};

export default Nav;

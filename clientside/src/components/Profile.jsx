import React, { useState, useEffect } from "react";
import "./profile.css";

const Profile = () => {
    // Sample data, you might fetch this from your API
    const [profile, setProfile] = useState({
        profilePhoto: "https://via.placeholder.com/150",
       
    });

    const [products, setProducts] = useState([
        
    ]);

    const handleAddProduct = () => {
        // Handle adding product logic here
        alert("Add Product button clicked");
    };

    return (
        <div className="profile-page-container">
            <div className="profile-details">
                <img src={profile.profilePhoto} alt="Profile" className="profile-photo" />
                <p><strong>Username:</strong> profilename</p>
                <p><strong>Email:</strong> email</p>
                <p><strong>Phone Number:</strong> number</p>
                <p><strong>District:</strong>sidtrict</p>
                <p><strong>City:</strong> city</p>
                <p><strong>Address:</strong> address</p>
                <p><strong>Pincode:</strong> pincode</p>
            </div>
            <div className="products-section">
                <h2>Your Products</h2>
                <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
                <div className="products-grid">
                    {products.map((product, index) => (
                        <img key={index} src={product} alt={`Product ${index + 1}`} className="product-image" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;

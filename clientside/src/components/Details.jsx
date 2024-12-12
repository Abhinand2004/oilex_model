import React, { useEffect, useState } from "react";
import "./details.css"; // Add your styles in this CSS file
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UniqueProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        productName: "",
        images: [],
        category: "",
        description: "",
        price: "",
    });

    const fetchProductDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/productdetails/${id}`);
            if (res.status === 200) {
                setProduct(res.data.userdata);
            } else {
                alert("Error fetching product details");
            }
        } catch (error) {
            alert(error);
        }
    };

    const deleteData = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/deleteproduct/${id}`);
            if (res.status === 200) {
                alert("Successfully deleted");
                navigate("/profile");
            } else {
                alert("Error deleting product");
            }
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    return (
        <div className="unique-product-details-container">
            <h1 className="unique-product-name">{product.productName}</h1>
            <div className="unique-images-container">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="unique-product-image"
                    />
                ))}
            </div>
            <div className="unique-product-info">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> {product.price}</p>
            </div>
            <div className="unique-action-buttons">
                <Link to={`/edit/${id}`}>
                    <button className="unique-edit-button">Edit</button>
                </Link>
                <button className="unique-delete-button" onClick={deleteData}>Delete</button>
                <Link to="/">
                    <button className="unique-home-button">Home</button>
                </Link>
            </div>
        </div>
    );
};

export default UniqueProductDetails;
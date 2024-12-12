import React, { useState, useEffect } from "react";
import "./message.css"; // Add your styles in this CSS file
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Message = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    productName: "",
    images: [],
    category: "",
    description: "",
    price: "",
  });

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    productName: "",
    productId: id,
  });

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/productdetails/${id}`);
      if (res.status === 200) {
        setProduct(res.data.userdata);
        setFormData((prevFormData) => ({
          ...prevFormData,
          productName: res.data.userdata.productName,
        }));
      } else {
        alert("Error fetching product details");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:3000/api/message/${id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        alert("Message sent successfully!");
    navigate("/")
      } else {
        alert("Error sending message");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div className="unique-message-container">
      <h1 className="unique-message-header">{product.productName}</h1>
      <form className="unique-message-form" onSubmit={handleSubmit}>
        <div className="unique-form-section">
          <img
            src={product.images[0] || "https://via.placeholder.com/300"}
            alt="Product"
            className="unique-product-image"
          />
        </div>

        <div className="unique-form-section">
          <label htmlFor="description" className="unique-label">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description..."
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="unique-textarea"
          ></textarea>
        </div>

        <div className="unique-form-section">
          <label htmlFor="price" className="unique-label">Amount:</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter the amount..."
            value={formData.price}
            onChange={handleInputChange}
            className="unique-input"
          />
        </div>

        <div className="unique-form-section unique-button-container">
          <button type="submit" className="unique-confirm-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Message;

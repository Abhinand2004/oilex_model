import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pwd: "",
    cpwd: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    district: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    const { username, email, pwd, cpwd, address, city, pincode, phone, district } = formData;
    if (!username || !email || !pwd || !cpwd || !address || !city || !pincode || !phone || !district) {
      setError("All fields are required.");
      return;
    }

    if (pwd !== cpwd) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/register", formData);

      if (res.status === 200) {
        alert(res.data.msg);
        navigate("/login");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "An error occurred during registration.";
      setError(errorMsg);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="pwd"
            value={formData.pwd}
            required
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpwd"
            value={formData.cpwd}
            required
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

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
    if (!formData.username || !formData.email || !formData.pwd || !formData.cpwd) {
      setError("All fields are required.");
      return;
    }

    if (formData.pwd !== formData.cpwd) {
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
      // Extract error message from the server response
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
            autoComplete="username"
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
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
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

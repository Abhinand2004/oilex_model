import React, { useState } from "react";
import "./verify.css";
import axios  from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Verifyemail = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res=await axios.post("http://localhost:3000/api/verifyemail",{email})
        if (res.status==200) {
            localStorage.setItem("email", email);
            alert ("email verification  sented to your inbox")
        }
        else{
            alert("email already exist")
        }
    } catch (error) {
        alert("error while fetching")
    }
  };
// console.log(email);

  return (
    <div className="verify-email-container">
      <div className="verify-email-box">
        <h2>Email Verification</h2>
        <p>Please enter your email address and click the button below to verify your email.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="verify-button">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verifyemail;

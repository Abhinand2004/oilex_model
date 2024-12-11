import React from "react";
import "./login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
      });

      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };    
    const login=async(e)=>{
        e.preventDefault();
        try {
          const res=await axios.post('http://localhost:3000/api/login',formData)
        if(res.status==200){  
          alert("you logined")
          console.log(res.data.token);
          localStorage.removeItem("email")
          localStorage.setItem('token',res.data.token)
          navigate("/")
    
            
        }
        else{
            alert(res.msg)
        }
        } catch (error) {
         alert("invalid username or password")
          
        }
    }
    console.log(formData);
    
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email}  onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="pass" value={formData.pass}  onChange={handleChange} required />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="extra-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/verify">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import "./profile.css";


const Profile = () => {
    const navigate=useNavigate()
    const [productData,setProductData]=useState([])
    const [profile, setProfile] = useState({});

    const handleAddProduct = () => {
        navigate("/sell")    
    };
const fetchUserdata=async()=>{
try {
    const res=await axios.get("http://localhost:3000/api/displayuser",{
        headers:{Authorization:`Barear ${localStorage.getItem("token")}`}
    })
    if (res.status==200) {
       
        console.log(res.data.user_id.username);
        setProfile(res.data.user_id)
    }else{
        alert("error")
    }
} catch (error) {
    alert(error)
}
}
const fetchProduct= async()=>{
    try {
        const res=await axios.get("http://localhost:3000/api/displayimages",{
            headers:{Authorization:`Barear ${localStorage.getItem("token")}`}
        })
        if (res.status==200) {
            setProductData(res.data.userdata)
            console.log(res.data.userdata);
            
        }else{
            alert("error")
        }
    } catch (error) {
        alert(error)
    }
}
const logout=()=>{

    localStorage.removeItem("token")
    navigate("/login")
}
const deleteaccount=async(e)=>{
try {
    const res=await  axios.delete("http://localhost:3000/api/deleteaccount",{
        headers:{Authorization:`Barear ${localStorage.getItem("token")}`}
    })
    if (res.status==200) {
        localStorage.removeItem("token")
      alert("your accound deleted")  
      navigate("/login")
    }else{
        alert("failed to delte the account")
    }
} catch (error) {
   alert("failde to fetch") 
}
}
useEffect(()=>{
    fetchProduct()
    fetchUserdata()
},[])

    return (
        <div className="profile-page-container">
            <div className="profile-details">
                <img src={profile.images || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone Number:</strong> {profile.phone}</p>
                <p><strong>District:</strong>{profile.district}</p>
                <p><strong>City:</strong> {profile.city}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Pincode:</strong> {profile.pincode}</p>
           <div>
           <button onClick={deleteaccount} >Delete Account</button>
           <button onClick={logout}>Logout</button>
           </div>
            </div>
            <div className="products-section">
                <h2>Your Products</h2>
                <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
                <div className="products-grid">
                {
                    productData.map((image,index)=>(
                        <Link to={`/details/${image._id}`} key={index}  >
                        <img src={image.images[0]} className="product-image" alt="" />
                        
                        </Link>
                    ))
                }
                </div>
                <Link  to={"/"}>
                <button>Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Profile;

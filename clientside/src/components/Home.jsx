import React, { useEffect, useState } from "react";
import "./home.css"
import axios  from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Home=({setUser,filter,setimage,name})=>{
  const navigate=useNavigate()
const [products,setProducts]=useState([])
    const userdatasfornav= async()=>{
      try {
        const res=await axios.get("http://localhost:3000/api/displayuser",{
            headers:{Authorization:`Barear ${localStorage.getItem("token")}`}
        })
        if (res.status==200) {
            setUser(res.data.user_id.username)
            setimage(res.data.user_id.images)
            console.log(res.data.user_id.username);
        }else{
            alert("error")
          }
        } catch (error) {
          alert("please login first")
      navigate("/login")
        // alert(error)
    }
    }

    const fetchdatas=async()=>{
        try {
          const res=await axios.get("http://localhost:3000/api/homepage",{
            headers:{Authorization: `Barear ${localStorage.getItem("token")}` }
          })
          if (res.status==200) {
            console.log(res.data.data);
            setProducts(res.data.data)
            
          }
        } catch (error) {
            
        }
    }
    // console.log(products[0].category);
    // console.log(filter);
    
    useEffect(()=>{
      userdatasfornav()
        fetchdatas()
    },[])
    return(
        <div>
            <div className="alldtdatas">
                {
                    products.filter((i)=>i.productName.toLowerCase().includes(name.toLowerCase())). 
            filter((i)=>i.category.toLowerCase().includes(filter.toLowerCase())).map((data,index)=>(
                    <Link to={`/homedetails/${data._id}`} key={index}>
                      <div className="card" >
                       <div className="imagediv">
                           <img src={data.images[0]} className="home_images" />
                       </div>
                       <div className="h3">name:{data.productName} <br /> <small className="category">{data.category}</small></div>
                      </div>  
                   
                    </Link>
                   ))
              
                }
            </div>
        </div>
    )
}
export default Home
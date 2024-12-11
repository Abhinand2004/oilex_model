import React, { useEffect, useState } from "react";
import "./home.css"
import axios  from "axios";
import { Link } from "react-router-dom";
const Home=({setUser})=>{
const [products,setProducts]=useState([])

    const userdatasfornav= async()=>{
      try {
        const res=await axios.get("http://localhost:3000/api/displayuser",{
            headers:{Authorization:`Barear ${localStorage.getItem("token")}`}
        })
        if (res.status==200) {
            setUser(res.data.user_id.username)
            console.log(res.data.user_id.username);
        }else{
            alert("error")
        }
    } catch (error) {
        alert(error)
    }
    }

    const fetchdatas=async()=>{
        try {
          const res=await axios.get("http://localhost:3000/api/homepage",{
            headers:{Authorization: `Barear ${localStorage.getItem("token")}` }
          })
          if (res.status==200) {
            // console.log(res.data.data);
            setProducts(res.data.data)
            // console.log(res.uername);
            
          }
        } catch (error) {
            
        }
    }
    // console.log(products);
    
    useEffect(()=>{
      userdatasfornav()
        fetchdatas()
    },[])
    return(
        <div>
            <div className="alldtdatas">
                {
                    products.map((data,index)=>(
                     <Link to={`/homedetails/${data._id}`} key={index}>
                       <div className="card" >
                        <div className="imagediv">
                            <img src={data.images[0]} className="home_images" />
                        </div>
                        <div className="h3">name:{data.productName}</div>
                       </div>  
                    
                     </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Home
import React, { useEffect, useState } from "react";
import "./sellitems.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const EditProduct = () => {
 const {id}=useParams()
//  console.log(id);
 
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        images: [],
        description: "",
        price: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value, });
    };

    const handleImageChange = async(e) => {
        const files = Array.from(e.target.files); 
        const photoPromises = files.map((file) => convertToBase64(file)); 
        const photos = await Promise.all(photoPromises); 
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...photos], 
        }));
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const fetchdata=async()=>{
        try {
            const res=await axios.get(`http://localhost:3000/api/productdetails/${id}`)
            if (res.status==200) {
               setFormData(res.data.userdata)
               console.log(res.data.userdata);
               
            }
            else{
            alert("error")
            }
        } catch (error) {
           alert("cant fetch data") 
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res=await axios.post(`http://localhost:3000/api/update/${id}`,formData,{
                headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
            })
            if (res.status==200) {
                alert("data updated successfully")
            }
            else{
            alert("error")
            }
        } catch (error) {
           alert("cant fetch data") 
        }

       
    };
useEffect(()=>{
    fetchdata()
},[])
    return (
        <div className="sell-items-container">
            <h2>user name</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input   type="text" id="productName" name="productName" value={formData.productName}  onChange={handleChange}  required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select    id="category"  name="category"   value={formData.category}  onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="toys">Toys</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="images">Upload Images (at least 5):</label>
                    <input type="file" id="images" name="images" multiple onChange={handleImageChange} required   />
                </div>
                <div className="images-preview">
                    {formData.images.length > 0 && 
                        formData.images.map((image, index) => (
                            <div key={index} className="image-container">
                                <img src={image} />
                            </div>
                        ))
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description"  name="description" rows="4"  value={formData.description}   onChange={handleChange} required ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Price:</label>
                    <input  type="text"  id="price"   name="price" value={formData.price}  onChange={handleChange}    required    />
                </div>
                <button type="submit" className="sell-button">Update Item</button>
                <Link to={"/"}><button>Home</button></Link>
            </form>
        </div>
    );
};

export default EditProduct;

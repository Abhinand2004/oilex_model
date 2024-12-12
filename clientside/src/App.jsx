import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Sellitems from './components/Sellitems';
import Nav from './components/Nav';
import Profile from './components/Profile';
import ProductDetails from './components/Details';
import Editproduct from './components/Editproduct';
import HomeDetails from './components/ProductDetails';
import Verifyemail from './components/verify';
import Message from './components/Message';
import Notifi from './components/Notification';

function App() {
  
  const [user,setUser]=useState("");
  const[image,setimage]=useState("")
const [filter,setFilter]=useState("")
  return (
    <>
    <BrowserRouter>
{user &&  < Nav user={user} setFilter={setFilter} image={image}></Nav>}    
    <Routes>
      <Route path='/' element={<Home  setUser={setUser} setimage={setimage} filter={filter}/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/sell' element={<Sellitems/>}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/details/:id' element={<ProductDetails/>}></Route>
      <Route path='/edit/:id' element={<Editproduct/>}></Route>
      <Route path='/homedetails/:id' element={<HomeDetails/>}></Route>
      <Route path='/verify' element={<Verifyemail/>}></Route>
      <Route path='/message/:id' element={<Message/>}></Route>
      <Route path='/notification' element={<Notifi/>}></Route>






    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

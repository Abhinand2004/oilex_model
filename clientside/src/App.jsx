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

function App() {
  
  const [user,setUser]=useState("");

  return (
    <>
    <BrowserRouter>
{user &&  < Nav user={user}></Nav>}    
    <Routes>
      <Route path='/' element={<Home  setUser={setUser} />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/sell' element={<Sellitems/>}></Route>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/details/:id' element={<ProductDetails/>}></Route>
      <Route path='/edit/:id' element={<Editproduct/>}></Route>
      <Route path='/homedetails/:id' element={<HomeDetails/>}></Route>
      <Route path='/verify' element={<Verifyemail/>}></Route>




    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

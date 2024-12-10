import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Sellitems from './components/Sellitems';
import Nav from './components/Nav';
import Profile from './components/Profile';

function App() {
  

  return (
    <>
    <BrowserRouter>
  <Nav></Nav>
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/sell' element={<Sellitems/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Emailverify from './components/Emailverify';
import Sellitems from './components/Sellitems';
import Nav from './components/Nav';

function App() {
  

  return (
    <>
    <BrowserRouter>
  <Nav></Nav>
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/verify' element={<Emailverify/>}></Route>
      <Route path='/sell' element={<Sellitems/>}></Route>



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

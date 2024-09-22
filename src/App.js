import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Verification from './pages/Auth/Verification';
import Login from './pages/Auth/Login';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';

function App() {
  const [contactMethod, setContactMethod] = useState('');
  const [getContactNumber,setContactNumber]=useState('');
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>

            <Route path="" element={<Dashboard/>}/>
      </Route>



      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
      <Route path="/register" element={<Register setContactMethod={setContactMethod} setContactNumber={setContactNumber}/>}/>
      <Route path='/verification' element={<Verification contactMethod={contactMethod } getContactNumber={getContactNumber}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>

      
      
    </Routes>
    </>
  )
}

export default App

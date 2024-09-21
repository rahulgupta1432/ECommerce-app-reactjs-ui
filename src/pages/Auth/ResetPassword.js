import React, { useEffect, useState } from 'react'
import Header from '../../components/Layout/Header'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [passwordVisible,setPasswordVisible]=useState(false);
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();

  useEffect(()=>{
    const queryParams=new URLSearchParams(window.location.search);
    setOtp(queryParams.get('otp'));
  })
  const handleOpenPassword=(e)=>{
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }
  const handleForgetPassword=async(e)=>{
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
  
    //   const isEmail=email.includes('@');
    // const {otp,password}=req.body;
      const res=await axios.post(`${API_URL}/api/v1/auth/reset-password`,{
        otp,
        password
      })
      const response=await res.data;
      if(response.code===200){
        console.log(response.message)
        toast.success(`Password has been changed`)
        setTimeout(()=>{
            navigate("/login");
        },1000)
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
    
    }
  }
  return (
    <>
    <Header title={"ECommerce App - Reset Password"}/>

    <div className='register-section'>
        <div className='register-intro'>
          <h2 className='register-title'><b>Change your Password?</b></h2>
          {/* <h3 className='register-subtitle'>Verification Code</h3> */}
          <p className='register-description'>
            Your password needs to be at least 8 characters.
          </p> 
        </div>

        <form className="form" onSubmit={handleForgetPassword}>
          <div className="flex-column">
            <label htmlFor="username">New Password</label>
          </div>
          <div className="inputForm">
          <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>
 
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              className="input"
              placeholder="******"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" onClick={handleOpenPassword}>
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
          </div>

          <div className="flex-column">
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div className="inputForm">
          <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>
 
            <input
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className="input"
              placeholder="******"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" onClick={handleOpenPassword}>
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
          </div>

                    
          <div className="flex-row">
            {/* <div>
              <input type="checkbox" />
              <label>Remember me</label>
            </div> */}
          </div>
          <button className="button-submit">Reset</button>

          <ToastContainer />
        </form>

      </div>
    
    </>
  )
}

export default ResetPassword

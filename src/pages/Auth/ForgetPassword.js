import React, { useState } from 'react'
import Header from '../../components/Layout/Header'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { API_URL } from '../../constants/constants';

const ForgetPassword = () => {
  const [email,setEmail]=useState("");
  const handleForgetPassword=async(e)=>{
    try {
      e.preventDefault();
      const isEmail=email.includes('@');
      const res=await axios.post(`${API_URL}/api/v1/auth/forget-password`,{
        [isEmail?'email':'mobile']:email
      })
      const response=await res.data;
      if(response.code===200){
        console.log(response.message)
        toast.success(`Reset link sent successfully to your ${isEmail ? 'email' : 'mobile'}.`);
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message.data.message);
    }
  }
  return (
    <>
    <Header title={"ECommerce App - Reset Password"}/>

    <div className='register-section'>
        <div className='register-intro'>
          <h2 className='register-title'>Forget Password?</h2>
          {/* <h3 className='register-subtitle'>Verification Code</h3> */}
          <p className='register-description mt-2'>
            Enter the email address /
            <p>mobile number associated with your account.</p>
          </p> 
        </div>

        <form className="form" onSubmit={handleForgetPassword}>
          <div className="flex-column">
            {/* <label htmlFor="username">OTP</label> */}
          </div>
          <div className="inputForm">
          <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>
 
            <input
              type="text"
              name="otp"
              id="otp"
              className="input"
              placeholder="Enter your Email / Mobile"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
                    
          <div className="flex-row">
            {/* <div>
              <input type="checkbox" />
              <label>Remember me</label>
            </div> */}
          </div>
          <button className="button-submit mt-1 pt-0">Reset</button>


          {/* <div className="flex-row"> */}
            <button className="btn google mt-1 pt-0">
              <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.226,41.285,66.855,70.152,119.451,70.152c35.346,0,67.365-11.845,93.013-31.551l42.034,33.885C392.862,418.876,407.773,438.792,416.253,455.624z"></path>
                <path style={{ fill: '#EA4335' }} d="M0,512l73.051-62.281C19.546,413.057,0,357.829,0,256c0-33.876,5.577-66.516,15.918-96.66L71.686,120.91C7.963,182.787,0,219.904,0,256C0,357.829,19.546,413.057,73.051,449.719L0,512z"></path>
              </svg>
              <strong style={{color:'yellowgreen'}}>Try another way</strong>
            </button>
          {/* </div> */}
          <ToastContainer />
        </form>

      </div>
    
    </>
  )
}

export default ForgetPassword

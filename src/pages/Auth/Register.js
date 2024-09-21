import React, { useState } from 'react'
import '../../css/Register.css'
import Header from '../../components/Layout/Header'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link, NavLink } from 'react-router-dom';
import axios from "axios"
import { API_URL } from '../../constants/constants';


const Register = ({setContactMethod,setContactNumber }) => {
  const [username,setUsername]=useState("");
  const [mobile,setMobile]=useState("");
  const [password,setPassword]=useState("");
  const [passwordVisible,setPasswordVisible]=useState(false);
  const navigate=useNavigate();
  const handleSubmitRegister=async(e)=>{
    e.preventDefault();
    // alert(Object.entries(e));
    const isEmail=mobile.includes('@')
    try {
      const res=await axios.post(`${API_URL}/api/v1/auth/register`,{
        username,
        [isEmail?'email':'mobile']:mobile,
        password
      });
      const response=await res.data;
      if(response.code===200){
        const contactMethod = isEmail ? 'Email' : 'Mobile';
        setContactMethod(contactMethod);
        setContactNumber(mobile);
        toast.success(`OTP is sent to your ${contactMethod}`);  
        setTimeout(()=>{
          navigate("/verification")
        },2000);
      }else{
        console.log("else block")
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleOpenPassword=(e)=>{
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }
  return (
    <>
      <Header title={"ECommerce App - Registeration"} />
      {/* <section className='register-section'> */}
      <div className='register-section'>
        <div className='register-intro'>
          <h2 className='register-title'>Sign Up</h2>
          <p className='register-description'>
            Fill out the form below to create an account.
          </p>
        </div>

        <form className="form" onSubmit={handleSubmitRegister}>
          <div className="flex-column">
            <label htmlFor="username">Username</label>
          </div>
          <div className="inputForm">
            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
              <g id="Layer_3" data-name="Layer 3">
                <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
              </g>
            </svg>
            <input
              type="text"
              id="username"
              className="input"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
          </div>
          


          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>

            <input type="text" 
            id="mobile" 
            className="input"
            placeholder="Enter your Mobile / Email"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            required
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
              <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
            </svg>
            <input 
            type={passwordVisible ? "text" : "password"}
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            />
            <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" onClick={handleOpenPassword}>
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
            </svg>
          </div>

          <div className="flex-row">
            <span className="span"><NavLink to={'/forget-password'} style={{textDecoration:'none'}}>Forgot password?</NavLink></span>
          </div>
          <button className="button-submit mt-1 pt-0">Sign Up</button>

          <p className="p mt-0">
          Already have an account? 
        <Link to="/login" className="span" style={{textDecoration:'none'}}> Sign In</Link>
      </p>
          {/* <p className="p line">Or With</p> */}

          {/* <div className="flex-row"> */}
            <button className="btn google mt-1 pt-0">
              <svg version="1.1" width="20" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"></path>
                <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"></path>
                <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.226,41.285,66.855,70.152,119.451,70.152c35.346,0,67.365-11.845,93.013-31.551l42.034,33.885C392.862,418.876,407.773,438.792,416.253,455.624z"></path>
                <path style={{ fill: '#EA4335' }} d="M0,512l73.051-62.281C19.546,413.057,0,357.829,0,256c0-33.876,5.577-66.516,15.918-96.66L71.686,120.91C7.963,182.787,0,219.904,0,256C0,357.829,19.546,413.057,73.051,449.719L0,512z"></path>
              </svg>
              Sign up with Google
            </button>
          {/* </div> */}
          <ToastContainer />
        </form>

      </div>
      {/* </Header> */}
    </>
  )
}

export default Register

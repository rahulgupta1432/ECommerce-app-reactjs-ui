// import React from 'react'
// import Layout from '../components/Layout/Layout'
// import Header from '../components/Layout/Header'

// function About() {
//   return (
//     <>
//     <Header>

//     </Header>
//     </>
//   )
// }

// export default About


import React from 'react';
import '../css/About.css'; 
import { FaTwitter,FaFacebookF, FaGithub, FaPinterest } from "react-icons/fa";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Layout from '../components/Layout/Layout';


function About() {
  return (
    <>
    <Header title={'About us -  ECommerce App'}/>
    <section>
      <div className="image">
        {/* image here */}
      </div>

      <div className="content">
        <h2>About Us</h2>
        <span></span>

        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis aspernatur voluptas inventore ab voluptates nostrum minus illo laborum harum laudantium earum ut, temporibus fugiat sequi explicabo facilis unde quos corporis!</p>

        <ul className="links">
          <li><a href="#">Work</a></li>
          <div className="vertical-line"></div>
          <li><a href="#">Service</a></li>
          <div className="vertical-line"></div>
          <li><a href="#">Contact</a></li>
        </ul>

        <ul className="icons">
          <li>
          <FaTwitter />
          </li>
          <li>
          <FaFacebookF />
          </li>
          <li>
          <FaGithub />
          </li>
          <li>
          <FaPinterest />
          </li>
        </ul>
      </div>
    </section>
    {/* <Footer/> */}
    
    </>
  );
}

export default About;

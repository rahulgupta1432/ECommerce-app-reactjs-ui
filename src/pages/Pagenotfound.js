import React from 'react';
import Header from '../components/Layout/Header'; // Adjust the path as necessary
import '../css/Pagenotfound.css';
import Footer from '../components/Layout/Footer';
{/* <h3 className="h2">Looks like you're lost</h3> */}

const Pagenotfound = () => {
  return (
    <>
      <Header />
      <section className="page_404" >
        <div className="four_zero_four_bg">
          <h1 className="text-center" style={{color:"red"}}>404</h1>
        </div>
        <div className="contant_box_404">
        <h3 className="h2">Oops ! Page Not Found</h3>
          <p>The page you are looking for is not available!</p>
          <a href="/" className="link_404">Go to Home</a>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Pagenotfound;



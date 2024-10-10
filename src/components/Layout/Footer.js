// import React from "react";
// import { Link } from "react-router-dom";
// import "../../styles/Footer.css";
// const Footer = () => {
//   return (
//     <div className="footer">
//       <h1 className="text-center">All Right Reserved &copy; TechStackWorld</h1>
//       <p className="text-center mt-3">
//         <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
//         <Link to="/policy">Privacy Policy</Link>
//       </p>

//     </div>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer container-fluid bg-dark mt-5 pt-5 custom-text-light">
      <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <h5 className="text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
          <p className="mb-2">
            <i className="fa fa-map-marker-alt text-primary mr-3"></i>
            123 Street, New York, USA
          </p>
          <p className="mb-2">
            <i className="fa fa-envelope text-primary mr-3"></i>
            info@example.com
          </p>
          <p className="mb-0">
            <i className="fa fa-phone-alt text-primary mr-3"></i>
            +012 345 67890
          </p>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <div className="col-md-4 mb-5">
              <h5 className="text-uppercase mb-4">Quick Shop</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="mb-2" to="/"><i className="fa fa-angle-right mr-2"></i>Home</Link>
                <Link className="mb-2" to="/categories"><i className="fa fa-angle-right mr-2"></i>Our Shop</Link>
                <Link className="mb-2" to="/category/Clothing+Accessorie/cat/66f47cc9faa69eab356d09e0"><i className="fa fa-angle-right mr-2"></i>Shop Detail</Link>
                <Link className="mb-2" to="/cart-checkout"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</Link>
                <Link className="mb-2" to="/checkout"><i className="fa fa-angle-right mr-2"></i>Checkout</Link>
                <Link to="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-uppercase mb-4">My Account</h5>
              <div className="d-flex flex-column justify-content-start">
                <Link className="mb-2" to="/account"><i className="fa fa-angle-right mr-2"></i>My Account</Link>
                <Link className="mb-2" to="/orders"><i className="fa fa-angle-right mr-2"></i>My Orders</Link>
                <Link className="mb-2" to="/wishlist"><i className="fa fa-angle-right mr-2"></i>My Wishlist</Link>
                <Link className="mb-2" to="/logout"><i className="fa fa-angle-right mr-2"></i>Logout</Link>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <h5 className="text-uppercase mb-4">Newsletter</h5>
              <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
              <form action="">
  <div className="input-group" style={{ display: 'flex', alignItems: 'flex-start' }}>
    <input
      type="text"
      className="form-control"
      placeholder="Your Email Address"
      style={{
        width: '150px',
        color: '#3D464D',
        borderRadius: '0',
        height: '40px' // Increased height
      }}
    />
    <div className="input-group-append">
      <button
        className="btn btn-primary"
        style={{
          backgroundColor: '#FFD333',
          borderColor: '#FFD333',
          height: '40px', // Increased height
          width: '120px',
          color: '#3D464D',
          borderRadius: '0',
          marginLeft: '5px',
          marginTop: '-0px' // Adjust to move button up
        }}
      >
        Sign Up
      </button>
    </div>
  </div>
</form>

              <h6 className="text-uppercase mt-4 mb-3">Follow Us</h6>
              <div className="d-flex custom-yellow">
                <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram" style={{ fontWeight: 'bolder' }}></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row border-top mx-xl-5 py-4" style={{ borderColor: 'rgba(256, 256, 256, .1)' }}>
        <div className="col-md-6 px-xl-0"  style={{
            textAlign:'center',
            marginLeft:'350px'
          }}>
          <p className="mb-md-0 text-center text-md-left">
            &copy; <Link className="text-primary" to="#">2024 Fusion Store</Link>All Rights Reserved. Designed by 
            <Link className="text-primary" to="https://www.linkedin.com/in/rahul-gupta-62ba0121b/" target="_blank"> 
            {/* HTML Codex */}
            Rahul Gupta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;




// all categories footer
{/* <div className="footer container-fluid bg-dark mt-5 pt-5 custom-text-light">
    <div className="row px-xl-5 pt-5">
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-uppercase mb-4">Get In Touch</h5>
            <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
            <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary mr-3"></i>
                123 Street, New York, USA
            </p>
            <p className="mb-2">
                <i className="fa fa-envelope text-primary mr-3"></i>
                info@example.com
            </p>
            <p className="mb-0">
                <i className="fa fa-phone-alt text-primary mr-3"></i>
                +012 345 67890
            </p>
        </div>
        <div className="col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-4 mb-5">
                    <h5 className="text-uppercase mb-4">Quick Shop</h5>
                    <div className="d-flex flex-column justify-content-start">
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Home</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                        <a href="#"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <h5 className="text-uppercase mb-4">My Account</h5>
                    <div className="d-flex flex-column justify-content-start">
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Home</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                        <a className="mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                        <a href="#"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <h5 className="text-uppercase mb-4">Newsletter</h5>
                    <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                    <form action="">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Your Email Address" 
                            style={{
                              // backgroundColor:'#FFD333',
                              // borderColor:'#FFD333',
                              width:'150px',
                              color:'#3D464D',
                              borderRadius:'0'
                            }}
                            />
                            <div className="input-group-append mt-3">
                                <button className="btn btn-primary"
                                style={{
                                  backgroundColor:'#FFD333',
                                  borderColor:'#FFD333',
                                  height:'100%',
                                  width:'150px',
                                  color:'#3D464D',
                                  borderRadius:'0'
                                }}
                                >Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <h6 className="text-uppercase mt-4 mb-3">Follow Us</h6>
                    <div className="d-flex custom-yellow">
                        <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram" style={{fontWeight: 'bolder'}}></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="row border-top mx-xl-5 py-4" style={{ borderColor: 'rgba(256, 256, 256, .1)' }}>
        <div className="col-md-6 px-xl-0">
            <p className="mb-md-0 text-center text-md-left">
                &copy; <a className="text-primary" href="#">Domain</a>. All Rights Reserved. Designed by 
                <a className="text-primary" href="https://htmlcodex.com"> HTML Codex</a>
            </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="img/payments.png" alt="" />
        </div>
    </div>
</div> */}
import '../styles/ECommerceShop.css'; // Make sure to import your CSS file
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTimes,  faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const EcommerceShop = () => {
  return (
    <>
    <div>
      <header id="header">
        <a href="#"><img src="https://i.postimg.cc/x8ncvFjr/logo.png" alt="Logo" /></a>
        <nav>
          <ul id="navbar">
            <li><a href="index.html" className="active">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li>
              <a href="cart.html" id="lg-bag">
                <FontAwesomeIcon icon={faShoppingBag} />
                <span className="quantity">0</span>
              </a>
            </li>
            <li>
              <a href="#" id="close"><FontAwesomeIcon icon={faTimes} /></a>
            </li>
          </ul>
        </nav>
        <div id="mobile">
          <a href="cart.html">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span className="quantity">0</span>
          </a>
          <i id="bar" className="fas fa-outdent"></i>
        </div>
      </header>

      <section id="hero">
        <h4>Trade-in-fair</h4>
        <h2>Super value deals</h2>
        <h1>On all Products</h1>
        <p>Save more with coupons and up to 70% off!</p>
        <button>Shop Now</button>
      </section>
      <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src="https://i.postimg.cc/PrN2Y6Cv/f1.png" alt="" />
        <h6>Free Shipping</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/qvycxW4q/f2.png" alt="" />
        <h6>Online Order</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/1Rdphyz4/f3.png" alt="" />
        <h6>Save Money</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/GpYc2JFZ/f4.png" alt="" />
        <h6>Promotions</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/4yFCwmv6/f5.png" alt="" />
        <h6>Happy Sell</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/gJN1knTC/f6.png" alt="" />
        <h6>F24/7 Support</h6>
      </div>
    </section>

    </div>
    <div>
    <section id="feature" className="section-p1">
      <div className="fe-box">
        <img src="https://i.postimg.cc/PrN2Y6Cv/f1.png" alt="" />
        <h6>Free Shipping</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/qvycxW4q/f2.png" alt="" />
        <h6>Online Order</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/1Rdphyz4/f3.png" alt="" />
        <h6>Save Money</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/GpYc2JFZ/f4.png" alt="" />
        <h6>Promotions</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/4yFCwmv6/f5.png" alt="" />
        <h6>Happy Sell</h6>
      </div>

      <div className="fe-box">
        <img src="https://i.postimg.cc/gJN1knTC/f6.png" alt="" />
        <h6>F24/7 Support</h6>
      </div>
    </section>
    </div>
    </>
  );
};

export default EcommerceShop;

import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Layout/Header';
import '../styles/AllCategories.css';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import BackToTop from '../components/utils/BacktoTop';
import Footer from '../components/Layout/Footer';

// import { NavLink } from 'react-router-dom';

const imageList = {
  // 1: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
  1:'https://5.imimg.com/data5/ECOM/Default/2024/2/389519659/UI/MF/JF/153407772/h8d73a5a841434ff99fde79802bed8d93b-500x500.webp',
  2: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
  3: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
  // 2:'https://imgs.search.brave.com/491xG9gLPHIRO76RNpvAOgS9K4eYfUP9o0ONXkKMc3E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhj/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8xMS9jbG90/aGluZy1waG90b2dy/YXBoeS1mZWF0dXJl/ZC1pbWFnZS5wbmc',
  // 3:'https://imgs.search.brave.com/lvl2LXjhr063JAaWPKpxM-x7yBeLiufJtVwPtWw9cmg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIx/MTU1NDE2NC9waG90/by8zZC1yZW5kZXIt/b2YtaG9tZS1hcHBs/aWFuY2VzLWNvbGxl/Y3Rpb24tc2V0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1i/bG0zSXlQeVpvNUVs/V0xPakktaEZNRy1O/cktRMEc3NkpwV0d5/TnR0RjhzPQ',
  4: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-4.jpg",
  5: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
  6: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
  7: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
  8: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
  9: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
  10: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-3.jpg",
  11: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-1.jpg",
  12: "https://demo.htmlcodex.com/1479/online-shop-website-template/img/cat-2.jpg",
};
const AllCategories = () => {
  const categories = useCategory();
  const [isHovered, setIsHovered] = useState(false);
  const carouselImages = [
    {
      src: "img/carousel-1.jpg",
      title: "Men Fashion",
      description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam"
    },
    {
      src: "img/carousel-2.jpg",
      title: "Women Fashion",
      description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam"
    },
    {
      src: "img/carousel-3.jpg",
      title: "Kids Fashion",
      description: "Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam"
    }
  ];
  const [currentImageIndex,setCurrentImageIndex] = useState(0);
  const randomCount = Math.floor(Math.random() * 401) + 100;
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    },2000); 

    return () => clearInterval(interval); 
  }, []);
  const containerRef = useRef(null);


  
  return (
      <>
      <Header />
      <div className="container-fluid-custom-all-categories pt-5"
      ref={containerRef}
      >

        {/* carousel */}
        <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
            <ol className="carousel-indicators">
            {carouselImages.map((_, index) => (
                    <li key={index} data-target="#header-carousel" data-slide-to={index} className={index === currentImageIndex ? 'active' : ''} onClick={() => handleImageChange(index)}></li>
                  ))}
            </ol>
            <div className="carousel-inner">
            {carouselImages.map((item, index) => (
                    <div className={`carousel-item position-relative ${index === currentImageIndex ? 'active' : ''}`} style={{ height: '430px' }} key={index}>
                    <img className="position-absolute w-100 h-100" src={item.src} style={{ objectFit: 'cover' }} alt={item.title} />
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                      <div className="p-3" style={{ maxWidth: '700px' }}>
                        <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{item.title}</h1>
                        <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{item.description}</p>
                        <a className="btn btn-outline-light py-2 px-4 mb-4 animate__animated animate__fadeInUpfu" style={{
                          backgroundColor: 'transparent',
                          color: 'black',
                          borderRadius: 'none',
                          width: '150px',
                          marginLeft: '230px',
                          transition: 'background-color 0.3s ease, color 0.3s ease',
                          borderColor: 'white'
                        }} href="#">Shop Now</a>

                  </div>
                </div>
              </div>
            ))}
              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src="img/carousel-2.jpg" style={{ objectFit: 'cover' }} alt="Women Fashion" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Women Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item position-relative" style={{ height: '430px' }}>
                <img className="position-absolute w-100 h-100" src="img/carousel-3.jpg" style={{ objectFit: 'cover' }} alt="Kids Fashion" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Kids Fashion</h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam</p>
                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="#">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: '200px' }}>
            <img className="img-fluid" src="img/offer-1.jpg" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary"
              style={{
                backgroundColor:'#FFD333',
                borderColor:'#FFD333',
                width:'150px',
                color:'#3D464D',
                borderRadius:'0'
              }}
              >Shop Now</a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: '200px',marginTop:'30px' }}>
            <img className="img-fluid" src="img/offer-2.jpg" alt="" />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Save 20%</h6>
              <h3 className="text-white mb-3">Special Offer</h3>
              <a href="#" className="btn btn-primary" 
              style={{
                backgroundColor:'#FFD333',
                borderColor:'#FFD333',
                width:'150px',
                color:'#3D464D',
                borderRadius:'0'
              }}
              >Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* end carousel */}



        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="secondary pr-3">Categories</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {categories.map((category, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category._id}>
              <a className="text-decoration-none" href="#">
              <Link to={`/category/${encodeURIComponent(category.name.trim().replace(/\s+/g, '+')).replace(/%2B/g, '+')}/cat/${category._id}`}
              >
              
                <div className="cat-item img-zoom d-flex align-items-center mb-4">
                  <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
                      {console.log(index)}
                    <img className="img-fluid"
                     src={imageList[index + 1]}
                    //  src={category.image}
                     alt={`Category ${category.name}`} />
                  </div>
                  <div className="flex-fill pl-3" style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  backgroundColor: isHovered ? '#FFD333' : '#FFFFFF',
                  height:'100px',
                  // margin:'2px'
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
            
                  >
                    <h6 
                    style={{
                      color:'#3D464D',
                      textDecoration:'none',
                      margin:'0 0 8px'
                    }}>{category.name}</h6>
                    <small className="text-body"
                    style={{
                      color:'#6C757D',
                      textDecoration:'none',
                      marginTop:'12px'
                    }}
                    >{(randomCount+index*2+1*3)}+ Products</small>
                  </div>
                </div>
                </Link>
              </a>
            </div>
          ))}
        </div>


        {/* feature */}
        <div className="container-fluid pt-0">
      <div className="row px-xl-5 pb-3" style={{color:'#3D464D',fontSize:'20px'}}>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
            <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
            <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" style={{ color: '#FFD700' }}></h1>
            <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
            <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div className="d-flex align-items-center bg-light mb-4" style={{ padding: '30px' }}>
            <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
            <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
          </div>
        </div>
      </div>
    </div>



    {/* all products */}
    <div className="container-fluid pt-2 pb-3">
    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="secondary pr-3">Featured Products</span>
    </h2>
    <div className="row px-xl-5">
        {Array.from({ length: 8 }).map((_, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={`img/product-${index + 1}.jpg`} alt="" />
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="">Calvin Klein</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5>
                            <h6 className="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
{/* end product */}

{/* offer */}

<div className="container-fluid pt-8 pb-3" style={{marginTop:'200px'}}>
        <div className="row px-xl-5">
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height:' 300px'}}>
                    <img class="img-fluid" src="img/offer-1.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="" class="btn btn-primary" 
                        style={{
                          backgroundColor:'#FFD333',
                          borderColor:'#FFD333',
                          width:'150px',
                          color:'#3D464D',
                          borderRadius:'0'
                        }}
                        >Shop Now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height:'300px'}}>
                    <img className="img-fluid" src="img/offer-2.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="" className="btn btn-primary"
                        style={{
                          backgroundColor:'#FFD333',
                          borderColor:'#FFD333',
                          width:'150px',
                          color:'#3D464D',
                          borderRadius:'0'
                        }}
                        >Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* offer end */}




{/* recent product same as all product featured */}

<div className="container-fluid pt-2 pb-3">
    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="secondary pr-3">Recent Products</span>
    </h2>
    <div className="row px-xl-5">
        {Array.from({ length: 8 }).map((_, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={index}>
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={`img/product-${index + 1}.jpg`} alt="" />
                        <div className="product-action">
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-shopping-cart"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></a>
                            <a className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="">Calvin Klein</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>$123.00</h5>
                            <h6 className="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
{/* end recent product */}




{/* companies */}
<div className="container-fluid pt-5" style={{marginTop:'250px'}}>
            <div className="row px-xl-5">
                <div className="col">
                    <div className="vendor-carousel d-flex justify-content-start mt-4"> {/* Added margin-top */}
                        {[1, 2, 3, 4, 5, 6].map((vendor) => (
                            <div key={vendor} className="bg-light p-4 me-2">
                                <img 
                                    src={`https://res.cloudinary.com/ddjbnp7ab/image/upload/v1728225632/vendor/vendor-${vendor}.jpg.jpg`} 
                                    alt={`Vendor ${vendor}`} 
                                    style={{ width: '100%', height: 'auto',marginLeft:'24px' }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>




<Footer/>
{/* footer end */}
<BackToTop ref={containerRef} />






      </div>
    </>
  );
};

export default AllCategories;

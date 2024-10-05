import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CategoryProduct.css'

const CategoryProducts = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const navigate=useNavigate();

  const getProductByCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/product/category-based?categoryId=${params.id}`);
      const resp = response?.data;
      if (resp?.code === 200) {
        setProduct(resp?.data.slice(0, -1));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [params?.id]);
  const ratings = [3.9, 3.2, 4.5, 4.9, 3.2, 2.5, 2.9]; // Array of possible ratings


  return (
    <>
      <Header />
      <div className="container-fluid">
        <h1 style={{textAlign:'center'}}>Category</h1>
        <div className="shop-content" style={{ paddingTop: '30px' }}>
          <div className="breadcrumb" style={{textAlign:'center'}}>
            <nav>
              {/* <a href="#">Home</a> / <a href="#">Shop</a> / <span>Shop List</span> */}
              <ul className="breadcrumb-list" 
              // style={{}}
              style={{
                textDecoration:'none',
                  marginTop:'-127px',
                  fontSize:'12px',
                  fontWeight:'bold',
                  lineHeight:'2px',
                  letterSpacing:'1px'
                }}
                >
      <li><a href="#">Home</a></li>
      <li style={{marginLeft:'12px'}}><span> &gt; </span></li>
      <li><a href="#">Category</a></li>
      <li><span> &gt; </span></li>
      <li><span>Product List <b>({product.length})</b></span></li>
    </ul>
            </nav>
          </div>
          
          <div className="row">
            <div className="col-lg-3 col-md-4 sidebar" style={{marginTop:'-71px'}}>
              <h5 className="section-title">Filter by price</h5>
              <form style={{marginTop:'-7px'}}>
                {['All Price', '$0 - $100', '$100 - $200', '$200 - $300', '$300 - $400', '$400 - $500'].map((price, index) => (
                  <div className="custom-control custom-checkbox" key={index}>
                    <input type="checkbox" className="custom-control-input" id={`price-${index}`} />
                    <label className="custom-control-label ml-2" htmlFor={`price-${index}`}>{price}</label>
                    <span className="badge border">{Math.floor(Math.random() * 200 + 100)}</span>
                  </div>
                ))}
              </form>

              <h5 className="section-title" style={{marginTop:'-9px'}}>Filter by color</h5>
              <form style={{marginTop:'-7px'}}>
                {['All Color', 'Black', 'White', 'Red', 'Blue', 'Green'].map((color, index) => (
                  <div className="custom-control custom-checkbox" key={index}>
                    <input type="checkbox" className="custom-control-input" id={`color-${index}`} />
                    <label className="custom-control-label ml-2" htmlFor={`color-${index}`}>{color}</label>
                    <span className="badge border">{Math.floor(Math.random() * 200 + 100)}</span>
                  </div>
                ))}
              </form>

              <h5 className="section-title" style={{marginTop:'-5px'}}>Filter by size</h5>
              <form style={{marginTop:'-7px'}}>
                {['All Size', 'XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                  <div className="custom-control custom-checkbox" key={index}>
                    <input type="checkbox" className="custom-control-input" id={`size-${index}`} />
                    <label className="custom-control-label ml-2" htmlFor={`size-${index}`}>{size}</label>
                    <span className="badge border">{Math.floor(Math.random() * 200 + 100)}</span>
                  </div>
                ))}
              </form>
            </div>

            <div className="col-lg-9 col-md-8 products">
              <div className="row">
                {product.map((item, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6 pb-1" key={index}>
                    <div className="product-item bg-light mb-4">
                      <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid fixed-img"
                          style={{ width: '300px', height: '400px', objectFit: 'cover',  cursor:'pointer' }} 
                        src={item.imageList[0]||"https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg"} alt={item.name} 
                        onClick={()=>{
                          navigate(`/product/${item.slug}/prd/${item._id}`)
                        }}                        
                        />
                        {/* <img className="img-fluid w-100" src={""} alt={item.name} /> */}
                        {/* <div className="product-action">
                          <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-shopping-cart"></i></a>
                          <a className="btn btn-outline-dark btn-square" href="#"><i className="far fa-heart"></i></a>
                          <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-sync-alt"></i></a>
                          <a className="btn btn-outline-dark btn-square" href="#"><i className="fa fa-search"></i></a>
                        </div> */}
                      </div>
                      <div className="text-center py-4">
                        <a className="h6 text-decoration-none text-truncate" href="#">{item.name}</a>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                          <h5>${item.price}</h5>
                          {/* <h6 className="text-muted ml-2"><del>${item.originalPrice}</del></h6> */}
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <small key={i} className={`fa fa-star${i < item.rating ? ' text-primary' : '-half-alt text-primary'}`}></small>
                          ))}
                          <small>({item.ratingCount || ratings[Math.floor(Math.random() * ratings.length)]})</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <nav>
                <ul className="pagination justify-content-center">
                  <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item active"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;

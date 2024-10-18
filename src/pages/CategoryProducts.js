import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/CategoryProduct.css';

const CategoryProducts = () => {
  const [product, setProduct] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [checked,setChecked]=useState([]);
  const [colorsChecked,setColorsChecked]=useState([]);

  const getProductByCategory = async () => {
    try {
      const requestData={
        checked:checked,
        colors:colorsChecked
      }
      const response = await axios.post(`${API_URL}/api/v1/product/category-based?categoryId=${params.id}`,requestData);
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
  }, [params?.id,checked,colorsChecked]);

  const ratings = [3.9, 3.2, 4.5, 4.9, 3.2, 2.5, 2.9];
  const categoryName = location.pathname.split('/')[2]; // Yeh "category" ke baad wala hissa lega
  const handlePriceFilter=(value,isChecked)=>{
    let all=[...checked];
    if(isChecked){
      all.push(value);
    }else {
      all = all.filter(item => item !== value);
    }
    setChecked(all);
  }

  const handleColorFilter=(value,isChecked)=>{
    let all=[...colorsChecked];
    const lowerCaseValue = value.toLowerCase();
    if(isChecked){
      if (!all.includes(lowerCaseValue)) {
        all.push(lowerCaseValue);
      }  
    }else {
      all = all.filter(item => item !== lowerCaseValue);

    }
    setColorsChecked(all);
  }


  return (
    <>
      <Header />
      <div className="container-fluid-catprd">
        <h1 style={{ textAlign: 'center',paddingTop:'5px' }}>{categoryName}</h1>

        {/* Filters Section */}
        <div className="row filters-container" style={{
          marginTop: '-1.9%'
          // , marginBottom: '30px' 
        }}>
          <div className="col-lg-3 col-md-4 sidebar-catprd" style={{ marginTop: '-10px', marginBottom: '80px' }}>
            <h5 className="section-title-catprd">Filter by price</h5>
            <form style={{ marginTop: '10px' }}>
              {['All Price','$100 - $500', '$500 - $2000', '$2000 - $4000', '$4000 - $50000'].map((price, index) => (
                <div className="custom-control custom-checkbox-catprd" key={index}>
                  <input type="checkbox" className="custom-control-input" id={`price-${index}`}
                  onClick={(e)=>{
                    handlePriceFilter(price,e.target.checked);
                  }}
                  />
                  <label className="custom-control-label ml-2" htmlFor={`price-${index}`}>{price}</label>
                  {/* <span className="badge border">{Math.floor(Math.random() * 200 + 100)}</span> */}
                </div>
              ))}
            </form>

            <h5 className="section-title-catprd" style={{ marginTop: '20px' }}>Filter by color</h5>
            <form style={{ marginTop: '10px' }}>
              {['All Colors', 'Black', 'White', 'Red', 'Blue', 'Green','Yellow'].map((color, index) => (
                <div className="custom-control custom-checkbox-catprd" key={index}>
                  <input type="checkbox" className="custom-control-input" id={`color-${index}`}
                  onClick={(e)=>{
                    handleColorFilter(color,e.target.checked);
                  }}
                  />
                  <label className="custom-control-label ml-2" htmlFor={`color-${index}`}>{color}</label>
                  {/* <span className="badge border">{Math.floor(Math.random() * 200 + 100)}</span> */}
                </div>
              ))}
            </form>

            {/* <h5 className="section-title-catprd" style={{ marginTop: '20px' }}>Filter by size</h5>
            <form style={{ marginTop: '10px' }}>
              {['All Size', 'XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                <div className="custom-control custom-checkbox-catprd" key={index}>
                  <input type="checkbox" className="custom-control-input" id={`size-${index}`} />
                  <label className="custom-control-label ml-2" htmlFor={`size-${index}`}>{size}</label>
                </div>
              ))}
            </form> */}
          </div>

          {/* Products Section */}
          <div className="col-lg-9 col-md-8 products-catprd" style={{ marginTop: '40px' }}>
            <div className="row">
              {product.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 pb-1" key={index} style={{ marginBottom: '30px' }}>
                  <div className="product-item-catprd bg-light mb-4">
                    <div className="product-img-catprd position-relative overflow-hidden">
                      <img className="img-fluid fixed-img"
                        style={{ width: '300px', height: '300px', objectFit: 'cover', cursor: 'pointer' }}
                        src={item.imageList[0] || "https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg"}
                        alt={item.name}
                        onClick={() => {
                          navigate(`/product/${item.slug}/prd/${item._id}`);
                        }}
                      />
                    </div>
                    <div className="text-center py-4">
                      <a className="h6 text-decoration-none text-truncate" href="#">{item.name}</a>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>${item.price}</h5>
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

            {/* <nav>
              <ul className="pagination justify-content-center">
                <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;

import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Layout/Header'
import { toast } from 'react-toastify'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../constants/constants'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import '../styles/ProductDetails.css';
import { Carousel } from 'primereact/carousel'
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating'


const ProductDetails = () => {
    const params=useParams();
    const [product,setProduct]=useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const smallImgs=useRef([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate(); 

    const handleGetProductDetails=async()=>{
        try {
            const response=await axios.get(`${API_URL}/api/v1/product/get-details?productId=${params.id}`);
            const resp=response.data;
            if(resp?.code===200){
                toast.success("Product Get Succesfully");
                setProduct(resp?.data?.slice(0,-1));
                setRelatedProducts(resp?.data[1].similarProducts);
            }else{
                toast.error(resp.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    }
    useEffect(() => {
        if(params?.id){
            handleGetProductDetails();
        }
    },[params?.id]);
    const handleClick=(index)=>{
        setActiveIndex(index)
    }
    const imageTemplate = (image, index) => {
        // alert(index)
        return (
          <div key={index} className="carousel-image-container">
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="carousel-image"
              loading="lazy"
            />
          </div>
        );
      };
      

      
    const gridItem = (product) => (
        <div
            className="product-card col-6 sm:col-6 lg:col-4"
            key={product._id}
            style={{
                // top:'100',
                height: '300px', 
                width: '200px',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                transform: 'scale(1)',
                transformOrigin: 'center center',
                borderRadius: '10px',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                margin: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center items horizontally
                justifyContent: 'center' // Center items vertically
            }}
        >
            <div className="p-4 border-1 surface-border surface-card border-round" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <img
                    src={product.imageList[0]}
                    alt={product.name}
                    className="product-image"
                    style={{
                        marginBottom:'-40px',
                        maxWidth: '100%', // Make image responsive
                        maxHeight: '70%', // Limit image height
                        objectFit: 'contain', // Maintain aspect ratio
                        margin: '0 auto' // Center the image
                    }}
                    onClick={()=>{
                        // navigate(`/product/${product.slug}`);
                        const query=encodeURIComponent(product.slug).replace(/%20/g,'+')
                        navigate(`/product/${query}/prd/${product._id}`)
                      }}
                />
                <div className="flex flex-column align-items-center gap-2 py-2">
                    <div style={{ textAlign:'center',fontSize: '12px', fontWeight: 'bold',height:'10px' }}>    {product.name.length > 2 ? `${product.name.substring(0, 40)}...` : product.name}
                    </div>
                    <Rating value={product.rating || 5} readOnly cancel={false}  style={{
                        height:'20px',
                        marginTop:'18px'
                    }}/>
                    <div className="text-lg font-semibold">₹{product.price}</div>
                </div>
            </div>
        </div>
    );
    
    


    return (
    <>
    <Header/>
    <div className="row">
    <div className="col-md-12" style={{ top: '20px' }}>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{marginTop:'10px'}}>
                <li className="breadcrumb-item" style={{ marginTop: '5px' }}><NavLink to={'/'}  style={{textDecoration:'none',color:'#2D2D2D',fontSize:'14px'}}>Home</NavLink></li>
                <li className="breadcrumb-item" style={{ marginTop: '5px' }}><NavLink to={'/'}  style={{textDecoration:'none',color:'#2D2D2D',fontSize:'14px'}}>Women</NavLink></li>
                <li className="breadcrumb-item" style={{ marginTop: '5px' }}><NavLink to={'/'}  style={{textDecoration:'none',color:'#2D2D2D',fontSize:'14px'}}>Tops</NavLink></li>
                <li className="breadcrumb-item" aria-current="page" style={{textDecoration:'none',color:'grey',marginTop:'5px'}}>{product[0]?.name}</li>
            </ol>
        </nav>
    </div>
</div>

    <div className="container mt-4">
    <section className="product-container">
        {/* Image Section */}
        <div className="img-card-custom">
            <Carousel 
                value={product[0]?.imageList||[]}
                activeIndex={activeIndex}
                onChange={(e) => setActiveIndex(e.index)}
                numVisible={1}
                numScroll={1}
                circular
                autoplayInterval={3000}
                className="custom-carousel"
                itemTemplate={imageTemplate}
                id='feature'
            />
            {/* Small images */}
            <div className="small-card-custom">
                {product[0]?.imageList.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt=""
                        id={`small-img-${index}`}
                        className={`small-img-custom ${index === activeIndex ? 'active-small-img' : ''}`}
                        ref={(el) => smallImgs.current[index] = el}
                        onClick={() => handleClick(index)}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>

        {/* Right Side - Product Info Section */}
        <div className="product-info-custom">
            <h3>{product[0]?.name}</h3>
            <h5>Price: ${product[0]?.price} <del> $1200</del></h5>
            <p>{product[0]?.description}</p>
            <div className="sizes-custom">
                <p>Size:</p>
                <select name="Size" id="size" className="size-option-custom">
                    <option value="xxl">XXL</option>
                    <option value="xl">XL</option>
                    <option value="medium">Medium</option>
                    <option value="small">Small</option>
                </select>
            </div>

            <div className="quantity-custom">
                <InputText type="number" defaultValue="1" min="1" />
                <Button id="add-to-cart-btn" className='ml-3 mt-2'>Add to Cart</Button>
            </div>
            
            {/* Delivery Information */}
            <div>
                <p>Delivery:</p>
                <p>Free standard shipping on orders over $35 before tax, plus free returns.</p>
                <div className="delivery-custom">
                    <p>TYPE</p> <p>HOW LONG</p> <p>HOW MUCH</p>
                </div>
                <hr />
                <div className="delivery-custom">
                    <p>Standard delivery</p> 
                    <p>1-4 business days</p> 
                    <p>$4.50</p>
                </div>
                <hr />
                <div className="delivery-custom">
                    <p>Express delivery</p> 
                    <p>1 business day</p> 
                    <p>$10.00</p>
                </div>
                <hr />
                <div className="delivery-custom">
                    <p>Pick up in store</p> 
                    <p>1-3 business days</p> 
                    <p>Free</p>
                </div>
            </div>
                    <h3 className='related-name'>Related Products</h3>
            <div className="related-products">
                    {setRelatedProducts}
                    <DataView
                        value={relatedProducts} 
                        layout="grid" 
                        itemTemplate={gridItem} 
                    />
                </div> 

        </div>
    </section>
</div>
{/* related prod */}
{/* heloo */}

    </>
  )
}

export default ProductDetails

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
import { Dropdown } from 'primereact/dropdown'
import { FiMail, FiShare } from "react-icons/fi";
import { useAuth } from '../context/Auth'
import { Dialog } from 'primereact/dialog'


const ProductDetails = () => {
    const params=useParams();
    const [product,setProduct]=useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const smallImgs=useRef([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const [selectSize,setSelectedSize]=useState(null);
    const size=[
        {label:"S",value:"S"},
        {label:"M",value:"M"},
        {label:"L",value:"L"},
        {label:"XL",value:"XL"},
        {label:"XXL",value:"XXL"},
    ]
    const [buttonText,setButtonText]=useState('Add to Bag');
    const [buttonStyle, setButtonStyle] = useState({  backgroundColor: '#17696a',
        borderRadius:'4px',
        padding:'10px 37px',
        border:'none',
        color:'white',
        fontWeight:'600',
        transition: 'background-color ease-in 0.4s'
     });
     const [auth]=useAuth();
     const [visible, setVisible] = useState(false);


    const handleGetProductDetails=async()=>{
        try {
            const response=await axios.get(`${API_URL}/api/v1/product/get-details?productId=${params.id}`);
            const resp=response.data;
            if(resp?.code===200){
                // toast.success("Product Get Succesfully");
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
    
    const originalPrice = product[0]?.price; // Get the original price from API
    const inflatedPrice = originalPrice + (Math.random() < 0.5 ? 299 : 499); // Add either 299 or 499
    const handleSizeChange = (e) => {
        setSelectedSize(e.value);
        setButtonText("Notify Me");
        // setButtonStyle({ backgroundColor: 'black', color: 'white' });
        setButtonStyle((prev) => ({
            ...prev,
            backgroundColor: '#ff4242', // Change to desired color
            // backgroundColor: '#2D2D2D',
        }));

    };
    
    const handleMouseEnter = () => {
        setButtonStyle((prev) => ({
            ...prev,
            backgroundColor: '#ff4242',
        }));
    };

    const handleMouseLeave = () => {
        setButtonStyle((prev) => ({
            ...prev,
            backgroundColor: '#2D2D2D',

        }));
    };

    const handleIsLogin=async()=>{
        if(!auth.user){
            setVisible(false);
            // alert("hey");
            navigate('/login');
           
        }

    }


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
            <h3 style={{color:'#2D2D2D',fontSize:'20px',fontWeight:'normal',letterSpacing:'0.6px',lineHeight:'24px'}}>{product[0]?.name}
            <div style={{
                cursor:'pointer',
                fontSize:'20px',
                color:'#2D2D2D',
                fontWeight:'normal',
                letterSpacing:'0.6px',
                lineHeight:'24px',
                display:'flex',
                gap:'5px',
                alignItems:'center',
                marginLeft:'450px',
                marginTop:'-20px',

            }}>
            <FiShare/>
            </div>
            </h3>
            {/* <h5>Price: ${product[0]?.price} */}
            <h5 style={{color:'#666666',fontFamily:'inherit',fontWeight:'normal',letterSpacing:'0.2px',lineHeight:'30px'}}><b>₹{originalPrice} </b>
                 <del>{inflatedPrice}</del></h5>
            <p>{product[0]?.description}</p>
            <div className="sizes-custom">
                {/* <p>Size:</p> */}
                <p style={{
                    color: '#2D2D2D',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    lineHeight: '24px',
                    letterSpacing: '0.4px',
                    textTransform: 'uppercase',
                    margin: '0px 0px 0px 0px',

                }}>SIZE:</p>
                <Dropdown value={selectSize} 
                // onChange={(e)=>setSelectedSize(e.value)} 
                options={size} optionLabel='label'
                    placeholder="Select a Size" className="w-full md:w-12rem" checkmark={true} highlightOnSelect={false}
                    // onChange={handleSizeChange}
                    onChange={handleSizeChange}
                    />
            </div>

            <div className="quantity-custom">
                <InputText type="number" defaultValue="1" min="1" />
                {/* <Button id="add-to-cart-btn" className='ml-3 mt-2' style={{
                    textTransform:'uppercase'
                }}>Add to Bag</Button> */}
                <Button 
                                id="add-to-cart-btn" 
                                className='ml-3 mt-2' 
                                style={{ 
                                    textTransform: 'uppercase', 
                                    ...buttonStyle,
                                }}
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseLeave}
                                onClick={handleIsLogin}

                            >
                                <FiMail style={{ marginRight: '5px' }} />
                                {buttonText}
                            </Button>
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

<Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <h1>Turn on a back-in-stock alert</h1>
                <p>Having great taste is hard sometimes. 
                Log in now to get an email the minute this item is back in stock!</p>
                <Button style={{
                    textTransform:'uppercase'
                }}
                onClick={() => setVisible(true)}
                >Sign in/join</Button>

            </Dialog>

    </>
  )
}

export default ProductDetails

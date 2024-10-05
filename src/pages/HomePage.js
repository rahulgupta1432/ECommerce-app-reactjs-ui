import '../styles/HomePage.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Dialog } from 'primereact/dialog';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/Auth';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import {  useNavigate } from 'react-router-dom';

        


function HomePage() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [wishlist, setWishlist] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [hoveredImages, setHoveredImages] = useState({}); // Manage hover state
  let [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([]);
  const [priceRange,setPriceRange]=useState(
    {
      min: 0,
      max: 100000
    }
  )
  const [star,setStar]=useState(0);
  const starValues = [1, 2, 3, 4, 5];
  const [searchQuery,setSearchQuery]=useState('');
  const [auth] = useAuth();
  const navigate = useNavigate(); 
  const [isWishlisted,setIsWishlisted]=useState({});
  const [limit,setLimit]=useState(null);
  const [productSearch,
    setProductSearch
  ]=useState('');
  
  // categories= ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Toys'];
  
  const clearFilters = () => {
    // Clear filters logic here
    setChecked([]);
    setPriceRange({
      min: 0,
      max: 100000
    });
    setStar(0);
    setSearchQuery('');
    setProducts([]);
  };

  
  const getAllProducts = async () => {
        try {
      const product='User';
      const { data } = await axios.get(`${API_URL}/api/v1/product/all-products?type=${product}?userId=${auth.user._id}`);
      if(Array.isArray(data?.data)){
        setProducts(data.data.slice(0, -1));
      }else{
        setProducts([])
        toast.error("Unexpected data format received.");
      }
    } catch (error) {
      // toast.error(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };


  // get Categories
  const getAllCategories=async()=>{
    try {
      let response=await axios.get(`${API_URL}/api/v1/categories/all-category`);
      // setCategories(data.data);
      let result =await response?.data;
      if(result.code==200){
        const filterData=result?.data?.slice(0,-1);
        const categoriesData = await filterData.map((category) => ({
          id: category._id, // Include _id
          name: category.name // Keep the name
        }));
        setCategories(categoriesData);
        return categoriesData;
      }
      throw new Error("Failed to fetch categories");
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }



  // fillter API
  const getProductFilters=async(query='',currentLimit)=>{
    try {
      const requestData={
        checked:checked,
        radioMin:priceRange.min,
        radioMax:priceRange.max,
        search:query,
      }
      if(auth?.user?._id){
        requestData.userId=auth?.user?._id
      }
      if (currentLimit) {
        requestData.limit = currentLimit;
      }
      const response=await axios.post(`${API_URL}/api/v1/product/product-filters`,requestData);
      const resp=response?.data;
      const wishlistedProduct={};
      if(resp.code===200){
        setProducts(resp?.data.slice(0, -1));
        resp?.data.slice(0,-1).forEach((product)=>{
          wishlistedProduct[product._id]=product.isWishListed
        });
        setIsWishlisted(wishlistedProduct);
        console.log(resp?.data[resp?.data.length-1].limit);
        // const pagination = resp.data[resp.data.length - 1]
        // setTotalRecords(pagination.pages * pagination.limit);
        return resp?.data.slice(0, -1);
      }
      // toast.success('Filter Product Fetch Succesfully');
      throw new Error("Failed to fetch products");
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }


  // wishlist API
  const handleToggleWishlist=async(productId)=>{
    if(!auth.user){
      toast.warning('Please Login First');
    }else{
      setIsWishlisted((prev) => ({
        ...prev,
        [productId]: !prev[productId], // Immediately State Update
      }));
    }  
    try {
      const response=await axios.get(`${API_URL}/api/v1/product/toggle-product-wishlist?userId=${auth.user._id}&productId=${productId}`);
      const resp=await response?.data;
      if(resp?.code===200){
        if(resp?.message=="Wishlist item added successfully."){
          toast.success(resp?.message);
        }else if(resp?.message==='Wishlist item removed successfully.'){
          toast.error(resp?.message);
        }
        setWishlist(
          {
            ...wishlist,
          }
        )
      }else{
        toast.error(resp?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }


  // search Product API
  const handleSearchAllProduct=async(query)=>{
    try {
      const requestQuery=new URLSearchParams();
      if(query){
        requestQuery.append('search',query);
      }
      if(auth?.user?._id){
        requestQuery.append('userId',auth?.user._id);
      }
      const response=await axios.get(`${API_URL}/api/v1/product/search-product?${requestQuery.toString()}`)
      const resp=await response?.data;
      // const searchQuery = encodeURIComponent(query).replace(/%20/g, '+');
      // navigate(`/search/?q=${searchQuery}`);
      if(resp?.code===200){
        setProducts(resp?.data.slice(0, -1));
      }else{
        toast.error(resp?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  const handleFilter=(value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter((category)=>category!==id)
    }
    setChecked(all);
  }

  const handlePriceRange=(value)=>{
    setPriceRange(value);
  }


  const handleRating=(value)=>{
    setStar(Number(value));
  }

  const handleSearch=async(e)=>{
    const query=e.target.value;
      setSearchQuery(query);
    if(checked.length===0){
      toast.error('Please Select at least one Categories.');
    }else{
      await getProductFilters(query);
    }
  }

  const onChangeLimit=async(e)=>{
    const newLimit = e.target.value;
    setLimit(newLimit);
    await getProductFilters('',newLimit);
  }

  // search prodoct all
  const handleProductSearch=async(e)=>{
    const query=e.target.value;
    setProductSearch(query);
    await handleSearchAllProduct(query);
  }

  const toggleWishlist = async (productId) => {
    setWishlist((prev) => {
      const updatedWishlist = {
        ...prev,
        [productId]: !prev[productId],
      };
      handleToggleWishlist(productId); // Pass the productId if needed
      return updatedWishlist;
    });

    
    setWishlist((prev) => ({
      ...prev,
      [productId]:!prev[productId]
    }));
  };



  useEffect(() => {
    getAllCategories();
    if(auth.user){
      getProductFilters();
    }else{
      getAllProducts();
    }
    setShowModal(true);
    // getProductFilters();
    // setShowModal(true);
    // if(!checked.length||!priceRange.min.length||!priceRange.max.length){
    //   getAllProducts();
    // }
  // }, [checked,priceRange.max]);

  },[auth.user]);

  useEffect(()=>{
    if(checked.length||priceRange.min||priceRange.max){
      getProductFilters();
    }

  },[checked,priceRange]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleHover = (productId) => {
    setHoveredImages((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const gridItem = (product) => (
    <div className="product-card col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
      <div 
        className="p-4 border-1 surface-border surface-card border-round" 
        onMouseEnter={() => toggleHover(product._id)} 
        onMouseLeave={() => toggleHover(product._id)}
        onClick={()=>{
          // navigate(`/product/${product.slug}`);
          const query=encodeURIComponent(product.slug).replace(/%20/g,'+')
          setTimeout(()=>{
            navigate(`/product/${query}/prd/${product._id}`)
          },1000)
        }}
      >
        <div className="relative">
          <img 
            // className="w-9 shadow-2 border-round"
            className="product-image w-9 shadow-2 border-round"
            src={hoveredImages[product._id] && product.imageList[1] ? product.imageList[1] : product.imageList[0]} 
            alt={product.name} 
          />
          <Button
            icon={<HeartButton isActive={isWishlisted[product._id]}/>}
            className="p-button-rounded p-button-secondary absolute" 
            onClick={() => toggleWishlist(product._id)} 
            style={{ 
              borderRadius: '50%', 
              backgroundColor: 'white', 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px' 
            }} 
          />
        </div>
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-2">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag"></i>
            <span className="font-semibold">{product.category.name}</span>
          </div>
          <Tag value={product.isActive ? "INSTOCK" : "OUTOFSTOCK"} severity={getSeverity(product)} />
        </div>
        <div className="flex flex-column align-items-center gap-3 py-2">
          <div className="text-2xl font-bold">{product.name}</div>
          <Rating value={5} readOnly cancel={false} />
        </div>
        <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold">₹{product.price}</span>
        </div>
      </div>
    </div>
  );

  const listItem = (product, index) => (
    <div className="col-12" key={product._id}>
      <div 
        className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })} 
        onMouseEnter={() => toggleHover(product._id)} 
        onMouseLeave={() => toggleHover(product._id)}
      >
        <div className="relative" style={{ width: '220px', height: 'auto' }}>
          <img 
            className="w-full shadow-2 block xl:block mx-auto border-round" style={{cursor:'pointer'}}
            src={hoveredImages[product._id] && product.imageList[1] ? product.imageList[1] : product.imageList[0]} 
            alt={product.name} 
          />
          <Button 
            icon={<HeartButton isActive={wishlist[product._id]} />} 
            className="p-button-rounded p-button-secondary absolute" 
            onClick={() => toggleWishlist(product._id)} 
            style={{ 
              borderRadius: '50%', 
              backgroundColor: 'white', 
              position: 'absolute', 
              bottom: '10px', 
              right: '10px' 
            }} 
          />
        </div>
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-lg font-semibold text-900">{product.name}</div>
            <Rating value={5} readOnly cancel={false} />
            <div className="flex align-items-center gap-3">
              <span className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{product.category.name}</span>
              </span>
              <Tag value={product.isActive ? "INSTOCK" : "OUTOFSTOCK"} severity={getSeverity(product)} />
            </div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-xl font-semibold">${product.price}</span>
            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={!product.isActive} />
          </div>
        </div>
      </div>
    </div>
  );

  const itemTemplate = (product, layout, index) => {
    if (!product) return;
    return layout === 'list' ? listItem(product, index) : gridItem(product);
  };

  const listTemplate = (products, layout) => (
    <div className="grid grid-nogutter">
      {
        products.length>0?(
          products?.map((product, index) => itemTemplate(product, layout, index))
        ):(
          // <div>No products found.</div>
          <section className="page_404">
          <div className="four_zero_four_bg">
            <h1 className="text-center" style={{color:"red"}}>404</h1>
          </div>
          <div className="contant_box_404">
          <h3 className="h2">Oops ! Product Not Found</h3>
            <p>The product of page you are looking for is not available!</p>
            <a href="/" className="link_404">Go to Home</a>
          </div>
        </section>
        )
      }
    </div>
  );
    
  const header = () => (
    <div className="flex justify-content-end">
      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    </div>
  );

  return (
    <>
      <Header />
      <Dialog
        header={<div style={{ textAlign: 'center', paddingLeft: '20px', fontSize: '24px' }}>Special Offer</div>}
        visible={showModal}
        onHide={handleCloseModal}
      >
        <img
          src="https://cdn3.mageplaza.com/media/general/MImGnKu.png"
          alt="Offer"
          style={{ width: '100%' }}
        />
      </Dialog>
      <div className="flex">
        {/* Filter section */}
        <div className="flex flex-column bg-white p-3 border-round shadow-2" style={{ width: '260px', marginRight: '20px' }}>
        <h3 className="text-xl font-semibold mb-3">Filters</h3>

<h4 className="font-medium mb-2">Categories</h4>

{Array.isArray(categories) && categories.length > 0 ? (
categories.map((category) => (
<div key={category} className="flex align-items-center mb-2">
  <input type="checkbox" id={category.id} className="mr-2" onClick={(e)=>{
    handleFilter(e.target.checked,category.id);
  }} />
  <label htmlFor={category.id} className="cursor-pointer">{category.name}</label>
</div>
))
) : (
<p>No categories found</p>
)}




          <h4 className="font-medium mt-3 mb-2">Brand</h4>
          <input 
            type="text" 
            placeholder="Enter Brand name" 
            className="p-inputtext p-component w-full mb-2" 
            value={searchQuery}
            onChange={handleSearch}
          />
          

          <h4 className="font-medium mt-3 mb-2">Price Range</h4>
          <input 
            type="range" 
            min="0" 
            max="100000" 
            className="w-full mb-2" 
            value={priceRange.max}
            onChange={(e) => handlePriceRange({
              ...priceRange,max:e.target.value
            })}
          />
          <div className="text-center mb-2">
          ₹{priceRange.min} - ₹{priceRange.max}
          </div>
          


          <h4 className="font-medium mt-0 mb-2">Rating</h4>
          {starValues.map((value) => (
            <div key={value} className="flex align-items-center mb-2">
              <input 
                type="radio" 
                id={`rating-${value}`} 
                name="rating" 
                value={value} 
                className="mr-2" 
                style={{ display: 'none' }} 
                checked={star===value}
                onChange={(e)=>{
                  handleRating(e.target.value);
                }}
              />
              <label 
                htmlFor={`rating-${value}`} 
                className="cursor-pointer flex align-items-center"
                onClick={()=>handleRating(value)}
                >
                {[...Array(value)].map((_, i) => (
                  <i key={i} className="pi pi-star text-yellow-500" style={{ fontSize: '1.5rem', marginRight: '2px' }}></i>
                ))}
                {[...Array(5 - value)].map((_, i) => (
                  <i key={i} className="pi pi-star text-gray-300" style={{ fontSize: '1.5rem', marginRight: '2px' }}></i>
                ))}
              </label>
              {star === value && <span className="ml-2">{value}</span>}
            </div>
          ))}

          <Button 
            label="Clear Filters" 
            onClick={clearFilters} 
            className="mt-2 p-button-secondary" 
            style={{ width: '100%', backgroundColor: '#FF6F61', borderColor: '#FF6F61' }} 
          />
        </div>

        <div className="card flex-1" style={{ marginTop: '10px' }}>
            {/* search Input */}
      

<div style={{ position: 'relative',left:'220px',alignItems:'center', maxWidth: '50rem', width: '80%',bottom:'10px' }}>
    <InputText
        type="text"
        placeholder="Search for items, brands, and more"
        className="p-inputtext p-component"
        style={{
            width: '100%',
            borderRadius: '50px',
            border: '1px solid #d0d0d0',
            padding: '12px 40px 12px 40px',
            fontSize: '16px',
            transition: 'border-color 0.3s',
        }}
        value={productSearch}
        onChange={handleProductSearch}
        onFocus={(e) => {
            e.target.style.borderColor = '#0071e1'; 
        }}
        onBlur={(e) => {
            e.target.style.borderColor = '#d0d0d0'; 
        }}
    />
    <span
        style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none', 
            color: '#999', 
        }}
    >
        <i className="fa fa-search" aria-hidden="true"></i>

    </span>
</div>

                <h1>All Products</h1>


          {JSON.stringify(checked,null,4)}
          {JSON.stringify(priceRange,null,4)}
          {JSON.stringify(star,null,4)}
          {JSON.stringify(wishlist,null,4)}
          Lentth:
          {JSON.stringify(products.length,null,4)};
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',marginBottom:'15px',marginTop:'-60px' }}>
          <Dropdown value={limit}
          onChange={onChangeLimit}
          options={[10,20,30,50,100,'All']}
          optionLabel="Limit"
          placeholder="Select Limit"
          className="w-full md:w-14rem ml-8"
          style={{ width: '100%', maxWidth: '14rem', marginLeft: '8px' }}
          />
          </div>

          <div style={{
            maxHeight:'550px'
          }}>
          <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
          </div>
          <div className='mt-4 pt-6'>

          {/* <Paginator first={(currentPage-1)*rows}
          rows={rows}
          totalRecords={totalRecords} 
          onChange={onPageChange} 
          /> */}
        
          </div>
        </div>
      </div>
    </>
  );
}

const HeartButton = ({ isActive }) => (
  <button type="button" className={`heart-button ${isActive ? 'is-active' : ''}`}>
    <svg width="18" height="16" viewBox="0 0 18 16">
      <path
        d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
        stroke="#2D2D2D"
        strokeWidth="1"
        style={{ fill: isActive ? '#191919' : 'transparent' }}
      />
    </svg>
  </button>
);

const getSeverity = (product) => {
  return product.isActive ? 'success' : 'danger';
};

export default HomePage;

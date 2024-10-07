import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useSearch } from '../context/Search';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { API_URL } from '../constants/constants';
import axios from 'axios';
import { useAuth } from '../context/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [search,setSearch]=useSearch();
    const [auth]=useAuth();
    const [layout, setLayout] = useState('grid');
    const [isWishlisted,setIsWishlisted]=useState({});
    const [wishlist, setWishlist] = useState({});
    const [hoveredImages, setHoveredImages] = useState({});
    const navigate=useNavigate();




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

    // const handlesearchSearch = (fetchedsearch) => {
    //     setSearch(fetchedsearch);
    // };
        console.log(setSearch);

    const toggleWishlist = async (productId) => {
        setWishlist((prev) => {
          const updatedWishlist = {
            ...prev,
            [productId]: !prev[productId],
          };
          handleToggleWishlist(productId); 
          return updatedWishlist;
        });
    
        
        setWishlist((prev) => ({
          ...prev,
          [productId]:!prev[productId]
        }));
      };


    const getSeverity = (search) => {
        switch (search.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return null;
        }
    };

      const header = () => (
        <div className="flex justify-content-end">
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      );
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
          >
            <div className="relative">
              <img 
                // className="w-9 shadow-2 border-round"
                className="product-image w-9 shadow-2 border-round"
                src={hoveredImages[product._id] && product.imageList[1] ? product.imageList[1] : product.imageList[0]} 
                alt={product.name} 
                onClick={()=>{
                  navigate(`/product/${product.slug}/prd/${product._id}`);
                }}
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

      const listTemplate = (search, layout) => (
      <div className="grid grid-nogutter">
        {
          search.results.length>0?(
            search?.results?.map((product, index) => itemTemplate(product, layout, index))
          ):(
            // <div>No products found.</div>
            <section className="page_404" >
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

    return (
        <>
            <Header />
            {/* <SearchInput onSearch={handlesearchSearch} /> */}
            {/* <div className={`grid ${layout === 'grid' ? 'grid-cols-3' : 'grid-cols-1'}`}>
                {search?.results?.length > 0 ? search?.results?.map(renderItem) : <div>No searchs found</div>} */}
                {/* {JSON.stringify(search.results,null,4)} */}
            {/* </div> */}
            {/* <DataView value={search} listTemplate={listTemplate} layout={layout} header={header()} /> */}
            

            {/* scroll */}
            <div 
    style={{ 
      maxHeight: '630px',
      overflowY: 'auto', 
      marginTop: '10px', 
      border: '1px solid #d0d0d0', 
      borderRadius: '4px', 


    }}
      
  >
    <DataView 
      value={search} 
      listTemplate={listTemplate} 
      layout={layout} 
      header={header()} 
    />
  </div>
        </>
    );
};

export default Search;

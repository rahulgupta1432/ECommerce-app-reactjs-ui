// import '../styles/HomePage.css'
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { API_URL } from '../constants/constants';
// import { Button } from 'primereact/button';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
// import { classNames } from 'primereact/utils';
// import { Dialog } from 'primereact/dialog';

// function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [layout, setLayout] = useState('grid');
//   const [wishlist, setWishlist] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get(`${API_URL}/api/v1/product/all-products`);
//       setProducts(data.data.slice(0, -1)); // Remove the last object which is metadata
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const toggleWishlist = (productId) => {
//     setWishlist((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   useEffect(() => {
//     getAllProducts();
//     setShowModal(true);
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const getSeverity = (product) => {
//     return product.isActive ? 'success' : 'danger';
//   };

//   const HeartButton = ({ isActive, onClick }) => (
//     <button type="button" className={`heart-button ${isActive ? 'is-active' : ''}`} onClick={onClick}>
//       <svg width="18" height="16" viewBox="0 0 18 16">
//         <path
//           d="M9.01163699,14.9053769 C8.72930024,14.7740736 8.41492611,14.6176996 8.07646224,14.4366167 C7.06926649,13.897753 6.06198912,13.2561336 5.12636931,12.5170512 C2.52930452,10.4655288 1.00308384,8.09476443 1.00000218,5.44184117 C0.997549066,2.99198843 2.92175104,1.01242822 5.28303025,1.01000225 C6.41066623,1.00972036 7.49184369,1.4629765 8.28270844,2.2678673 L8.99827421,2.9961237 L9.71152148,2.26559643 C10.4995294,1.45849728 11.5791258,1.0023831 12.7071151,1.00000055 L12.7060299,1.00000225 C15.0693815,0.997574983 16.9967334,2.97018759 17.0000037,5.421337 C17.0038592,8.07662382 15.4809572,10.4530151 12.8850542,12.5121483 C11.9520963,13.2521931 10.9477036,13.8951276 9.94340074,14.4354976 C9.60619585,14.6169323 9.29297309,14.7736855 9.01163699,14.9053769 Z"
//           stroke="#2D2D2D"
//           strokeWidth="1"
//           style={{ fill: isActive ? '#191919' : 'transparent' }}
//         />
//       </svg>
//     </button>
//   );

//   const listItem = (product, index) => (
//     <div className="col-12" key={product._id}>
//       <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
//         <div className="relative" style={{ width: '220px', height: 'auto' }}> {/* Adjusted width */}
//           <img className="w-full shadow-2 block xl:block mx-auto border-round" src={product.imageList[0]} alt={product.name} />
//           <Button 
//             icon={<Heart className={wishlist[product._id] ? 'text-red-500' : 'text-gray-500'} />} 
//             className="p-button-rounded p-button-secondary absolute" 
//             onClick={() => toggleWishlist(product._id)} 
//             style={{ 
//               borderRadius: '50%', 
//               backgroundColor: 'white', 
//               position: 'absolute', 
//               bottom: '10px', 
//               right: '10px' 
//             }} 
//           />
//         </div>
//         <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//           <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//             <div className="text-lg font-semibold text-900">{product.name}</div> {/* Adjusted font size */}
//             <Rating value={5} readOnly cancel={false} />
//             <div className="flex align-items-center gap-3">
//               <span className="flex align-items-center gap-2">
//                 <i className="pi pi-tag"></i>
//                 <span className="font-semibold">{product.category.name}</span>
//               </span>
//               <Tag value={product.isActive ? "INSTOCK" : "OUTOFSTOCK"} severity={getSeverity(product)} />
//             </div>
//           </div>
//           <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//             <span className="text-xl font-semibold">${product.price}</span> {/* Adjusted font size */}
//             <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={!product.isActive} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
    

//   const gridItem = (product) => (
//     <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
//       <div className="p-4 border-1 surface-border surface-card border-round">
//         <div className="relative">
//           <img className="w-9 shadow-2 border-round" src={product.imageList[0]} alt={product.name} />
//           <HeartButton isActive={wishlist[product._id]} onClick={() => toggleWishlist(product._id)} />
//         </div>
//         <div className="flex flex-wrap align-items-center justify-content-between gap-2 mt-2">
//           <div className="flex align-items-center gap-2">
//             <i className="pi pi-tag"></i>
//             <span className="font-semibold">{product.category.name}</span>
//           </div>
//           <Tag value={product.isActive ? "INSTOCK" : "OUTOFSTOCK"} severity={getSeverity(product)} />
//         </div>
//         <div className="flex flex-column align-items-center gap-3 py-2">
//           <div className="text-2xl font-bold">{product.name}</div>
//           <Rating value={5} readOnly cancel={false} />
//         </div>
//         <div className="flex align-items-center justify-content-between">
//           <span className="text-2xl font-semibold">${product.price}</span>
//         </div>
//       </div>
//     </div>
//   );

//   const itemTemplate = (product, layout, index) => {
//     if (!product) return;
//     return layout === 'list' ? listItem(product, index) : gridItem(product);
//   };

//   const listTemplate = (products, layout) => (
//     <div className="grid grid-nogutter">
//       {products.map((product, index) => itemTemplate(product, layout, index))}
//     </div>
//   );

//   const header = () => (
//     <div className="flex justify-content-end">
//       <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//     </div>
//   );

//   return (
//     <>
//       <Dialog
//         header={<div style={{ textAlign: 'center', paddingLeft: '20px', fontSize: '24px' }}>Special Offer</div>}
//         visible={showModal}
//         onHide={handleCloseModal}
//       >
//         <img
//           src="https://cdn3.mageplaza.com/media/general/MImGnKu.png"
//           alt="Offer"
//           style={{ width: '100%' }}
//         />
//       </Dialog>
//       <div className="flex">
//         <div style={{ width: '200px', marginRight: '20px' }}>
//           {/* Place your filter checkboxes here */}
//           <h3>Filters</h3>
//           {/* Example checkbox */}
//           <div>
//             <input type="checkbox" id="filter1" />
//             <label htmlFor="filter1">Filter 1</label>
//           </div>
//           {/* Add more filters as needed */}
//         </div>
//         <div className="card">
//           <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
//         </div>
//       </div>
//     </>
//   );
  
// }

// export default HomePage;



import '../styles/HomePage.css'
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


function HomePage() {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState('grid');
  const [wishlist, setWishlist] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    company: '',
    priceRange: [0, 10000],
    rating: null,
    categories: [],
  });

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Toys'];
// const companies = ['Company A', 'Company B', 'Company C'];

const clearFilters = () => {
  setFilters({ company: '', priceRange: [0, 10000], rating: null, categories: [] });
};

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/product/all-products`);
      setProducts(data.data.slice(0, -1)); // Remove the last object which is metadata
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  useEffect(() => {
    getAllProducts();
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getSeverity = (product) => {
    return product.isActive ? 'success' : 'danger';
  };

  const HeartButton = ({ isActive, onClick }) => (
    <button type="button" className={`heart-button ${isActive ? 'is-active' : ''}`} onClick={onClick}>
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

  const listItem = (product, index) => (
    <div className="col-12" key={product._id}>
      <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
        <div className="relative" style={{ width: '220px', height: 'auto' }}> {/* Adjusted width */}
          <img className="w-full shadow-2 block xl:block mx-auto border-round" src={product.imageList[0]} alt={product.name} />
          <Button 
            icon={<HeartButton className={wishlist[product._id] ? 'text-red-500' : 'text-gray-500'} />} 
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
            <div className="text-lg font-semibold text-900">{product.name}</div> {/* Adjusted font size */}
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
            <span className="text-xl font-semibold">${product.price}</span> {/* Adjusted font size */}
            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={!product.isActive} />
          </div>
        </div>
      </div>
    </div>
  );
    

  const gridItem = (product) => (
    <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
      <div className="p-4 border-1 surface-border surface-card border-round">
        <div className="relative">
          <img className="w-9 shadow-2 border-round" src={product.imageList[0]} alt={product.name} />
          <HeartButton isActive={wishlist[product._id]} onClick={() => toggleWishlist(product._id)} />
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
          <span className="text-2xl font-semibold">${product.price}</span>
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
      {products.map((product, index) => itemTemplate(product, layout, index))}
    </div>
  );

  const header = () => (
    <div className="flex justify-content-end">
      <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    </div>
  );

  return (
    <>
    <Header/>
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
        {/* filter */}
        <div className="flex flex-column bg-white p-3 border-round shadow-2" style={{ width: '260px', marginRight: '20px' }}>
  <h3 className="text-xl font-semibold mb-3">Filters</h3>

  <h4 className="font-medium mb-2">Categories</h4>
  {categories.map((category) => (
    <div key={category} className="flex align-items-center mb-2">
      <input type="checkbox" id={category} className="mr-2" />
      <label htmlFor={category} className="cursor-pointer">{category}</label>
    </div>
  ))}

  <h4 className="font-medium mt-3 mb-2">Company</h4>
  <input 
    type="text" 
    value={filters.company} 
    onChange={(e) => setFilters({ ...filters, company: e.target.value })} 
    placeholder="Enter company name" 
    className="p-inputtext p-component w-full mb-2"
  />

  <h4 className="font-medium mt-3 mb-2">Price Range</h4>
  <input 
    type="range" 
    min="0" 
    max="100000" 
    value={filters.priceRange[1]} 
    onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], e.target.value] })} 
    className="w-full mb-2"
  />
  <div className="text-center mb-2">₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</div>

  <h4 className="font-medium mt-0 mb-2">Rating</h4>
  {[5, 4, 3, 2, 1].map((star) => (
    <div key={star} className="flex align-items-center mb-2">
      <input 
        type="radio" 
        id={`rating-${star}`} 
        name="rating" 
        value={star} 
        onChange={(e) => setFilters({ ...filters, rating: e.target.value })} 
        className="mr-2" 
        style={{ display: 'none' }} 
      />
      <label 
        htmlFor={`rating-${star}`} 
        className="cursor-pointer flex align-items-center t-1"
        onClick={() => setFilters({ ...filters, rating: star })}
      >
        {[...Array(star)].map((_, i) => (
          <i key={i} className="pi pi-star text-yellow-500" style={{ fontSize: '1.5rem', marginRight: '2px' }}></i>
        ))}
        {[...Array(5 - star)].map((_, i) => (
          <i key={i} className="pi pi-star text-gray-300" style={{ fontSize: '1.5rem', marginRight: '2px' }}></i>
        ))}
      </label>
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
    <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
  </div>
</div>

    </>
  );
  
}

export default HomePage;




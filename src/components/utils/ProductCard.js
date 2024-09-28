// ProductCard.js
import React from 'react';
import { Card } from 'primereact/card';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const ProductCard = ({ product, toggleWishlist, isWishlisted }) => {
  return (
    <div className='col-md-4 mb-2'>
      <Card
        style={{
          // width: '70%',
          // minHeight: '200px',
          // position: 'relative',
          // border: '1px solid #ddd',
          // borderRadius: '10px',
          // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          // margin: '8px auto',
          width: '100%', // Use 100% width
          maxWidth: '300px', // Set a max width for larger screens
          minHeight: '200px',
          position: 'relative',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          margin: '16px', // Add margin for spacing
      
        }}
      >
        <img
          src={product.imageList[0]}
          alt={product.name}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0',
          }}
        />
        <div
          onClick={() => toggleWishlist(product._id)}
          style={{
            position: 'absolute',
            marginTop: '-40px',
            right: '8px',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          {isWishlisted ? (
            <AiFillHeart size={24} color="#ff0000" />
          ) : (
            <AiOutlineHeart size={24} color="#000000" />
          )}
        </div>
        <div className='p-3'>
          <h4 style={{ fontWeight: '1px', marginBottom: '5px' }}>{product.name}</h4>
          <h5 style={{ color: '#28a745' }}>₹{product.price}</h5>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;






// // HomePage.js
// import React, { useEffect, useState } from 'react';
// import Layout from '../components/Layout/Layout';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { API_URL } from '../constants/constants';
// // import HeroSection from '../components/utils/HeroSection'; // Import the HeroSection
// import ProductCard from '../components/utils/ProductCard'; // Import the ProductCard
// import { Dialog } from 'primereact/dialog';
// import '../styles/HomePage.css';

// function HomePage() {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState({});
//   const [showModal, setShowModal] = useState(false);

//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get(`${API_URL}/api/v1/product/all-products`);
//       setProducts(data.data.slice(0, -1));
//     } catch (error) {
//       toast.error(error.response?.data?.message);
//     }
//   };

//   const toggleWishlist = (productId) => {
//     setWishlist(prev => ({
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

//   const modalFooter = (
//     <div>
//       <button onClick={handleCloseModal}>Close</button>
//     </div>
//   );

//   return (
//     <Layout title={'All Products - Best Offers'}>
//       {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
//         <div style={{ flex: 1, padding: '20px' }}>
//           <HeroSection />
//         </div>

//         <div className='fixed-image'>
//           <img
//             src='/hero4.png'
//             alt="Promotional"
//             style={{ width: '70vw', marginLeft: '-1000px', marginTop: '-100px', borderRadius: '10px' }}
//           />
//         </div>
//       </div> */}

//       {/* Below Sections */}
//       <div className='row mt-3'>
//         <div className='col-md-3'>
//           <h4 className='text-center'>Filter by Category</h4>
//         </div>

//         <div className='col-md-9'>
//           <h1 className='text-center'>All Products</h1>
//           <div className='d-flex flex-wrap justify-content-center'>
//           {products.map(product => (
//               <ProductCard
//                 key={product._id}
//                 className='col-6 col-md-4 col-lg-3 mb-3'
//                 product={product}
//                 toggleWishlist={toggleWishlist}
//                 isWishlisted={wishlist[product._id]}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <Dialog
//         header={<div style={{ textAlign: 'center', paddingLeft: '20px', fontSize: '24px' }}>Special Offer</div>}
//         visible={showModal}
//         onHide={handleCloseModal}
//         footer={modalFooter}
//       >
//         <img
//           src="https://cdn3.mageplaza.com/media/general/MImGnKu.png"
//           alt="Offer"
//           style={{ width: '100%' }}
//         />
//       </Dialog>
//     </Layout>
//   );
// }

// export default HomePage;

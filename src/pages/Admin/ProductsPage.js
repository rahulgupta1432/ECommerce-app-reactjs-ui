import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Header from '../../components/Layout/Header';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import AddProduct from './Product/AddProduct';

const productsPage = () => {
  const [products,setProducts]=useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  const [ setShowAddProductModal] = useState(false);
  // showAddProductModal,
  const getAllProducts = async (query = '') => {
    try {
        const response = await axios.get(`${API_URL}/api/v1/product/all-products?search=${query}`);
        let result = await response.data;
        if (result.code === 200) {
            const filteredData = result.data.slice(0, -1);
            return filteredData.map(product => ({
                id: product._id,
                name: product.name,
                slug:product.slug,
                price: Math.floor(Math.random() * 100) + 10 ? Math.floor(Math.random() * 100) + 10 : 5.4,
                description: product.description,
                category:product.category.name,
                imageList: product.imageList.length > 0 ? product.imageList[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'
              }));
        }
        throw new Error("Failed to fetch categories");
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log("query", query);
    const data = await getAllProducts(query);
    setProducts(data);
};

useEffect(()=>{
  getAllProducts().then((data)=>{
    setProducts(data)
  })
},[]);



const imageBodyTemplate = (product) => {
  return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0' }}>
          <img 
              src={`${product.imageList}`} 
              alt={product.name} 
              style={{ width: '100px', height: 'auto', margin: '0 10px' }} // Adjust the margin as needed
              className="shadow-2 border-round"
          />
      </div>
  );
};




const header = (
  <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <input type="text" placeholder="Search Categories" style={{
          border: 'none',
          display: 'flex',
          padding: '0.75rem 1.5rem',
          color: 'black',
          fontSize: '0.75rem',
          lineHeight: '1rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          borderRadius: '0.5rem',
      }}
      value={searchQuery}
      onChange={handleSearch}
      />

      <button onClick={() => setShowAddProductModal(true)}
          style={{
              border: 'none',
              display: 'flex',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#488aec',
              color: '#ffffff',
              fontSize: '0.75rem',
              lineHeight: '1rem',
              fontWeight: 700,
              textAlign: 'center',
              cursor: 'pointer',
              textTransform: 'uppercase',
              verticalAlign: 'middle',
              alignItems: 'center',
              borderRadius: '0.5rem',
              userSelect: 'none',
              gap: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(72, 138, 236, 0.19), 0 2px 4px -1px rgba(72, 138, 236, 0.10)',
              transition: 'all 0.6s ease',
          }}
          onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(72, 138, 236, 0.31), 0 4px 6px -2px rgba(72, 138, 236, 0.10)';
          }}
          onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(72, 138, 236, 0.19), 0 2px 4px -1px rgba(72, 138, 236, 0.10)';
          }}
      >
          <svg
              aria-hidden="true"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '1.25rem', height: '1.25rem' }}
          >
              <path
                  strokeWidth="2"
                  stroke="#ffffff"
                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                  strokeLinejoin="round"
                  strokeLinecap="round"
              />
              <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  stroke="#ffffff"
                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
              />
          </svg>
          ADD 
      </button>
      
  </div>
);

const footer = `In total there are ${products ?products.length : 0} products.`;

  return (
  //   <Layout title={'Dashboard - All products'}>
  //     <div className='container-fluid m-3 p-3'>
  //   <div className='row'>

  //     <div className='col-md-3'>

  //       <AdminMenu />
  //     </div>
  //     <div className='col-md-9'>
  //   <h1>products</h1>
  //     </div>
  //   </div>
  //   </div>

  // </Layout>
  <>
  <Header/>
  <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-2">
                        <AdminMenu />
                    </div>
                    <div className="col-md-10">
                        <span className="text-xl text-900 font-bold">All Products</span>
                        <div className="card">
                            <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '100%' }}>
                                <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                                <Column 
    header={<div style={{ textAlign: 'left', marginBottom: '10px',marginTop:'10px',marginLeft:'30px' }}>Image</div>} 
    body={imageBodyTemplate} 
    // className='d-flex justify-content-start' 
/>
                                <Column field="name" header="name">Name</Column>
                <Column field="category" header="Category" />
                <Column field="description" header="Description" />
                                <Column field="price" header="MRP" />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>

        

  
  
  </>
  )
}

export default productsPage

// import React from 'react'
// import UserMenu from '../../components/Layout/UserMenu'
// import Layout from '../../components/Layout/Layout'

// const OrdersPage = () => {
//   return (
//     <Layout title={'Dashboard - Fusion-Store'}>
//             <div className='container-fluid m-3 p-3'>
//                 <div className='row'>
//                     <div className='col-md-3'>
//                         <UserMenu />
//                     </div>
//                     <div className='col-md-9'>
//                       Order Pages


//                     </div>
//                 </div>
//             </div>
//         </Layout>
//   )
// }

// export default OrdersPage

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import Header from '../../components/Layout/Header';
import { useAuth } from '../../context/Auth';
import AdminMenu from '../../components/Layout/AdminMenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiEye } from "react-icons/fi";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

const OrdersPage = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();
  const navigate=useNavigate();

  useEffect(() => {
    getAllOrders();
  }, [auth?.user?._id])
  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/admin/get-orders`);
      const resp = response.data;
      if (resp?.code === 200) {
        setOrder(resp?.data.slice(0, -1));
        console.log(order)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const statusOptions = [
    { label: 'Placed', value: 'Placed' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Delivered', value: 'Delivered' }
  ];
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/api/v1/admin/update-status/order`, {
        orderId,
        status: newStatus
      });
      if (response.data?.code === 200) {
        toast.success('Order status updated successfully');
        getAllOrders();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const statusBodyTemplate = (rowData) => {
    const colorMap = {
      'Placed': '#007bff',
      'Shipped': '#FFA500',
      'Cancelled': 'red',
      'Delivered': 'green',
    };
  
    const selectedColor = colorMap[rowData.status];
  
    return (
      <div>
        <Dropdown
          value={rowData.status}
          options={statusOptions}
          onChange={(e) => updateOrderStatus(rowData._id, e.value)}
          placeholder="Select Status"
          itemTemplate={(option) => (
            <span style={{ color: colorMap[option.value] }} className='mt-4'>
              {option.label}
            </span>
          )}
          valueTemplate={(option) => (
            <span style={{ color: selectedColor }}>
              {option ? option.label : 'Select Status'}
            </span>
          )}
          style={{ width: '150px' }}
        />
      </div>
    );
  };
  
  

  // template function 
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <input type="text" placeholder="Search Product" style={{
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

      />

      <button
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
        Export
      </button>
    </div>
  );

  const footer = `In total there are ${order ? order.length : 0} orders.`;
  const imageBodyTemplate = (order) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0' }}>
        <img
          src={`${order.product[0].imageList[0]}`}
          alt={order.name || 'Order name'}
          style={{
            width: '100px', // Fixed width
            height: '100px', // Fixed height
            objectFit: 'cover', // Ensures the image covers the area without distortion
            margin: '0 10px'
          }}
          className="shadow-2 border-round"
        />
      </div>
    );
  };
  const descriptionBodyTemplate = (rowData) => {
    return (
      <span title={rowData.description}>
        {truncateText(rowData.description, 40)} {/* Adjust the length as needed */}
      </span>
    );
  };
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };
  const actionBodyTemplate = () => {
    return (
      <div className='flex gap-2'>
        <Button icon="pi pi-pencil" className='p-button-secondary' style={{ borderRadius: '6px', height: '30px' }} />
        <Button icon="pi pi-trash" className='p-button-danger' style={{ borderRadius: '6px', height: '30px' }} />

      </div>
    )
  }
  console.log(imageBodyTemplate, descriptionBodyTemplate, actionBodyTemplate, DataTable, Column, header, footer,navigate)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Header title={'Dashboard - Fusion-Store'} />
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminMenu />
          </div>

          <div className='col-md-10'>
            <span className="text-xl text-900 font-bold ml-4">All Orders</span>
            <div className="card">
              <DataTable value={order} header={header} footer={footer} tableStyle={{ minWidth: '100%' }}>
                <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                <Column header="Order ID"
                  body={(rowData) => rowData._id}
                  style={{ width: '5%', marginRight: '20px' }} />
                  <Column header="Customer Name"
                  body={(rowData) => rowData.buyer.username}
                  style={{ width: '5%', marginRight: '20px',padding:'40px' }} />
                <Column
                  header={<div style={{ textAlign: 'left', marginBottom: '10px', marginTop: '10px', marginLeft: '30px' }}>Image</div>}
                  body={imageBodyTemplate} />
                <Column header="Total Payment"
                  body={(rowData) => rowData.totalPayment ? rowData.totalPayment : 'Not Found'} style={{padding:'20px'}}/>
                  <Column header="Payment Mode"
                  body={(rowData) => rowData.paymentMode||"OTHER"}
                  style={{  marginRight: '20px',padding:'40px' }} />
                {/* <Column
                  field={(rowData) => {
                    let color;
                    let fontSize;
                    let fontWeight;
                    if (rowData.status === 'Placed') {
                      color='#007bff';  
                      fontSize = '12px';
                      fontWeight = 'bold'
                    } else if (rowData.status === 'Shiped') {
                      color = '#FFA500';
                      fontSize = '12px';
                      fontWeight = 'bold';
                    } else if (rowData.status === 'Cancelled') {
                      color = 'red';
                      fontSize = '12px';
                      fontWeight = 'bold';
                    }else if(rowData.status==='Delivered'){
                      color = 'green';
                      fontSize = '12px';
                      fontWeight = 'bold';
                    }
                    return (
                      <span style={{ color, fontSize, fontWeight }}>
                        {rowData.status}
                      </span>
                    );
                  }}
                  header="Status"
                /> */}
                <Column header="Status" body={statusBodyTemplate}  style={{padding:'10px'}}/>
                <Column field={(rowData) => formatDate(rowData.createdAt)} header="Order Date" style={{padding:'20px'}} />
                <Column
    header="Action"
    body={(rowData) => (
        <FiEye 
            style={{ color: '#343a40', cursor: 'pointer', fontSize: '18px' }}
            onClick={() => navigate(`/dashboard/admin/orders/${rowData._id}`)}
        />
    )}
/>
                {/* <Column field={order?.product?.name} header="name">Name</Column> */}
                {/* 
                    <Column field="category" header="Category" />
                    <Column header="Description" body={descriptionBodyTemplate} /> 
                                    <Column field="price" header="MRP" />
                                    <Column field="" body={actionBodyTemplate} header="Action"/> */}
              </DataTable>
              {/* {JSON.stringify(order, null, 4)} */}
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage


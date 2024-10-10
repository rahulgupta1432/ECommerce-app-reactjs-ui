import React, { useEffect, useState } from 'react'
import Header from '../../components/Layout/Header'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { API_URL } from '../../constants/constants'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/Auth'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useNavigate } from 'react-router-dom'
import { FiEye } from 'react-icons/fi'


const UserOrderPage = () => {
    const [auth] = useAuth();
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        getUserOrders();
    }, [auth?.user?._id])
    const getUserOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/user/get/user-orders?userId=${auth?.user?._id}`);
            const resp = response.data;
            if (resp?.code === 200) {
                setOrder(resp?.data.slice(0, -1));
                console.log(order)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }


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
        console.log(order)
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0' }}>
                <img
                    src={`${order.product[0].imageList[0]}`}
                    alt={order.name || 'Order name'}
                    // style={{ width: '100px', height: 'auto', margin: '0 10px' }} // Adjust the margin as needed
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
                        <UserMenu />
                    </div>

                    <div className='col-md-10'>
                        <span className="text-xl text-900 font-bold">All Orders</span>
                        <div className="card">
                            <DataTable value={order} header={header} footer={footer} tableStyle={{ minWidth: '100%' }}>
                                <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                                <Column header="Order ID"
                                    body={(rowData) => rowData._id}
                                    style={{ width: '5%', marginRight: '20px' }} />
                                <Column
                                    header={<div style={{ textAlign: 'left', marginBottom: '10px', marginTop: '10px', marginLeft: '30px' }}>Image</div>}
                                    body={imageBodyTemplate} />
                                <Column header="Total Payment"
                                    body={(rowData) => rowData.totalPayment ? rowData.totalPayment : 'Not Found'} />
                                <Column
                                    field={(rowData) => {
                                        let color;
                                        let fontSize;
                                        let fontWeight;
                                        if (rowData.status === 'Placed') {
                                            color = '#007bff';
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
                                        } else if (rowData.status === 'Delivered') {
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
                                />

                                <Column field={(rowData) => formatDate(rowData.createdAt)} header="Order Date" />
                                <Column
                                    header="Action"
                                    body={(rowData) => (
                                        <FiEye
                                            style={{ color: '#343a40', cursor: 'pointer', fontSize: '18px' }}
                                            onClick={() => navigate(`/dashboard/user/orders/${rowData._id}`)}
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
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default UserOrderPage

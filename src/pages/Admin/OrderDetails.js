import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import '../../styles/OrderDetails.css';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';
import { Button } from 'primereact/button';
const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    getOrderById();
  }, [params?.id]);

  const getOrderById = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/admin/get/product-order?orderId=${params.id}`);
      const resp = response.data;
      if (resp?.code === 200) {
        setOrder(resp?.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const estimatedDeliveryDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 6); // 6 days later
    return date.toLocaleDateString();
  };

  return (
    <>
      <Header title={'Dashboard - Fusion-Store'} />
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-2'>
            {/* <AdminMenu />
            <UserMenu/> */}
            {
              auth && auth.user && auth.user.isAdmin ? (
                <AdminMenu />
              ) : (
                <UserMenu />
              )
            }
          </div>
          <div className='col-md-5'>
            <h2>Order Details</h2>

            {order ? (
              order.map((item) => (
                <div key={item._id}>
                  <p>Order number: {item._id}</p>
                  <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
                  <h6 style={{ textDecoration: 'none', color: '#3D464D' }}>
                    Total Price: {item.totalPayment}
                    <label className='ml-2 custom-label'>via({(item?.paymentMode || 'COD')})</label>
                  </h6>
                  <h4 className='order-name'>{item.product[0]?.name}</h4>
                  <img className="img-fluid" src={item.product[0]?.imageList[0]} alt="Product" />
                  <p>Size: {item.product[0]?.size || 'N/A'}</p>
                  <p>Color: {item.product[0]?.color || 'N/A'}</p>
                  <p>Quantity: {item?.quantity || 'N/A'}</p>
                  <p>Last Tracking Status on: {new Date(item.updatedAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>Loading order details...</p>
            )}
          </div>

          {/* Right Side for Address and Tracking Information */}
          <div className='col-md-5'>
            {order ? (
              order.map((item) => (
                <div key={item._id}>
                  <h5>Address Information</h5>
                  <p>{item.address?.line1 || 'N/A'}</p>
                  <p>{item.address?.line2 || ''}</p>
                  <p>{item.address?.city}, {item.address?.state} {item.address?.zipCode}</p>

                  <h5>Tracking Information</h5>
                  <p>Tracking ID: {item.trackingId || 'N/A'}</p>
                  <p>Estimated Delivery Date: {estimatedDeliveryDate(item.createdAt)}</p>
                  <h5>Journey</h5>
                  <div className="row px-3">
                    <div className="col" >
                      <ul id="progressbar" style={{ textDecoration: 'none', listStyle: 'none' }}>
                        <li className={`step0 ${item.status === 'Placed' || item.status === 'Cancelled' ? 'active' : ''}`} id="step1"><div id='progress1'>PLACED</div></li>
                        <li className={`step0 ${item.status === 'Shipped' || item.status === 'Cancelled' ? 'active' : ''}`} id="step2">
                          <div id="progress2">SHIPPED</div>
                        </li>
                        {item.status === 'Cancelled' ? (
                          <li className={`step0 active`} id="step3">
                            <div id="progress3">CANCELLED</div>
                          </li>
                        ) : (
                          <li className={`step0 ${item.status === 'Delivered' ? 'active' : ''}`} id="step4">DELIVERED</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading order details...</p>
            )}
            <Button className='back-btn btn bg-btn-info' style={{ width: '220px', marginLeft: '180px', marginTop: '70px', backgroundColor: '#FFFFFF', borderColor: '#0000' }}>
              <Link
                to={auth.user.isAdmin ? '/dashboard/admin/all-orders' : '/dashboard/user/orders'}
                style={{ listStyle: 'none', textDecoration: 'none' }}>
                Back to Orders</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

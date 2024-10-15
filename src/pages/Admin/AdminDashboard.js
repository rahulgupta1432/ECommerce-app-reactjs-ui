import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';
import LineChartWithAnnotations from '../../components/utils/LineChartWithAnnotations';
// import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  const generateRandomData = () => {
    const prices = [];
    const dates = [];
    const startDate = new Date('2017-11-01');
  
    for (let i = 0; i < 30; i++) {
      // Generate random prices between 8000 and 10000
      prices.push(Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000);
      // Generate dates for the past month
      dates.push(new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).getTime());
    }
  
    return {
      monthDataSeries1: {
        prices,
        dates,
      },
    };
  };
  const series = generateRandomData();


  return (
    <Layout title={"Fusion-Store - Admin Dashboard"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminMenu />
          </div>
          <div className='col-md-10'>
            <div className='card w-auto p-3'>
              <h4><b>Welcome {auth?.user?.username}</b></h4>
              <p>Monitor your business analytics and statistics.</p>
              {/* order analytics */}
              {/* <div className=''>
              pending
            </div> */}
              {/* feature */}
              <div className="container-fluid pt-4">
                <img src={'https://6valley.6amtech.com/public/assets/back-end/img/business_analytics.png'} alt="Order Analytics" className="m-0 mr-3" style={{ width: '20px', height: '20px' }} />
                <b style={{ fontSize: '18px' }}>Order Analytics</b>
                <div className="row px-xl-5 pb-1" style={{ color: '#3D464D', fontSize: '18px', marginTop: '20px' }}>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/pending.png'} alt="Pending" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Pending <span style={{marginLeft:'20px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png'} alt="Confirmed" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Confirmed <span style={{marginLeft:'20px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/packaging.png'} alt="Packing" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Packing <span style={{marginLeft:'20px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png'} alt="Out For Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Out For Delivery <span style={{marginLeft:'20px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/delivered.png'} alt="Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Delivery <span style={{marginLeft:'20px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/canceled.png'} alt="Canceled" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Canceled <span style={{marginLeft:'26px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/returned.png'} alt="Returned" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Returned <span style={{marginLeft:'12px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/failed-to-deliver.png'} alt="Failed to Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Failed to Delivery <span style={{marginLeft:'10px',fontSize: '14px', color: '#888',fontWeight:'bold'}}> 3</span></h5>
                    </div>
                  </div>
                </div>
              </div>


              {/* graph  */}
              <div className="container-fluid pt-4">
              <LineChartWithAnnotations series={series} />

              </div>

              <div className='container-fluid pt-4'>
              <img src={'https://6valley.6amtech.com/public/assets/back-end/img/most-popular-product.png'} alt="Order Analytics" className="m-0 mr-3" style={{ width: '20px', height: '20px' }} />
              <b style={{ fontSize: '18px' }}>Order Analytics</b>
              </div>




            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

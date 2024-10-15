import React from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';
import LineChartWithAnnotations from '../../components/utils/LineChartWithAnnotations';
import HeaderDashboard from '../../components/Layout/HeaderDashboard';

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
    <>
    <HeaderDashboard title={"Fusion-Store - Admin Dashboard"}/>
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
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Pending <span style={{ marginLeft: '20px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png'} alt="Confirmed" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Confirmed <span style={{ marginLeft: '20px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/packaging.png'} alt="Packing" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Packing <span style={{ marginLeft: '20px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png'} alt="Out For Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Out For Delivery <span style={{ marginLeft: '20px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/delivered.png'} alt="Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Delivery <span style={{ marginLeft: '20px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/canceled.png'} alt="Canceled" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Canceled <span style={{ marginLeft: '26px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/returned.png'} alt="Returned" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Returned <span style={{ marginLeft: '12px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                    <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                      <img src={'https://6valley.6amtech.com/public/assets/back-end/img/failed-to-deliver.png'} alt="Failed to Delivery" className="m-0 mr-2" style={{ width: '20px', height: '20px' }} />
                      <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '16px' }}>Failed to Delivery <span style={{ marginLeft: '10px', fontSize: '14px', color: '#888', fontWeight: 'bold' }}> 3</span></h5>
                    </div>
                  </div>
                </div>
              </div>


              {/* graph  */}
              <div className="container-fluid pt-4">
                <LineChartWithAnnotations series={series} />

              </div>

              {/* Most Popular Products */}
              <div className='row px-xl-5 pt-4'>
                <div className="col-md-6">
                  <img src={'https://6valley.6amtech.com/public/assets/back-end/img/most-popular-product.png'} alt="Most Popular Products"
                    className="m-0 mr-3" style={{ width: '20px', height: '20px' }} />
                  <b style={{ fontSize: '18px' }}>Most Popular Products</b>
                  <div className="row px-xl-5 pb-1" style={{ color: '#3D464D', fontSize: '18px', marginTop: '20px', marginLeft: '-100px' }}>
                    {/* First product */}
                    <div className="col-lg-6 col-md-6 col-sm-12 pb-1">
                      <div className="d-flex flex-column align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                        <img src={'https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882fd48c1c9.png'} alt="Product 1"
                          className="m-0 mb-2" style={{ width: '50px', height: '40px' }} />
                        <p className='font-weight-semi-bold' style={{ fontSize: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>LM Washable and Light-Weight M...</p>
                        <p className='font-weight-semi-bold' style={{ marginTop: '-12px', fontSize: '12px', textAlign: 'center', whiteSpace: 'nowrap', color: '#FFA500', fontWeight: 'bolder' }}>4.5
                          <span style={{ marginLeft: '10px', color: '#000000', fontWeight: 'normal' }}>(2 Reviews)</span>
                        </p>
                      </div>
                    </div>
                    {/* Second product */}
                    <div className="col-lg-6 col-md-6 col-sm-12 pb-1">
                      <div className="d-flex flex-column align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                        <img src={'https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346670e3427e.png'} alt="Product 2"
                          className="m-0 mb-2" style={{ width: '50px', height: '40px' }} />
                        <p className='font-weight-semi-bold' style={{ fontSize: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>Women's Cassedyna Pink...</p>
                        <p className='font-weight-semi-bold' style={{ marginTop: '-12px', fontSize: '12px', textAlign: 'center', whiteSpace: 'nowrap', color: '#FFA500', fontWeight: 'bolder' }}>3.9
                          <span style={{ marginLeft: '10px', color: '#000000', fontWeight: 'normal' }}>(0 Reviews)</span>
                        </p>
                      </div>
                    </div>
                    {/* third product */}
                    <div className="col-lg-6 col-md-6 col-sm-12 pb-1">
                      <div className="d-flex flex-column align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                        <img src={'https://6valley.6amtech.com/public/assets/back-end/img/placeholder/product.png'} alt="Product 2"
                          className="m-0 mb-2" style={{ width: '50px', height: '40px' }} />
                        <p className='font-weight-semi-bold' style={{ fontSize: '10px', textAlign: 'center', whiteSpace: 'nowrap' }}>test seller product 2...</p>
                        <p className='font-weight-semi-bold' style={{ marginTop: '-12px', fontSize: '12px', textAlign: 'center', whiteSpace: 'nowrap', color: '#FFA500', fontWeight: 'bolder' }}>3.9
                          <span style={{ marginLeft: '10px', color: '#000000', fontWeight: 'normal' }}>(0 Reviews)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continue with the Top Selling Products section */}
                <div className='col-md-6'>
                  <img src={'https://6valley.6amtech.com/public/assets/back-end/img/top-selling-product-icon.png'} alt="Top Selling Products"
                    className="m-0 mr-3" style={{ width: '20px', height: '20px' }} />
                  <b style={{ fontSize: '18px' }}>Top Selling Products</b>
                  <div className="row px-xl-5 pb-1" style={{ color: '#3D464D', fontSize: '18px', marginTop: '20px' }}>
                    {/* Add top selling products here */}
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                      <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                        <img src={'https://6valley.6amtech.com/storage/app/public/product/thumbnail/2023-06-13-64882fd48c1c9.png'} alt="Pending" className="m-0 mr-2" style={{ width: '50px', height: '60px' }} />
                        <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '14px', textAlign: 'center', whiteSpace: 'nowrap' }}>LM Washable and Light-Weight Men's Shoe...</h5>
                        <span style={{ marginLeft: '20px', fontSize: '14px', color: '#0177cd', fontWeight: 'bold' }}><span style={{ paddingLeft: '25px', fontWeight: 'normal' }}>Sold:</span>3</span>
                      </div>
                      <div className="d-flex align-items-center bg-light mb-2" style={{ padding: '15px' }}>
                        <img src={'https://6valley.6amtech.com/storage/app/public/product/thumbnail/2022-10-12-6346670e3427e.png'} alt="Pending" className="m-0 mr-2" style={{ width: '50px', height: '60px' }} />
                        <h5 className="font-weight-semi-bold m-0" style={{ fontSize: '14px', textAlign: 'center', whiteSpace: 'nowrap' }}>Women's Cassedyna Pink Stiletto Pumps...</h5>
                        <span style={{ marginLeft: '20px', fontSize: '14px', color: '#0177cd', fontWeight: 'bold' }}><span style={{ marginLeft: '42px', fontWeight: 'normal' }}>Sold:</span>3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
      <div style={{textAlign:'center',marginTop:'-10px'}}>
      Shop - Fusion Store. Copyright rahulgupta@2024
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

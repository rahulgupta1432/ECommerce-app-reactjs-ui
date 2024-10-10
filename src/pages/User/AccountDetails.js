// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import UserMenu from '../../components/Layout/UserMenu'
// import { useAuth } from '../../context/Auth';

// const AccountDetails = () => {
//   const [auth] = useAuth();
//   console.log(auth)
//   return (
    
//     <Layout title={'Dashboard - Fusion-Store'}>
//       <div className='container-fluid m-3 p-3'>
//         <div className='row'>
//           <div className='col-md-3'>
//             <UserMenu />
//           </div>
//           <div className='col-md-9'>
//             <div className='card w-75 p-3'>
//               {/* <h1>{auth?.user?.username}</h1> */}
//               {/* <p>Email:{auth?.user?.email}</p> */}
//               <h1>Account Details</h1>
//             </div>
//           </div>
//         </div>
//         </div>
//     </Layout>
//   )
// }


// export default AccountDetails;


import React from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';
import Header from '../../components/Layout/Header';

const AccountDetails = () => {
  const [auth] = useAuth();
  const user = auth?.user; // Destructure user from auth

  return (
    <>
    <Header title={'Dashboard - Fusion-Store'}/>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <Card title="Account Details" className="w-75">
              {user ? (
                <>
                  <h3>Personal Information</h3>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <h4>Shipping Address</h4>
                  <p>
                    {user.shippingAddress?.street},<br />
                    {user.shippingAddress?.city}, {user.shippingAddress?.state},<br />
                    {user.shippingAddress?.zipCode}, {user.shippingAddress?.country}
                  </p>

                  <h4>Order History</h4>
                  {user.orders && user.orders.length > 0 ? (
                    <DataTable value={user.orders} className="p-datatable-responsive">
                      <Column field="id" header="Order ID" />
                      <Column field="status" header="Status" />
                      <Column field="date" header="Date" />
                    </DataTable>
                  ) : (
                    <p>No orders found.</p>
                  )}

                  <h4>Payment Methods</h4>
                  {user.paymentMethods && user.paymentMethods.length > 0 ? (
                    <DataTable value={user.paymentMethods} className="p-datatable-responsive">
                      <Column field="cardType" header="Card Type" />
                      <Column field="lastFour" header="Last Four" />
                    </DataTable>
                  ) : (
                    <p>No payment methods found.</p>
                  )}
                </>
              ) : (
                <p>Please log in to view your account details.</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;

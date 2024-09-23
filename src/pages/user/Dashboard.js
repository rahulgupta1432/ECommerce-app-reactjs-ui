import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    // <>
    // Hello Dashboard Page
    // </>
    <Layout title={'Dashboard - ECommerce App'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1>{auth?.user?.username}</h1>
              <p>Email:{auth?.user?.email}</p>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}


export default Dashboard;

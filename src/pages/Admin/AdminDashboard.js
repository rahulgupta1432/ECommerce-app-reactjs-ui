import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/Auth';
// import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [auth] = useAuth();
  
  return (
    <Layout title={"Fusion-Store - Admin Dashboard"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
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
  );
};

export default AdminDashboard;

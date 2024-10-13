import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Header from '../../components/Layout/Header';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../constants/constants';
import { useAuth } from '../../context/Auth';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { formatDate } from '../../components/utils/FormatDate';

const UsersPage = () => {
  const [users,setUsers]=useState([]);
  const [auth]=useAuth();

  useEffect(()=>{
    getAllUsers();
  },[auth?.user?._id])


  const getAllUsers=async()=>{
    try {
      const response=await axios.get(`${API_URL}/api/v1/admin/get-users?adminId=${auth.user._id}`)
      const resp=response.data;
      if(resp?.code===200){
        setUsers(resp?.data.slice(0,-1));
        console.log(resp.data.slice(0,-1))
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <input type="text" placeholder="Search Users" style={{
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
  const imageBodyTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0' }}>
        <img
          src={`${rowData.image}`}
          alt={rowData.username || 'Users name'}
          style={{
            width: '100px', // Fixed width
            height: '100px', // Fixed height
            objectFit: 'cover', // Ensures the image covers the area without distortion
            margin: '0 10px',
            borderRadius: '50%', // Make the image circular
          }}
          className="shadow-2 border-round"
        />
      </div>
    );
  };
  const footer = `In total there are ${users? users.length : 0} Users.`;
  console.log(imageBodyTemplate,header,footer);

  return (
    <>
    <Header title={'Dashboard - All Users'}/>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminMenu />
        </div>

        <div className='col-md-10'>
            <span className="text-xl text-900 font-bold ml-4">All Users</span>
            <div className="card">
              <DataTable value={users} header={header} footer={footer} tableStyle={{ minWidth: '100%',marginTop:'10px' }}>
                <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1}/>
                <Column header="Image" body={imageBodyTemplate} headerStyle={{paddingLeft:'35px'}} />
                <Column header="Name" body={(rowData) => rowData.username}/>
                <Column header="Email" body={(rowData) => rowData.email}  />
                <Column header="Mobile" body={(rowData) => rowData.mobile}  headerStyle={{ textAlign: 'left', paddingLeft: '35px' }}
                style={{ textAlign: 'left', paddingLeft: '35px' }} />
                <Column header="Role" body={(rowData) => rowData.role} />
                <Column field={(rowData) => formatDate(rowData.createdAt)} header="Created Date" style={{padding:'20px'}} />                
                {/* <Column header="Actions" body={actionBodyTemplate}  headerStyle={{paddingLeft:'20px'}} style={{paddingLeft:'20px'}} /> */}

              </DataTable>
            </div>
          </div>
      </div>
      </div>
    </>
  )
}

export default UsersPage

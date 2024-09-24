import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import '../../styles/DataTable.css';
import '../../styles/flag.css';
import Header from '../../components/Layout/Header.js';
import AdminMenu from '../../components/Layout/AdminMenu.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../constants/constants.js';
import "../../styles/index.css"

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');

  const getAllCategories = async (query = '') => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/categories/all-category?search=${query}`);
      let result = await response.data;
      if (result.code === 200) {
        const filteredData = result.data.slice(0, -1);
        return filteredData.map(category => ({
          id: category._id,
          name: category.name,
          image: category.image,
          category: category.name,
          inventoryStatus: 'INSTOCK',
          rating: Math.floor(Math.random() * 5) + 1 ? Math.floor(Math.random() * 5) + 1 : 4.9
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
    const data = await getAllCategories(query);
    setCategories(data);
  };

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);
  const editCategory = (category) => {
    console.log('Editing category:', category);
    // Implement your edit logic here
  };

  const deleteCategory = (category) => {
    console.log('Deleting category:', category);
    // Implement your delete logic here
  };
  const imageBodyTemplate = (category) => {
    return <img src={`${category.image}`} alt={category.image} className="w-6rem shadow-2 border-round" style={{ marginTop: '5px', marginLeft: '25px' }} />;
  };

  const ratingBodyTemplate = (category) => {
    return <Rating value={category.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (category) => {
    return <Tag value={category.inventoryStatus} severity={getSeverity(category)}></Tag>;
  };

  const getSeverity = (category) => {
    switch (category.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  };

  const actionBodyTemplate = (category) => {
    return (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => editCategory(category)} />
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteCategory(category)} />
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
        ADD Category
      </button>
    </div>
  );

  const footer = `In total there are ${categories ? categories.length : 0} categories.`;

  return (
    <>
      <Header />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <span className="text-xl text-900 font-bold">All Categories</span>
            <div className="card">
              <DataTable value={categories} header={header} footer={footer} tableStyle={{ minWidth: '100%' }}>
                <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                <Column
                  header={<div style={{ textAlign: 'left', margin: '8px', marginLeft: '40px' }}>Image</div>}
                  body={imageBodyTemplate}
                  className='d-flex justify-content-start'
                />
                <Column field="category" header="Category"></Column>
                <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
                <Column header="Status" body={statusBodyTemplate}></Column>
                <Column header="Actions" body={actionBodyTemplate} style={{ width: '10%' }} />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

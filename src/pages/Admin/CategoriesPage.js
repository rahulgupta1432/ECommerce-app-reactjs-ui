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
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import '../../styles/uploadFile.css';
// import DeleteButton from '../../components/utils/DeleteButton.js';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  const [dialogVisible,setDialogVisible]=useState(false);
  const [newCategory,setNewCategory]=useState({
    name:'',
    image:''
  })
  const [formErrors,setFormErrors]=useState({});
  // const [select,setSelected]=useState(null);
  const [selectedCategory, setSelectedCategory]=useState(null);
  const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] = useState(false);
  

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
          isDeleted: category.isDeleted,
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
    setNewCategory({name:category.name,image:null});
    setSelectedCategory(category);
    setDialogVisible(true);
    // Implement your edit logic here
  };

// handle Update Category
const handleUpdateCategory=async()=>{
  try {
    const errors={};
    if(!newCategory.name)errors.name='Name is Required';
    setFormErrors(errors);
    if(Object.keys(errors).length>0)return;
    const formData=new FormData();
    formData.append('name',newCategory.name);
    formData.append('image',newCategory.image);
    const response=await axios.put(`${API_URL}/api/v1/categories/update-category?categoryId=${selectedCategory.id}`,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })
    const result = await response.data;
    if (result.code === 200) {
      toast.success(`${newCategory.name} Category Updated Successfully`);
      getAllCategories().then(setCategories);
      setDialogVisible(false);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred.");
  }
}




  const deleteCategory = (category) => {
    setSelectedCategory(category);
    setConfirmDeleteDialogVisible(true);
  };


  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/categories/delete-category?categoryId=${selectedCategory.id}`);
      const result = await response.data;
  
      if (result.code === 200) {
        toast.success(`${selectedCategory.name} Category Deleted Successfully`);
        getAllCategories().then(setCategories);
        setConfirmDeleteDialogVisible(false); // Close the delete confirmation dialog
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  



  const imageBodyTemplate = (category) => {
    return <img src={`${category.image}`} alt={category.image} className="w-6rem shadow-2 border-round" style={{ marginTop: '5px', marginLeft: '25px',width:'100px',height:'100px',objectFit:'cover' }} />;
  };

  const ratingBodyTemplate = (category) => {
    return <Rating value={category.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (category) => {
    return <Tag value={category.inventoryStatus} severity={getSeverity(category)}></Tag>;
  };

  const getSeverity = (category) => {
    if (category.isDeleted) {
      return 'warning'; // Return warning if deleted
    }
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
        <Button icon="pi pi-pencil" className="p-button-secondary" onClick={() => editCategory (category)} style={{borderRadius:'6px',height:'30px'}} />
        <Button icon="pi pi-trash" className="p-button-danger" onClick={() => deleteCategory(category)} style={{borderRadius:'6px',height:'30px'}} />
          {/* <DeleteButton onClick={() => deleteCategory(category)}/> */}
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

      <button onClick={()=>setDialogVisible(true)}
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

  // handle Add new Category
  const handleAddCategory=async()=>{
    try {
      const errors={};
      if(!newCategory.name) errors.name='Name is required';
      if(!newCategory.image)errors.image="Image is required";
      setFormErrors(errors)
      if(Object.keys(errors).length>0)return;

      const formData=new FormData();
      formData.append('name',newCategory.name);
      formData.append('image',newCategory.image);
      const response=await axios.post(`${API_URL}/api/v1/categories/add-category`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });

      let result=await response?.data;
      if(result.code===200){
        toast.success(`${newCategory.name} Category Added Successfully`);
        getAllCategories();
        // setNewCategory({ name: '', image: null });
        setTimeout(()=>{
          setDialogVisible(false);          
        },1000)
      }else{
        toast.error(result.message);
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
      toast.error(errorMessage);
    }
  }


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



        {/* Add Category Dialog */}
    <div className="card flex justify-content-center">
        <Dialog
            header={selectedCategory?'Edit Category':'Add New Category'}
            visible={dialogVisible} 
            onHide={() => setDialogVisible(false)} 
            style={{ width: '50vw',height:'430px', padding: '10px',marginLeft:'20px' }} 
            breakpoints={{ '960px': '70vw', '641px': '90vw' }} 
        >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
    <div className="file-upload-container">
    <div className="file-upload" style={{marginTop:'-100px'}}>
        <input class="file-input" id="fileInput" type="file" accept='.jpg,.jpeg,.png,.webp' onChange={(e) => {(e.target.files[0]);
            const file = e.target.files[0];
        setNewCategory({ ...newCategory,image:file })}}
      
        />
        <label className="file-label" for="fileInput">
        <i className="upload-icon">📁</i>
        <p>Upload Your Category Images: Drag &amp; Drop or Click Here</p>
        </label>
    </div>
    </div>
    
   

                

                {/* Right side for other fields */}
                <div style={{ flex: '2' }} className='ml-4'>
                    {[
                        { label: 'Category Name', id: 'name', type: 'text', value: newCategory.name, onChange: (e) => setNewCategory({ ...newCategory, name: e.target.value })},
                    ].map(field => (
                        <div className="field" style={{ marginBottom: '15px' }} key={field.id}>
                            <label htmlFor={field.id} style={{ marginBottom: '5px', fontWeight: '600' }}>{field.label}</label>
                            <InputText
                                id={field.id}
                                type={field.type}
                                keyfilter={field.keyfilter}
                                value={field.value}
                                onChange={field.onChange}
                                style={{ width: '95%', padding: '8px', borderRadius: '5px' }} // Full width for input
                                required
                            />
                        {formErrors[field.id] && <small className="p-error">{formErrors[field.id]}</small>}
                        </div>
                    ))}
                    {/* <MultiSelectDropdown/> */}
                    <div className="field" style={{ marginBottom: '15px' }}>
    {/* <MultiSelectDropdown
    onChange={(e) => setNewCategory({ ...newCategory, category: e.value })}
  /> */}
</div>
{formErrors.category && <small className="p-error">{formErrors.category}</small>}

{/* Image preview */}
<div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '30px',marginLeft:'80px' }}>
    {newCategory.image && (
        <div style={{ margin: '5px' }}>
            <img
                src={URL.createObjectURL(newCategory.image)}
                alt="preview"
                style={{ width: '300px', height: '200px', borderRadius: '5px', objectFit: 'cover' }}
            />
        </div>
    )}
</div>

            {formErrors.image && <small className="p-error">{formErrors.image}</small>}


        {/* Button container */}
<div className="submit" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
    <Button
        label={selectedCategory?'Update':'Add'}
        onClick={selectedCategory?handleUpdateCategory:handleAddCategory}
        className='mr-8'
        style={{ width: '90px', height: 'auto' }}
    />
    <Button
        label='Cancel'
        severity="danger"
        onClick={() => setDialogVisible(false)}
        style={{ width: '90px', height: 'auto' }}
    />
</div>

                </div>
            </div>
        </Dialog>
    </div>  


    {/* delete button modal */}
    <Dialog
  header="Are You Sure?"
  visible={confirmDeleteDialogVisible}
  onHide={() => setConfirmDeleteDialogVisible(false)}
  style={{ width: '35vw', height: '150px', padding: '10px', marginLeft: '20px' }}
  breakpoints={{ '960px': '70vw', '641px': '90vw' }}
  className='ml-4'

>
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
    <div style={{ flex: '2' }} className='ml-4'>
      This action cannot be undone
    </div>
  </div>
  <div className="submit" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '23px' }}>
    <Button
      label='Cancel'
      className='mt-4'
      severity="danger"
      onClick={() => setConfirmDeleteDialogVisible(false)}
      style={{ width: '90px', height: 'auto',borderRadius:'15px',marginLeft:'10px' }}
      outlined
    />
    <Button
      label='Delete'
      className='mt-4'
      severity="danger"
      onClick={handleDeleteCategory} // Call delete function
      style={{ width: '90px', height: 'auto',borderRadius:'10px',marginLeft:'10px' }}
      // outlined
    />
  </div>
</Dialog>
{/* end delete */}



    </>
  );
}

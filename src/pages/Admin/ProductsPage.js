    import React, { useEffect, useState } from 'react'
    import AdminMenu from '../../components/Layout/AdminMenu'
    import Header from '../../components/Layout/Header';
    import axios from 'axios';
    import { API_URL } from '../../constants/constants';
    import { toast } from 'react-toastify';
    import { DataTable } from 'primereact/datatable';
    import { Column } from 'primereact/column';
    import { Dialog } from 'primereact/dialog';
    import { Button } from 'primereact/button';
    import { InputText } from 'primereact/inputtext';
    // import { FileUpload } from 'primereact/fileupload';
    import '../../styles/uploadFile.css';
    import MultiSelectDropdown from '../../components/utils/MultiSelectDropdown';

    const productsPage = () => {

    const [products,setProducts]=useState([]);
    let [searchQuery, setSearchQuery] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        quantity:'',
        imageList: [],
        imageIndices:[]
    });
    const [formErrors, setFormErrors] = useState({});
    const [selectedProduct, setselectedProduct]=useState(null);
    const [confirmDeleteDialogVisible, setConfirmDeleteDialogVisible] = useState(false);


    const getAllProducts = async (query = '') => {
        try {
            const product='Admin';
            const response = await axios.get(`${API_URL}/api/v1/product/all-products?search=${query}&type=${product}`);
            const result = await response.data;
            if (result.code === 200) {
                const filteredData = result.data.slice(0, -1);
                return filteredData.map(product => ({
                    id: product._id,
                    name: product.name,
                    slug:product.slug,
                    price: Math.floor(Math.random() * 100) + 10 ? Math.floor(Math.random() * 100) + 10 : 5.4,
                    description: product.description,
                    category:product.category.name,
                    imageList: product.imageList.length > 0 ? product.imageList[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
                    quantity:product.quantity
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
        const data = await getAllProducts(query);
        setProducts(data);
    };

    useEffect(()=>{
    getAllProducts()?.then((data)=>{
        if (data && Array.isArray(data)) {
            setProducts(data);
        }
        
    })
    
    },[]);


    const imageBodyTemplate = (product) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '10px 0' }}>
            <img 
                src={`${product.imageList}`} 
                alt={product.name} 
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
            onClick={() => setDialogVisible(true)}
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
            ADD 
        </button>
    </div>
    );

    const footer = `In total there are ${products ?products.length : 0} products.`;

    const handleAddProduct=async()=>{
        const errors = {};
        if (!newProduct.name) errors.name = "Name is required.";
        if (!newProduct.price) errors.price = "Price is required.";
        if (!newProduct.description) errors.description = "Description is required.";
        if (!newProduct.quantity) errors.quantity = "Quantity is required.";
        if (!newProduct.category) errors.category = "Category is required.";
        if (newProduct.imageList.length === 0) errors.imageList = "At least one image is required.";

        setFormErrors(errors);

        // If there are errors, stop the submission
        if (Object.keys(errors).length > 0) return;

        const formData=new FormData();

        formData.append('name',newProduct.name);
        formData.append('price',newProduct.price);
        formData.append('description',newProduct.description);
        formData.append('quantity',newProduct.quantity);
        formData.append('category',newProduct.category);
        newProduct.imageList.forEach((file)=>{
            formData.append('imageList',file);
        })
        try {
            const response=await axios.post(`${API_URL}/api/v1/product/add-product`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            const res=await response?.data;
            if(res.code===200){
                toast.success(`${newProduct.name} Product Added Succesfully`);
                setDialogVisible(false);
                getAllProducts().then((data)=>{
                    setProducts(data)
                })
            }else{
                toast.error(res.message);
            }
            // setProducts([...products,res.data]);
            // setTimeout(()=>{
            //     // alert("success")
            // },1000)
            
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    const actionBodyTemplate=(rowData)=>{
        return (
            <div className='flex gap-2'>
                <Button icon="pi pi-pencil" className='p-button-secondary' style={{borderRadius:'6px',height:'30px'}}  onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash" className='p-button-danger' style={{borderRadius:'6px',height:'30px'}} onClick={() => deleteProduct(rowData)}  />

            </div>
        )
    }

    const truncateText = (text, length) => {
        if (text.length <= length) return text;
        return `${text.substring(0, length)}...`;
    };
    
    const descriptionBodyTemplate = (rowData) => {
        return (
            <span title={rowData.description}>
                {truncateText(rowData.description, 40)} {/* Adjust the length as needed */}
            </span>
        );
    };

    // handle update

    const editProduct = (product) => {
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category ? product.category._id : '', // Ensure category is checked
            quantity: product.quantity,
            imageList: product.imageList,
        });
        setselectedProduct(product);
        setDialogVisible(true);
    };
    
    const handleUpdateProduct=async()=>{
        const formData=new FormData();
        formData.append('name',newProduct.name);
        formData.append('price',newProduct.price);
        formData.append('description',newProduct.description);
        formData.append('quantity',newProduct.quantity);
        if (Array.isArray(newProduct.imageList) && newProduct.imageList.length > 0) {
            newProduct.imageList.forEach(file => {
                formData.append('imageList', file);
            });
        }
    
        //         Object.entries(newProduct).forEach(([key, value]) => {
        //     if (key === 'imageList') {
        //         value.forEach(file => formData.append('imageList', file));
        //     } else {
        //         formData.append(key, value);
        //     }
        // });

        // newProduct.imageList.forEach((file)=>{
        //     formData.append('imageList',file);
        // })
        try {
            const response = await axios.put(`${API_URL}/api/v1/product/update-product?productId=${selectedProduct.id}`,formData,{
                header:{
                    'Content-Type':'multipart/form-data'
                }
            });
            console.log(response); // Log the whole response for debugging
      const result = await response?.data;  
      if (result.code === 200) {
        toast.success(`${selectedProduct.name} Product Updated Successfully`);
        getAllProducts();
        setTimeout(()=>{
            setDialogVisible(false)
        },1000)
      } else {
        throw new Error("Failed to fetch products");
        // toast.error(result.message);
      }
        } catch (error) {
            console.log("308__________________",error)
            const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
            toast.error(errorMessage);
        }
    }
    
    const deleteProduct=(product)=>{
        setselectedProduct(product);
        setConfirmDeleteDialogVisible(true);
    }

    const handleDeleteProduct=async()=>{
        try {
            const response=await axios.delete(`${API_URL}/api/v1/product/delete-product?productId=${selectedProduct.id}`);
            const result = await response?.data;
            if (result.code === 200) {
                toast.success(`${selectedProduct.name} Product Deleted Successfully`);
                getAllProducts().then(setProducts);
                setConfirmDeleteDialogVisible(false);
              } else {
                toast.error(result.message);
              }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        }
    }

    return (
    <>
    <Header/>
    <div className="container-fluid m-3 p-3">
                    <div className="row">
                        <div className="col-md-2">
                            <AdminMenu />
                        </div>
                        <div className="col-md-10">
                            <span className="text-xl text-900 font-bold">All Products</span>
                            <div className="card">
                                <DataTable value={products} header={header} footer={footer} tableStyle={{ minWidth: '100%' }}>
                                    <Column header="SR. No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                                    <Column 
        header={<div style={{ textAlign: 'left', marginBottom: '10px',marginTop:'10px',marginLeft:'30px' }}>Image</div>} 
        body={imageBodyTemplate} 
        // className='d-flex justify-content-start' 
    />
                                    <Column field="name" header="name">Name</Column>
                    <Column field="category" header="Category" />
                    <Column header="Description" body={descriptionBodyTemplate} /> 
                                    <Column field="price" header="MRP" />
                                    <Column field="" body={actionBodyTemplate} header="Action"/>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Add Product Dialog */}
    <div className="card flex justify-content-center">
        <Dialog 
            header={selectedProduct?'Edit Product':'Add Product'}
            visible={dialogVisible} 
            onHide={() => setDialogVisible(false)} 
            style={{ width: '50vw', padding: '10px',marginLeft:'20px' }} 
            breakpoints={{ '960px': '70vw', '641px': '90vw' }} 
        >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
    <div className="file-upload-container">
    <div className="file-upload">
        <input multiple class="file-input" id="fileInput" type="file" accept='.jpg,.jpeg,.png,.webp' onChange={(e) => {
        const files = Array.from(e.target.files);
        setNewProduct(prev => ({ ...prev, imageList: files })); }}/>
        <label className="file-label" for="fileInput">
        <i className="upload-icon">📁</i>
        <p>Upload Your Product Images: Drag &amp; Drop or Click Here</p>
        </label>
    </div>
    



    {/* img preview */}
   {/* <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
    {newProduct.imageList.length > 0 && newProduct.imageList.map((file, index) => (
        <div key={index} style={{ margin: '5px' }}>
            <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                style={{ width: '100px', height: '100px', borderRadius: '5px', objectFit: 'cover' }} // Adjust width and height
            />
            
        </div>
    ))}
</div> */}
                    <div className="image-previews" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                        {Array.isArray(newProduct.imageList)&&newProduct.imageList.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} alt={`preview-${index}`} style={{ width: '100px', height: '100px', borderRadius: '5px', objectFit: 'cover' }} />
                        ))}
                    </div>

{formErrors.imageList && <small className="p-error">{formErrors.imageList}</small>}
    </div>


                

                {/* Right side for other fields */}
                <div style={{ flex: '2' }} className='ml-4'>
                    {[
                        { label: 'Product Name', id: 'name', type: 'text', value: newProduct.name, onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value })},
                        { label: 'Product Price', id: 'price', type: 'text', keyfilter: "int", value: newProduct.price, onChange: (e) => setNewProduct({ ...newProduct, price: e.target.value }) },
                        { label: 'Product Description', id: 'description', type: 'text', value: newProduct.description, onChange: (e) => setNewProduct({ ...newProduct, description: e.target.value }) },
                        { label: 'Quantity', id: 'quantity', type: 'text', keyfilter: "int", value: newProduct.quantity, onChange: (e) => setNewProduct({ ...newProduct, quantity: e.target.value }) },
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
  <label htmlFor="category" style={{ marginBottom: '5px', fontWeight: '600' }}>Product Categories</label>
  <MultiSelectDropdown value={newProduct.category}
    onChange={(e) => setNewProduct({ ...newProduct, category: e.value })}
  />
</div>
{formErrors.category && <small className="p-error">{formErrors.category}</small>}


        <div className='submit' style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <Button 
                            label={selectedProduct?'Update':'Add'} 
                            onClick={selectedProduct?handleUpdateProduct:handleAddProduct} 
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
      onClick={handleDeleteProduct} // Call delete function
      style={{ width: '90px', height: 'auto',borderRadius:'10px',marginLeft:'10px' }}
      // outlined
    />
  </div>
</Dialog>
{/* end delete */}

    </>
    )
    }

    export default productsPage

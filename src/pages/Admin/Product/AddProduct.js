import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';

const AddProduct = ({ visible, onHide }) => {
  return (
    <div className="card flex justify-content-center">
      <Dialog 
        header="Add Product" 
        visible={visible} 
        onHide={onHide}
        style={{ width: '50vw' }} 
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        <p className="m-0">
          {/* Form fields for adding a product will go here */}
        </p>
      </Dialog>
      <Button>done</Button>
    </div>
  );
};

export default AddProduct;

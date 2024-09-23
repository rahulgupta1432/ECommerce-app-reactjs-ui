import React from 'react';
import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
    <>
      <div className='text-center'>
      <div className="list-group">
        <h4><NavLink to="/dashboard/admin" style={{textDecoration:'none',color:'black'}}>Admin Panel</NavLink></h4>
  <NavLink to="/dashboard/admin/categories" className="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
</div>

      </div>


    </>
  )
}

export default AdminMenu

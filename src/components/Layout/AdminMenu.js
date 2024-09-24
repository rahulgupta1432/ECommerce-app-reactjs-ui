  // import React from 'react';
  // import { NavLink } from 'react-router-dom';
  // const AdminMenu = () => {
  //   return (
  //     <>
  //       <div className='text-center'>
  //       <div className="list-group">
  //         <h4><NavLink to="/dashboard/admin" style={{textDecoration:'none',color:'black'}}>Admin Panel</NavLink></h4>
  //   <NavLink to="/dashboard/admin/categories" className="list-group-item list-group-item-action">Create Category</NavLink>
  //   <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Create Product</NavLink>
  //   <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
  // </div>

  //       </div>


  //     </>
  //   )
  // }

  // export default AdminMenu

  // import React from 'react';
  // import { Outlet, NavLink } from 'react-router-dom';
  // import '../../styles/AdminMenu.css'; // Import the CSS file

  // const AdminMenu = () => {
  //   return (
  //     <div style={{ display: 'flex' }}>
  //       <div style={{ width: '250px', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
  //         <div className='text-center'>
  //           <div className="list-group">
  //             <h4>
  //               <NavLink to="/dashboard/admin" style={{ textDecoration: 'none', color: 'black' }}>Admin Panel</NavLink>
  //             </h4>
  //             <NavLink to="/dashboard/admin/categories" className="list-group-item list-group-item-action">Create Category</NavLink>
  //             <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Create Product</NavLink>
  //             <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
  //           </div>
  //         </div>
  //       </div>
  //       <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
  //         <Outlet /> {/* This will render the child routes */}
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default AdminMenu;

  import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../../styles/AdminMenu.css'; // Import the CSS file

const AdminMenu = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '250px', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
                <div className='text-center'>
                    <div className="list-group">
                        <h4>
                            <NavLink to="/dashboard/admin" style={{ textDecoration: 'none', color: 'black' }}>Admin Panel</NavLink>
                        </h4>
                        <NavLink 
                            to="/dashboard/admin/categories" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            Create Category
                        </NavLink>
                        <NavLink 
                            to="/dashboard/admin/products" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            Create Product
                        </NavLink>
                        <NavLink 
                            to="/dashboard/admin/users" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            Users
                        </NavLink>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
                <Outlet /> {/* This will render the child routes */}
            </div>
        </div>
    );
};

export default AdminMenu;

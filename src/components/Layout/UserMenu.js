// import React from 'react';
// import { NavLink } from 'react-router-dom';
// const UserMenu = () => {
//   return (
//     <>
//       <div className='text-center'>
//       <div className="list-group">
//         <h4><NavLink to="/dashboard/admin" style={{textDecoration:'none',color:'black'}}>User Panel</NavLink></h4>
//   <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
//   <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
//   {/* <NavLink to="/dashboard/user/users" className="list-group-item list-group-item-action">Users</NavLink> */}
// </div>

//       </div>


//     </>
//   )
// }

// export default UserMenu

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../../styles/AdminMenu.css'; // Import the CSS file

import { MdOutlineDashboard } from "react-icons/md";
import {LuScrollText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { LuPackagePlus } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { LuContact2 } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from './Header';
import { useAuth } from '../../context/Auth';



const UserMenu = () => {
    const [auth, setAuth] = useAuth(); 
    return (
        <div style={{ display: 'flex',height: '100vh' }}>
            <div style={{ width: '300px', position: 'fixed', height: '100%', left: -14, top: 100,overflowY: 'auto' }}>
                <div className='text-center'>
                    <div className="list-group">
                        <h4>
                            <NavLink to="/dashboard/user" style={{ textDecoration: 'none', color: 'black' }}>User Dashboard</NavLink>
                        </h4>
                        <NavLink 
                            to="/dashboard/user/dashboard" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`} style={{marginTop:'30px'}}>
                            <MdOutlineDashboard style={{ marginRight: '8px',fontSize: '24px' ,color:'gray' }} />
                            Dashboard
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/categories" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            <LuScrollText style={{ marginRight: '8px',fontSize: '24px' ,color:'gray' }} />
                            Orders
                        </NavLink>
                        <NavLink 
                            to="/dashboard/user/products" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            <GiShoppingBag style={{ marginRight: '8px',fontSize: '24px' ,color:'gray' }} />
                            Payment Method
                        </NavLink>
                        <NavLink 
                            to="/dashboard/user/orders" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            <LuPackagePlus style={{ marginRight: '8px',fontSize:'24px',color:'gray' }} />
                            Address
                        </NavLink>
                        <NavLink 
                            to="/dashboard/user/offers" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            <BiSolidOffer  style={{ marginRight: '8px',fontSize:'24px',color:'gray' }} />
                            Account Details
                        </NavLink>
                        <NavLink 
                            to="/dashboard/user/users" 
                            className={({ isActive }) => `list-group-item list-group-item-action ${isActive ? 'list-group-item-active' : ''}`}>
                            <LuContact2  style={{ marginRight: '8px',fontSize:'24px',color:'gray' }} />Support
                        </NavLink>



                        {/* logout */}
                     <NavLink 
                        to="/" // Update this path to your actual logout route
                        onClick={() => handleLogout(auth, setAuth)} 
                        className={({ isActive }) => `custom-list-item custom-list-item-action ${isActive ? 'list-group-item-active' : ''}`} 
                        style={{ marginTop: '180px', marginBottom: '10px' }}>
                        <FiLogOut style={{ marginRight: '8px', fontSize: '24px', color: 'inherit' }} />
                        Log Out
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

export default UserMenu;

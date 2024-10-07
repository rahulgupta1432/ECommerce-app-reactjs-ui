import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
// import '../../styles/AdminMenu.css'; // Import the CSS file

import { MdOutlineDashboard, MdOutlineDescription } from "react-icons/md";
import { LuScrollText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { LuPackagePlus } from "react-icons/lu";
import { BiSolidOffer } from "react-icons/bi";
import { LuContact2 } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from './Header';
import { useAuth } from '../../context/Auth';
import '../../styles/UserMenu.css'
import { AiOutlineMail,AiOutlineBell } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";


const UserMenu = () => {
    const [auth, setAuth] = useAuth(); 
    return (
        <div className="user-menu-container">
            <div className="sidebar">
                <div className='text-center'>
                    <h4 className="sidebar-title">
                        <NavLink to="/dashboard/user" className="sidebar-link">User Dashboard</NavLink>
                    </h4>
                    <div className="list-group">
                        <NavLink 
                            to="/dashboard/user/dashboard" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <MdOutlineDashboard className="sidebar-icon" />
                            <span className="sidebar-text">Dashboard</span>
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/orders" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <LuScrollText className="sidebar-icon" />
                            <span className="sidebar-text">Orders</span>
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/products" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <GiShoppingBag className="sidebar-icon" />
                            <span className="sidebar-text">Payment Method</span>
                        </NavLink>

                        <NavLink 
                            to="/dashboard/user/profile-details" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <CgProfile className="sidebar-icon" />
                            <span className="sidebar-text">Profile Details</span>
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/address" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <LuPackagePlus className="sidebar-icon" />
                            <span className="sidebar-text">Address</span>
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/account-details" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <BiSolidOffer className="sidebar-icon" />
                            <span className="sidebar-text">Account Details</span>
                        </NavLink>
                        
                        <NavLink 
                            to="/dashboard/user/support" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <LuContact2 className="sidebar-icon" />
                            <span className="sidebar-text">Support</span>
                        </NavLink>


                        <NavLink 
                            to="/dashboard/user/invoice" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <MdOutlineDescription className="sidebar-icon" />
                            <span className="sidebar-text">Invoices</span>
                        </NavLink>

                        <NavLink 
                            to="/dashboard/user/messages" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <AiOutlineMail className="sidebar-icon" />
                            <span className="sidebar-text">Messages</span>
                        </NavLink>

                        <NavLink 
                            to="/dashboard/user/notifications" 
                            className={({ isActive }) => `list-group-item ${isActive ? 'active' : ''}`}>
                            <AiOutlineBell className="sidebar-icon" />
                            <span className="sidebar-text">Notifications</span>
                        </NavLink>

                        {/* Logout */}
                        <NavLink 
                            to="/" 
                            onClick={() => handleLogout(auth, setAuth)} 
                            className={({ isActive }) => `list-group-item ${isActive ? 'btn btn-danger' : ''}`} 
                            style={{ marginTop: '100px', marginBottom: '10px' }}
                            >
                            <FiLogOut className="sidebar-icon" style={{ marginRight: '8px', fontSize: '24px', color: 'inherit' }} />
                            <span className="sidebar-text">Log Out</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="content">
                <Outlet /> {/* This will render the child routes */}
            </div>
        </div>
    );
};

export default UserMenu;

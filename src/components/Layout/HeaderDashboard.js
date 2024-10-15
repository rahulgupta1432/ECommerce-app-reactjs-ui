import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineGlobal, AiOutlineBell, AiOutlineMessage } from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import { useCart } from '../../context/Cart';
import { Badge } from 'primereact/badge';

export const handleLogout = async (auth, setAuth) => {
  try {
    localStorage.removeItem("auth");
    localStorage.removeItem("x-authorization");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    setAuth({ ...auth, user: null, token: '' });
    toast.success("Logout Successfully");
  } catch (error) {
    toast.error(error.message);
  }
};

function HeaderDashboard({ title, description, keywords, author }) {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();  

  const logout = () => handleLogout(auth, setAuth);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', fontSize: '24px', color: '#333' }}>
              <div className='mt-1' style={{ color: '#83B271', fontSize: '25px' }}>
                <FaShopify />
              </div>
              <span style={{ 
                fontSize: '20px', 
                color: '#008080', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                marginLeft: '8px', 
                marginTop: '8px', 
                fontFamily: 'Georgia, serif'
              }}>
                Fusion-Store    
              </span>
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ display: 'flex', alignItems: 'center' }}>
              
              {/* Browser Icon */}
              <li className="nav-item">
                <AiOutlineGlobal style={{ fontSize: '20px', marginRight: '10px' }} />
              </li>

              {/* Notification Icon */}
              <li className="nav-item">
                <AiOutlineBell style={{ fontSize: '20px', marginRight: '10px' }} />
              </li>

              {/* Message Icon with Dropdown */}
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <AiOutlineMessage style={{ fontSize: '20px', marginRight: '10px' }} />
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">Customer</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">Delivery Man</Link>
                  </li>
                </ul>
              </li>

              {/* Cart Icon */}
              <li className="nav-item">
                <NavLink to="/cart-checkout" className="nav-link">
                  <IoCartOutline style={{ width: '25px', height: '30px' }}/> 
                  Cart
                </NavLink>
              </li>
              <Badge value={cart?.length} severity="danger" style={{ marginRight: '13px', marginLeft: '-6px', marginBottom: '24px', fontSize: '15px' }}></Badge>

              {/* Profile Dropdown */}
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth?.user?.username}
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink to={`/dashboard/admin`} className="dropdown-item">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink onClick={logout} to="/login" className="dropdown-item">Logout</NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

HeaderDashboard.defaultProps = {
  title: 'Fusion-Store - Buy now',
  description: 'Mern Stack ECommerce Project',
  keywords: 'mern,react,node,mongodb,restapi',
  author: 'Rahul Gupta'
};

export default HeaderDashboard;

// import React from 'react'
// import {NavLink,Link} from "react-router-dom";
// import { Helmet } from 'react-helmet';
// import { useAuth } from '../../context/Auth';
// import { toast } from 'react-toastify';

// function Header({title,description,keywords,author}) {
//   const [auth,setAuth]=useAuth();
//   const handleLogout=async()=>{
//     try {
//       localStorage.removeItem("auth");
//       localStorage.removeItem("x-authorization");
//       localStorage.removeItem("username");
//       localStorage.removeItem("role");
//       localStorage.removeItem("id");
//       setAuth({...auth,user:null,token:''});
//       toast.success("Logout Succesfully");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }
//   return (
//     <>
//     <Helmet>
//       <meta charSet="utf-8" />
//       <meta name="description" content={description}/>
//       <meta name="keywords" content={keywords}/>
//       <meta name="author" content={author}/>
//       <title>{title}</title>
//       </Helmet>
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <button 
//       className="navbar-toggler" 
//       type="button" 
//       data-bs-toggle="collapse" 
//       data-bs-target="#navbarTogglerDemo01" 
//       aria-controls="navbarTogglerDemo01" 
//       aria-expanded="false" 
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//       <Link to="/" className="navbar-brand">
//       {/* /<GiShoppingBag/> */}
//       🛒 ECommerce App
//       </Link>
//       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <NavLink to="/" className="nav-link">Home</NavLink>
//         </li>

//         <li className="nav-item">
//           <NavLink to="/categories" className="nav-link">Category</NavLink>
//         </li>
  
//         {
//           !auth.user?(<>
//           <li className="nav-item">
//           <NavLink to="/register" className="nav-link">
//           Register
//           </NavLink>
//         </li>

//         <li className="nav-item">
//           <NavLink to="/login" className="nav-link">
//           Login
//           </NavLink>
//         </li>
          
//           </>):(<>

//             <li className="nav-item dropdown">
//   <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Dropdown link
//   </a>
//   <ul className="dropdown-menu">
//     <li><a className="dropdown-item" href="#">Action</a></li>
//     <li><a className="dropdown-item" href="#">Another action</a></li>
//     <li><a className="dropdown-item" href="#">Something else here</a></li>
//   </ul>
// </li>
// <li className="nav-item dropdown">
//   <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//     {auth?.user?.username}
//   </NavLink>
//   <ul className="dropdown-menu">
//   <li>
//   <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
//     Dashboard
//   </NavLink>
// </li>


//     <li>

//     <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
//           Logout
//           </NavLink>
//     </li>
//   </ul>
// </li>
//             {/* <li className="nav-item">
          
//         </li> */}
          
//           </>)
//         }

//         <li className="nav-item">
//           <NavLink to="/cart" className="nav-link" href="#">
//           Cart (0)
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>

    
//     </>
//   )
// }
// Header.defaultProps={
//   title:'ECommerce App - Buy now',
//   description:'Mern Stack ECommerce Project',
//   keywords:'mern,react,node,mongodb,restapi',
//   author:'Rahul Gupta'
// }

// export default Header


import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';

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

function Header({ title, description, keywords, author }) {
  const [auth, setAuth] = useAuth();

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
            <Link to="/" className="navbar-brand">🛒 ECommerce App</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categories" className="nav-link">Category</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.username}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink onClick={logout} to="/login" className="dropdown-item">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">Cart (0)</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

Header.defaultProps = {
  title: 'ECommerce App - Buy now',
  description: 'Mern Stack ECommerce Project',
  keywords: 'mern,react,node,mongodb,restapi',
  author: 'Rahul Gupta'
};

export default Header;

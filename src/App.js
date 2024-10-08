import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';
import Verification from './pages/Auth/Verification';
import Login from './pages/Auth/Login';
import ForgetPassword from './pages/Auth/ForgetPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProductsPage from './pages/Admin/ProductsPage';
import OrdersPage from './pages/Admin/OrdersPage';
import OfferPage from './pages/Admin/OfferPage';
import UsersPage from './pages/Admin/UsersPage';
import CategoryPage from './pages/Admin/CategoriesPage';
import AdminMenu from './components/Layout/AdminMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryProducts from './pages/CategoryProducts';
import AllCategories from './pages/AllCategories';
import Cart from './pages/Cart';
import UserProfile  from './pages/User/UserProfile';
import AccountDetails from './pages/User/AccountDetails';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/Admin/OrderDetails';
// import UserProfile from './pages/User/UserProfile';
// import AccountDetails from './pages/User/AccountDetails';
// import TemplateDemo from './pages/Admin/TemplateDemo';

function App() {
  const [contactMethod, setContactMethod] = useState('');
  const [getContactNumber,setContactNumber]=useState('');
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/product/:slug/prd/:id' element={<ProductDetails/>}/>
      <Route path='/category/:id/cat/:id' element={<CategoryProducts/>}/>
      <Route path='/categories' element={<AllCategories/>}/>
      <Route path='/cart-checkout' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>


      
            {/* Nested private routes */}
      <Route path='/dashboard' element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
        <Route path='user' element={<Dashboard />} />
        <Route path='user/profile-details' element={<UserProfile />} />
        <Route path='user/account-details' element={<AccountDetails />} />
        {/* <Route path='user/orders' element={<OrdersPage/>} /> */}
        
        {/* Nested admin routes under dashboard */}
        <Route path='admin' element={<AdminRoute />}>
        <Route element={<AdminMenu />}/>
          <Route index element={<AdminDashboard />} />
          <Route path='categories' element={<CategoryPage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='all-orders' element={<OrdersPage />} />
          <Route path='offers' element={<OfferPage />} />
          <Route path='users' element={<UsersPage />} />
          <Route path='orders/:id' element={<OrderDetails />} />
        </Route>
      </Route>

      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
      <Route path="/register" element={<Register setContactMethod={setContactMethod} setContactNumber={setContactNumber}/>}/>
      <Route path='/verification' element={<Verification contactMethod={contactMethod } getContactNumber={getContactNumber}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forget-password' element={<ForgetPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      {/* <Route path='/data' element={<TemplateDemo/>}></Route> */}

      
      
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import '../styles/Checkout.css';
import Header from '../components/Layout/Header';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import Footer from '../components/Layout/Footer';

const Checkout = () => {
    const [cart,setCart] = useCart();
    const [auth] = useAuth();
    const [checkout, setCheckout] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const [clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    let [paymentMode,setPaymentMode]=useState(['']);
    const [showDropIn, setShowDropIn] = useState(false);
    console.log({checkout});

    // Fetch user profile data
    const getUserProfile = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/user/get-user?userId=${auth?.user?._id}`);
            const resp = response.data;

            if (resp?.code === 200) {
                const user = resp.data[0]; // Assuming you want the first user
                setFormData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    email: user.email || '',
                    mobile: user.mobile || '',
                    address1: '', // Set default if needed
                    address2: '', // Set default if needed
                    city: '',     // Set default if needed
                    state: '',    // Set default if needed
                    zipCode: '',  // Set default if needed
                });
            } else {
                toast.error(resp?.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    const totalPriceforPayment = () => {
        try {
            let total = 0;
            cart.forEach((item) => {
                total += item.price * item.quantity;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            toast.error(error?.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


// payment
    const getPaymentToken=async()=>{
        try {
          const response=await axios.get(`${API_URL}/api/v1/payment/get-payment-token`);
          const res=response?.data;
          if(res?.code===200){
            toast.success("Token Get Sucessfully Click Again to Start Payment Process!")
            setClientToken(res.data[0].clientToken);
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }

      
    useEffect(() => {
        getUserProfile();
        const getAmounts = localStorage.getItem('checkout');
        if (getAmounts) {
            const parsedCheckout = JSON.parse(getAmounts);
            setCheckout(parsedCheckout);
        }
    }, [auth?.user?._id,auth?.token]);
    const handlePayment=async()=>{
        try {
          setLoading(true);
          let nonceData = [];
          if(paymentMode==="Paypal"){
            const {nonce}=await instance.requestPaymentMethod();
            nonceData.push(nonce)
            // const nonceData=nonce;
          }

          const totalQuantity = cart.reduce((acc, product) => acc + product.quantity, 0);
          if(paymentMode==="Cash on Delivery"){
            paymentMode="COD";
          }

          const response=await axios.post(`${API_URL}/api/v1/payment/process?paymentMode=${paymentMode}`,{
            nonce:nonceData,cart,
            quantity:totalQuantity,
            totalPayment:totalPriceforPayment()
          })
          const resp=response.data;
          if(resp.code===200){
              setLoading(false);
              localStorage.removeItem('cart');
              setCart([]);
              navigate("/dashboard/user/orders");
              toast.success(response?.data?.message);
            }
        } catch (error) {
          toast.error(error?.response?.data?.message);
          setLoading(false);
        }
      }

      const handleMakePayment = async () => {

        if (paymentMode === "Paypal") {
            await getPaymentToken();
            // Check if clientToken and cart have valid values
            if (!clientToken || !cart?.length) {
                return; // Exit the function if invalid
            }
            setShowDropIn(true); 
        } else if (paymentMode === "Cash On Delivery") {
            paymentMode="COD";
            // Show modal with order placed successfully
            handlePayment();
            // Optionally navigate or perform any other action here
        } else if (paymentMode === "UPI") {
            // Show a message that UPI is currently unavailable
            toast.info("UPI payment method is currently unavailable.");
        }
    };
    

      
    

    return (
        <div className='container-fluid-checkout-custom'>
            <Header />
            <div className="main-content-checkout-custom">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            <a className="breadcrumb-item text-dark" href="#">Home</a>
                            <a className="breadcrumb-item text-dark" href="#">Shop</a>
                            <span className="breadcrumb-item active">Checkout</span>
                        </nav>
                    </div>
                </div>

                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Billing Address</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="row">
                                {['First Name', 'Last Name', 'E-mail', 'Mobile No', 'Address Line 1', 'Address Line 2', 'City', 'State', 'ZIP Code'].map((label, index) => {
                                    const name = label.toLowerCase().replace(/ /g, '');
                                    return (
                                        <div className="col-md-6 form-group" key={index}>
                                            <label>{label}</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder={label === 'E-mail' ? 'example@email.com' : label === 'Mobile No' ? '+123 456 789' : '123 Street'}
                                                name={name}
                                                value={formData[name]} // Ensures pre-filled values
                                                onChange={handleChange}
                                            />
                                        </div>
                                    );
                                })}
                                <div className="col-md-6 form-group">
                                    <label>Country</label>
                                    <select className="custom-select">
                                        <option selected>United States</option>
                                        <option>Afghanistan</option>
                                        <option>Albania</option>
                                        <option>Algeria</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="collapse mb-5" id="shipping-address">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">Shipping Address</span>
                            </h5>
                            <div className="bg-light p-30">
                                <div className="row">
                                    {['First Name', 'Last Name', 'E-mail', 'Mobile No', 'Address Line 1', 'Address Line 2', 'City', 'State', 'ZIP Code'].map((label, index) => (
                                        <div className="col-md-6 form-group" key={index}>
                                            <label>{label}</label>
                                            <input className="form-control" type="text" 
                                            placeholder={label === 'E-mail' ? 'example@email.com' : label === 'Mobile No' ? '+123 456 789' : '123 Street'}
                                             />
                                        </div>
                                    ))}
                                    <div className="col-md-6 form-group">
                                        <label>Country</label>
                                        <select className="custom-select">
                                            <option selected>United States</option>
                                            <option>Afghanistan</option>
                                            <option>Albania</option>
                                            <option>Algeria</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Order Total</span>
                        </h5>
                        <div className="bg-light p-30 mb-5">
                            <div className="border-bottom">
                                <h6 className="mb-3">Products</h6>
                                <div>
                                    {cart.map((product, index) => (
                                        <div className="d-flex justify-content-between" key={index}>
                                            <p>{product.name}</p>
                                            <p>Quantity: {product.quantity}</p>
                                            <p>${(product.price * product.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <h6 className="mb-3">Total: {totalPriceforPayment()}</h6>
                            </div>
                        </div>
                        <div className="mb-5">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">Payment</span>
                            </h5>
                            <div className="bg-light p-30">
                            {['Paypal', 'Cash On Delivery', 'UPI'].map((paymentMethod, index) => (
    <div className="form-group" key={index}>
        <div className="custom-control custom-radio">
            <input
                type="radio"
                className="custom-control-input"
                name="payment"
                id={paymentMethod.toLowerCase().replace(' ', '')}
                value={paymentMethod} // Set the value of the radio button
                onChange={() => setPaymentMode(paymentMethod)} // Update payment mode on change
                checked={paymentMode === paymentMethod} // Check if this option is selected
            />
            <label className="custom-control-label ml-4" htmlFor={paymentMethod.toLowerCase().replace(' ', '')}>
                {paymentMethod}
            </label>
        </div>
    </div>
))}
                                
                                <button className="btn btn-block btn-primary font-weight-bold py-3"
                                onClick={handleMakePayment}
                                >Place Order</button>
                                 {/* Show DropIn component only if paymentMode is Paypal and showDropIn is true */}
                                 {paymentMode === "Paypal" && showDropIn && (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: { flow: 'vault' },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button
                                            style={{
                                                backgroundColor: '#FFD333',
                                                borderColor: '#FFD333',
                                                marginTop: '10px',
                                                marginLeft: '100px',
                                                height: '50px',
                                                width: '200px'
                                            }}
                                            onClick={handlePayment}
                                        >
                                            {loading ? 'Processing...' : 'Make Payment'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Checkout;

import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import '../styles/Cart.css'
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';

const Cart = () => {
    const [cart,setCart]=useCart();
    const [auth,setAuth]=useAuth();
    console.log(auth,setAuth);

    const handleAddQuantity = (itemId) => {
        const updatedCart = cart.map(item => 
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };
    const handleSubtractQuantity = (itemId) => {
        const updatedCart = cart.map(item => 
            item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
    };

    const handleRemoveItem = (itemId) => {
        cart.filter(item => item._id !== itemId);
        // setCart(updatedCart);
        let myCart=[...cart];
        let index=myCart.findIndex((item)=>item._id===itemId);
        myCart.splice(index,1);
        setCart(myCart)
        localStorage.setItem('cart',JSON.stringify(myCart));
    };
    const truncateString = (str, num) => {
        if (str.length > num) {
          return str.slice(0, num) + '...';
        }
        return str;
      };


      



      const calculateDiscount = (cart) => {
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        let discount = 0;
      
        if (totalPrice > 1000) {
          discount = totalPrice * 0.15; // 15% discount
        } else if (totalPrice > 500) {
          discount = totalPrice * 0.10; // 10% discount
        } else if (totalPrice > 200) {
          discount = totalPrice * 0.05; // 5% discount
        }
      
        return discount;
      };
      
      const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const shippingCost = 10; // Fixed shipping cost
      const discount = calculateDiscount(cart);
      const finalAmount = totalPrice + shippingCost - discount;
    //   subtotal include price quantity shipping chagre
    
  
      
  return (
    <>
      <Header />
      
      <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb bg-light mb-30" style={{marginTop:'24px'}}>
                <a className="breadcrumb-item text-dark" style={{textDecoration:'none'}}>Home</a>
                <a className="breadcrumb-item text-dark" style={{textDecoration:'none'}}>Shop</a>
                <span className="breadcrumb-item">Shopping Cart</span>
              </nav>
            </div>
          </div>

        </div>
      <div className='container' style={{ marginLeft: '0px',paddingRight:'100px' }}> {/* Adjust padding here */}
        {/* cart */}
        <div className="container-fluid mt-3 pt-1 pl-0">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
            <p className='custom-summary' style={{textAlign:'center'}}>You have <b>{cart.length}</b> items in your cart</p>
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {/* {[...Array(5)] */}
                  {cart.map((item, index) => (
                    <tr key={index}>

<td className="align-middle">
    <div style={{display: 'flex', alignItems: 'center' }}
    >

        <img src={item.imageList[0]} alt={item.name} style={{ width: '50px',marginRight:'20px' }} />
        <span>{truncateString(item.name,30)}</span>
    </div>
      </td>

                      <td className="align-middle">{item.price}</td>
                      <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{ width: '100px' }}>
                          <div className="input-group-btn">
                            <button 
                            style={{height:'25px'}}
                            className="custom-button custom-summary btn btn-sm btn-primary btn-minus"
                            onClick={() => handleSubtractQuantity(item._id)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          {/* <input type="text" className="form-control form-control-sm secondary border-0 text-center" value="1" readOnly /> */}
                          <input type="text"
                           className="form-control secondary border-0 text-center mt-2" placeholder='1' value={item.quantity} />
                          <div className="input-group-btn">
                            <button
                            style={{height:'25px'}}
                             className="custom-button custom-summary btn btn-sm btn-primary btn-plus"
                             onClick={() => handleAddQuantity(item._id)}
                             >
                              <i className="fa fa-plus" style={{fontWeight:'bold'}}></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="">
                        {/* <button className="btn btn-sm btn-danger"  */}
                        <button className="" 
                        style={{height:'24px',width:'40px',
                            backgroundColor:'red',borderColor:'red',color:'#FFFFFF',borderRadius:'2px'
                        }}
                        onClick={() => handleRemoveItem(item._id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            {/* <div className="col-lg-4"> */}
            <div className="col-lg-4">
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                  style={{borderColor:'white',height:'45px',marginLeft:'90px'}}
                   type="text" className="form-control border-0 p-4 mt-3" placeholder="Coupon Code" />
                  <div className="input-group-append" style={{marginRight:'-150px',width:'120px'}}>
                    <button className="custom-button custom-summary btn btn-primary mr-3">Apply Coupon</button>
                  </div>
                </div>
              </form>
              <h5 className="section-title position-relative text-uppercase mb-3" style={{marginTop:'30px'}}>
                <span className="custom-summary secondary pr-3" style={{fontSize:'20px'
                    ,marginLeft:'100px'
                }}>Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2" style={{marginLeft:'110px',marginTop:'30px'}}>
                  <div className="d-flex justify-content-between mb-3">
                    <h6 className='custom-summary'>Subtotal</h6>
                    <h6 className='custom-summary' style={{marginLeft:"220px"}}>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h6>
                  </div>
                  <div className="d-flex justify-content-between" style={{marginTop:"25px"}}>
                    <h6 className="custom-summary font-weight-medium">Shipping</h6>
                    <h6 className="custom-summary font-weight-medium" style={{ marginLeft: "220px" }}>
                    ${(cart.reduce((acc, item) => acc + item.quantity, 0) * 10 + 10).toFixed(2)}
                    </h6>

                  </div>
                  {/* discount */}
                  <div className="d-flex justify-content-between" style={{marginTop:"25px"}}>
                    <h6 className="custom-summary font-weight-medium">Discount</h6>
                    <h6 className="custom-summary font-weight-medium" style={{ marginLeft: "220px" }}>
                    ${discount.toFixed(2)}
                    </h6>
                  </div>
                  {/* end here sub discount */}


                </div>

                <div className="pt-2" style={{marginLeft:'105px',marginTop:"20px"}}>
                  <div className="custom-summary d-flex justify-content-between mt-2">
                    <h5 style={{fontWeight:'bold',marginLeft:'10px'}}>Total</h5>
                    <h5 style={{fontWeight:'bold',marginLeft:'230px'}}>
                    {/* ${(cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 10).toFixed(2)} */}
                    ${finalAmount.toFixed(2)}
                    </h5>
                  </div>
                  <button className="custom-button btn btn-block btn-primary font-weight-bold my-3 py-3" 
                  style={{color:'#3D464D',fontWeight:'bold',width:'120%',marginLeft:'75px'}}
                  >Proceed To Checkout</button>
                </div>
              </div>
            </div>



            {/* end coupon */}
          </div>
        </div>
      </div>
      <Footer />
      
      
    </>
  );
}

export default Cart;

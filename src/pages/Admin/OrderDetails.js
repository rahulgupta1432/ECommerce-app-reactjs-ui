import React from 'react'
import Header from '../../components/Layout/Header'
import AdminMenu from '../../components/Layout/AdminMenu'

const OrderDetails = () => {
  return (
    <>
         <Header title={'Dashboard - Fusion-Store'}/>
             <div className='container-fluid m-3 p-3'>
                 <div className='row'>
                     <div className='col-md-3'>
                         <AdminMenu/>
                     </div>
                     <div className='col-md-9'>
                       Order Details


                     </div>
                 </div>
             </div>
    </>
  )
}

export default OrderDetails

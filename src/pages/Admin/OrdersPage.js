import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'

const OrdersPage = () => {
  return (
    <Layout title={'Dashboard - Fusion-Store'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                      Order Pages

                       
                    </div>
                </div>
            </div>
        </Layout>
  )
}

export default OrdersPage

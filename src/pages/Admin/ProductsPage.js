import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const ProductsPage = () => {
  return (
    <Layout title={'Dashboard - All Products'}>
      <div className='container-fluid m-3 p-3'>
    <div className='row'>

      <div className='col-md-3'>

        <AdminMenu />
      </div>
      <div className='col-md-9'>
    <h1>Products</h1>
      </div>
    </div>
    </div>

  </Layout>
  )
}

export default ProductsPage

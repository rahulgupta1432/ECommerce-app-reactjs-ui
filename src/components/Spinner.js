import React from 'react'
import "../styles/Spinner.css"
import Layout from './Layout/Layout'

const Spinner = () => {
    return (
        <>
            <Layout>
            <div className="bg d-flex justify-content-center align-items-center" style={{minHeight:'65vh',marginTop:'10px'}}>
                <div className="loader"></div>
            </div>

            </Layout>
        </>
    )
}

export default Spinner

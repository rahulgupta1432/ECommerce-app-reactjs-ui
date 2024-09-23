import React from 'react'
import "../styles/Spinner.css"
import Layout from './Layout/Layout'

const Spinner = () => {
    return (
        <>
            <Layout>
            <div className="bg d-flex justify-content-center align-items-center" style={{height:'70vh'}}>
                <div className="loader"></div>
            </div>

            </Layout>
        </>
    )
}

export default Spinner

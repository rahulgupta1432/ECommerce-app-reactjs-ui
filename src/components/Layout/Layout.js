import React from 'react'
import Header from './Header';
import Footer from './Footer';
import {Helmet} from "react-helmet";
function Layout({children}) {
  return (
    <div>
      {/* <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
      <meta name="author" content={author}/>
      <title>{title}</title>
      </Helmet> */}
      <Header title={"Online Shopping site in India: Shop Online for Mobiles, Books, Watches, TV,Electronics"}/>
      <main>
      <main style={{minHeight:"70vh"}}>{children}</main>
      </main>
      <Footer/>

    </div>
  )
}

export default Layout;
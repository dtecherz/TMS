import React from 'react'
import Navbar_2 from '../components/Navbar_2'
import Footer from '../components/Footer'
import { ShoppingOutlined } from "@ant-design/icons"
const NotFound = () => {
  return (
    <>
    <Navbar_2 />

      <section className='thankyou_page min-h-[85vh] flex justify-center items-center text-center'>
        <div className="container ">
      
            
            <h1 className='!text-[3.5rem] '>404</h1>
            <h3>Page not found</h3>
          
        </div>
      </section>

      

      <Footer />
    </>
  )
}

export default NotFound

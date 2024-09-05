import React from 'react'
import Navbar_2 from '../components/Navbar_2'
import Footer from '../components/Footer'

const Forbidden = () => {
  return (
    <>
    <Navbar_2 />

      <section className='thankyou_page min-h-[85vh] flex justify-center items-center text-center'>
        <div className="container ">
      
            
            <h1 className='!text-[3.5rem] '>403</h1>
            <h3>Forbidden Access</h3>
          
        </div>
      </section>

      

      <Footer />
    </>
  )
}

export default Forbidden

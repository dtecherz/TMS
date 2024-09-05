import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../ContextAPI/Components/auth'
import Navbar_2 from '../components/Navbar_2'
import Footer from '../components/Footer'
import { Button, Result } from 'antd'

import { ShoppingOutlined } from "@ant-design/icons"


const ThankYouPage = () => {
  const { user } = useAuth()
  return (
    <>

      <Navbar_2 />

      <section className='thankyou_page min-h-[85vh] flex justify-center items-center text-center'>
        <div className="container ">
          <div className="card">
            <ShoppingOutlined className='text-[4rem] text-[#973e12] ' />
            <h2>Thank You For placing orders!!</h2>
          </div>
          <Link to={user?.role === "guest" ? '/guest-orders' : '/my-orders'} >
          <button className='btn submit_btn dark_hover_btn thankyou'>My Orders</button>
          </Link>
        </div>
      </section>

      

      <Footer />

    </>
  )
}

export default ThankYouPage
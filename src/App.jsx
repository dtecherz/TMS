import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from './ContextAPI/Components/auth'
import { useCookies } from 'react-cookie'
import axios from 'axios'

import './App.css'
import Home_Layout from './components/Home_Layout'
import Home from './pages/Home'
import Home_2 from './pages/Home_2'
import ProductList from './pages/ProductList'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ThankYouPage from './pages/ThankYouPage'
import NotFound from './pages/404'
import Forbidden from './pages/403'
import { useCart } from './ContextAPI/Components/CartContext'
import MyOrders from './pages/MyOrders'
import GuestOrderTracking from './pages/GuestOrderTracking'





function App() {

  const { getUserCartsData, carts } = useCart()
  console.log('cartssssss', carts)
  const { GetLoginUSer, user, GuestLoginData } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['pk2']);
  axios.defaults.headers["authorization"] = `Bearer ${cookies.pk2 || null}`;
  axios.defaults.headers["ngrok-skip-browser-warning"] = `1211`;

  const [formData, setFormData] = useState({
    email: "", password: "", name: "", role: "guest"
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);


  // useEffect(() => {

  //   if (window.location.host === "localhost:5173") {
  //     return () => {
  //       // GuestLoginData(formData);
  //     };
  //   } else {
  //     // GuestLoginData(formData);
  //   }

  //   getUserCartsData()
  // }, []);

  console.log('ppppppppp', cookies.pk2)


  useEffect(() => {
    if (user == null && cookies.pk2 !== undefined) {
      GetLoginUSer();
    }
  }, [user]);
  useEffect(() => {
    if (user == null && cookies.pk2 !== undefined) {
      // GetLoginUSer();
      getUserCartsData()
    }
  }, [carts]);


  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: for a smooth scrolling effect
  });

  return (
    <>

      <Routes>
        <Route element={<Home_Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/home-2" element={<Home_2 />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:slug" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-tracking/:id" element={<OrderTracking />} />

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route exact path='/thankyou' element={<ThankYouPage />} />
          <Route exact path='/my-orders' element={<MyOrders />} />
          <Route exact path='/guest-order-tracking' element={<GuestOrderTracking />} />
          <Route exact path='/404' element={<NotFound />} />
          <Route exact path='/403' element={<Forbidden />} />
        </Route>
      </Routes>

    </>
  )
}


export default App
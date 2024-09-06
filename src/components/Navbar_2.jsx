import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Image, Layout, Tooltip } from 'antd';
import { LogoutOutlined ,ShoppingOutlined,ShoppingCartOutlined} from '@ant-design/icons'



// CUSTOM HOOKS
import { useHideOnOutsideDetect } from "../hooks/useHideOnOutsideDetect"

import logo from "../assets/logo.png"
import logo2 from '../assets/black-version-removebg-preview.png'
import { useAuth } from '../ContextAPI/Components/auth';
import { useCookies } from 'react-cookie';
import { useCart } from '../ContextAPI/Components/CartContext';

const { Header } = Layout;




function Navbar_2(props) {

    const {user ,} = useAuth()
    const {carts} = useCart()
    console.log('cartsssssss',carts)
    const [cookies, setCookie, removeCookie] = useCookies(['pk2']);

    const items1 = [
        {
            key: "1",
            label: <Link to={"/"}>Home</Link>,
        },
        {
            key: "1",
            label: <Link to={"/shop"}>Product List</Link>,
        },
    ];
    
    console.log('ppppppppp',cookies?.pk2)
    useEffect(() => {
        localStorage.setItem("no-scroll", "no")
        document.body.classList.remove('no-scroll');
    }, [])




    // STATES
    const [isToggled, setisToggled] = useState(false)

    const links = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Product List',
            link: '/shop',
        },

    ]

    const menuRef = useRef(null)

    useHideOnOutsideDetect(menuRef, setisToggled)



    return (
        <>
            <nav ref={menuRef} className="navbar_2 w-full z-20 top-0 left-0 start-0">
                <div className={`relative flex flex-wrap items-center justify-between mx-auto ${props.customClass} px-8 max-md:py-6`}>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse rounded-full bg-color-base opacity-1">
                        <div className="demo-logo" >
                            <Link to={"/"} className='logo_link'>
                                <Image className='logo' preview={false} src={logo2} alt='logo image' />
                            </Link>
                        </div>
                    </div>


                    <div className={`navbar_2_links overflow-hidden absolute z-10 md:static left-0 px-0 top-12 sm:top-14 transition-all duration-300 items-center justify-between h-max md:max-h-full ${!isToggled ? 'max-h-0' : 'max-h-[290px]'} w-full md:flex md:w-auto md:order-1`}>
                        <ul className="overflow-hidden bg-[white] flex flex-col p-4 md:p-0 mt-4 font-medium md:border-none border-b border-[#a55e3f] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">

                            {
                                links.map((e, i) => {
                                    return <Fragment key={i}>
                                        {
                                            <li key={i}>
                                                <Link to={e.link} className="block py-2 px-3 transition-all duration-300 md:p-0">{e.name}</Link>
                                            </li>
                                        }
                                    </Fragment>
                                })
                            }

                            <li>
                                <Link to={'/cart'} className="md:hidden block py-2 px-3 transition-all duration-300 focus:outline-none focus:ring-0 font-medium md:p-0 sm:px-4 sm:py-2">
                                <ShoppingCartOutlined />
                                </Link>
                            </li>

                        </ul>
                    </div>


                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <div>

                        <Link to={'/cart'} className="hidden transition-all duration-300  focus:outline-none focus:ring-0 font-medium px-2 sm:px-4 sm:py-0 text-center md:flex justify-center items-center">
                       
                       
                        <ShoppingCartOutlined   className='social_icons cart-icon' style={{fontSize: "22px"}}/>
                       {carts.length > 0 && (

                           
                           <span className='cart-number'>{carts.length}</span>
                        )
                       }

                        
                        </Link>
                            </div>
                            <Link to={'/my-orders'} className="hidden transition-all duration-300  focus:outline-none focus:ring-0 font-medium px-2 sm:px-4 sm:py-0 text-center md:flex justify-center items-center">
                                {
                                    (user?.role != "guest" && (cookies?.pk2 !== null || cookies.pk2 !== undefined)) ?
                                    <ShoppingOutlined className='social_icons' style={{fontSize: "20px"}} />
                                :

                                <></>

                                }
                            </Link>
                        <Tooltip title="Logout">
                            <Link to={'/sign-in'} className="hidden transition-all duration-300  focus:outline-none focus:ring-0 font-medium px-2 sm:px-4 sm:py-0 text-center md:flex justify-center items-center">
                                {
                                    (user && (cookies?.pk2 !== null || cookies.pk2 !== undefined)) ?
                                    <LogoutOutlined className='social_icons' style={{fontSize: "20px"}} />
                                :

                                <></>

                                }
                            </Link>
                        </Tooltip>
                                
                        <button onClick={() => setisToggled(!isToggled)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center border border-[#a55e3f] bg-transparent rounded-none md:hidden focus:outline-none focus:border-[#a55e3f] focus:ring-0" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5 text-[#a55e3f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>

                </div>
            </nav>






            <div className="navbar_2_border_bottom"></div>

        </>
    )
}

export default Navbar_2

import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Link } from 'react-router-dom';
import { useAuth } from '../ContextAPI/Components/auth';
import { useCookies } from 'react-cookie';

const text1 = `Product List`;
const text2 = `Cart`;
const text3 = `Product Single`;

function NavMenu() {

    const { user ,SignOut} = useAuth()
    const [cookies, setCookie, removeCookie] = useCookies(['pk2']);

    console.log("cokie", cookies)
    const handleMenu = () => {
        const isMenuOpen = localStorage.getItem("no-scroll")

        if (isMenuOpen == "no") {
            localStorage.setItem("no-scroll", "yes")
            document.body.classList.add('no-scroll');
        } else {
            localStorage.setItem("no-scroll", "no")
            document.body.classList.remove('no-scroll');
        }

    }

    // useEffect(() => {
    //     const isMenuOpen = localStorage.getItem("no-scroll")

    //     if (isMenuOpen == "no") {
    //         document.body.classList.add('no-scroll');
    //     } else {
    //         document.body.classList.remove('no-scroll');
    //     }
    // }, [isMenuOpen]);



    const items = [
        {
            key: '1',
            label: <p>Shop</p>,
            children:
                <ul>
                    <li>
                        <Link to="/product-list">{text1}</Link>
                    </li>
                    
                    {/* <li>
                        <Link to="/product">{text3}</Link>
                    </li> */}
                </ul>
        },
    ]


    return (
        <>
            <div id="menuArea">
                <input type="checkbox" id="menuToggle"></input>

                <label for="menuToggle" className="menuOpen" onClick={() => handleMenu()}>
                    <div className="open"></div>
                </label>

                <div className="menu menuEffects">
                    <label for="menuToggle"></label>
                    <div className="menuContent">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            {/* <li><Link to="/home-2">Home 2</Link></li> */}
                            {/* <li>
                                <Collapse accordion items={items} />
                            </li> */}
                          
                            <li><Link to="/cart">Cart</Link></li>

                            {/* {(user?.role != "guest" && (cookies?.pk2 !== null || cookies.pk2 !== undefined)) ? 

                            // <li><Link to="/sign-in">Sign In</Link></li>
                            <></>
                            :
                            
                        } */}
                        {
                            // console.log('???',cookies.pk2 == undefined)
                            (cookies.pk2 == null || cookies.pk2 == undefined)
                            ?
                            <li><Link to="/sign-in">Sign In</Link></li>
                            :
                            <></>

                        }
                            {(user?.role != "guest" && (cookies?.pk2 !== null || cookies.pk2 !== undefined))
                                ?
                                <li><Link  to = "/my-orders">Orders  </Link></li>
                                :
                                <><li><Link  to = "/order-tracking/:id">Track Order 🚚 </Link></li></>
                            }
                            {(user && (cookies?.pk2 !== null || cookies.pk2 !== undefined))
                                ?
                                <li><Link onClick={SignOut}>Sign Out</Link></li>
                                :
                                <></>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavMenu

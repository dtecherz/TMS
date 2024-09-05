import { Image, Layout, Menu } from 'antd';
import React from 'react'

import "../../src/NavMenu.css"

const { Header } = Layout;

import logo from "../assets/black-version-removebg-preview.png"
import NavMenu from './NavMenu';


function Navbar() {

    const items1 = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));


    return (
        <>
            <Header style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                <div className="demo-logo"  style={{paddingTop:"50px"}} >
                    <Image
                        className='logo'
                        preview={false}
                        src={logo}
                        alt='logo image'
                        
                    />
                </div>

                <div>
                    <NavMenu />
                </div>

                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                /> */}
            </Header>
        </>
    )
}

export default Navbar

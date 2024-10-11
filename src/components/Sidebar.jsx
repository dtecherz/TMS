import React from 'react'
import { UserOutlined, UserDeleteOutlined, MoneyCollectOutlined, ProductOutlined, VideoCameraOutlined, SettingOutlined, FileOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Image, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo-ipsum.png"
import { useAuth } from '../ContextAPI/Components/auth';


const { Sider } = Layout;


function getItem(label, key, icon, children) {
    return { key, icon, children, label, };
}


function Sidebar({ collapsed }) {
    const { SignOut } = useAuth();
    const location = useLocation();

    // const sidebarNavigation = [
    //     getItem(<Link to={"/users"}>Users</Link>, '1', <UserOutlined />),
    //     getItem('Category', 'sub1', <ProductOutlined />, [
    //         getItem(<Link to={"/category-list"}>Category List</Link>, '3'),
    //         getItem(<Link to={"/create-category"}>Create Category</Link>, '4'),
    //         getItem(<Link to={"/edit-category"}>Edit Category</Link>, '18'),
    //     ]),
    //     getItem(<Link to={"/variation-list"}>Variation</Link>, '5', <VideoCameraOutlined />),
    //     getItem('Products', 'sub2', <ProductOutlined />, [
    //         getItem(<Link to={"/product-list"}>Products List</Link>, '6'),
    //         getItem(<Link to={"/create-product"}>Create Product</Link>, '7'),
    //     ]),
    //     getItem(<Link to={"/product-variation-list"}>Products Variations</Link>, '8', <FileOutlined />),
    //     getItem(<Link to={"/orders"}>Orders</Link>, '9', <ShoppingOutlined />),
    //     // getItem(<Link to={"/addresses"}>Addresses</Link>, '10', <FileOutlined />),
    //     getItem(<Link to={"/settings"}>Settings</Link>, '11', <SettingOutlined />),
    //     getItem('Gallery', 'sub3', <ProductOutlined />, [
    //         getItem(<Link to={"/gallery"}>All Images</Link>, '12'),
    //         getItem(<Link to={"/upload-images"}>Upload</Link>, '13'),
    //     ]),
    //     getItem(<Link to={"/add-payment-method"}>Payment</Link>, '14', <MoneyCollectOutlined />),
    //     getItem(<span onClick={() => SignOut()}>Logout</span>, '15', <UserDeleteOutlined />,),
    //     getItem('Shipping Methods', 'sub4', <ProductOutlined />, [
    //         getItem(<Link to={"/shipping-methods"}>Shipping List</Link>, '16'),
    //         getItem(<Link to={"/add-shipping-method"}>Create Shipping</Link>, '17'),
    //     ]),

    // ];

    // // Determine the active key based on the current URL path
    // const getActiveKey = () => {
    //     const path = location.pathname;
    //     // Customize according to your routes
    //     if (path.startsWith('/users')) return '1';
    //     if (path.startsWith('/category-list')) return '3';
    //     if (path.startsWith('/create-category')) return '4';
    //     if (path.startsWith('/variation-list')) return '5';
    //     if (path.startsWith('/product-list')) return '6';
    //     if (path.startsWith('/create-product')) return '7';
    //     if (path.startsWith('/product-variation-list')) return '8';
    //     if (path.startsWith('/orders')) return '9';
    //     if (path.startsWith('/addresses')) return '10';
    //     if (path.startsWith('/settings')) return '11';
    //     if (path.startsWith('/gallery')) return '12';
    //     if (path.startsWith('/upload-images')) return '13';
    //     if (path.startsWith('/add-payment-method')) return '14';
    //     if (path.startsWith('/shipping-methods')) return '16';
    //     if (path.startsWith('/add-shipping-method')) return '17';
    //     if (path.startsWith('/edit-category')) return '18';
    //     return '';
    // };



    const sidebarNavigation = [
        getItem(<Link to={"/users"}>Users</Link>, '1', <UserOutlined />),
        getItem('Category', 'sub1', <ProductOutlined />, [
            getItem(<Link to={"/category-list"}>Category List</Link>, '3'),
            // getItem(<Link to={"/create-category"}>Create Category</Link>, '4'),
            // getItem(<Link to={"/edit-category/:id"}>Edit Category</Link>, '5'), // Moved to position 5
        ]),
        getItem(<Link to={"/variation-list"}>Variation</Link>, '6', <VideoCameraOutlined />), // Changed index from 5 to 6
        getItem('Products', 'sub2', <ProductOutlined />, [
            getItem(<Link to={"/product-list"}>Products List</Link>, '7'), // Updated from 6 to 7
            getItem(<Link to={"/create-product"}>Create Product</Link>, '8'), // Updated from 7 to 8
        ]),
        getItem('Collections', 'sub5',<ProductOutlined />,[

            getItem(<Link  to = {'/collection-list'}>Collection List  </Link>, '19')
        ]  ),
        getItem(<Link to={"/product-variation-list"}>Products Variations</Link>, '9', <FileOutlined />), // Updated from 8 to 9
        getItem(<Link to={"/orders"}>Orders</Link>, '10', <ShoppingOutlined />), // Updated from 9 to 10
        // getItem(<Link to={"/addresses"}>Addresses</Link>, '10', <FileOutlined />),
        // getItem(<Link to={"/settings"}>Settings</Link>, '11', <SettingOutlined />),
        getItem('Gallery', 'sub3', <ProductOutlined />, [
            getItem(<Link to={"/gallery"}>All Images</Link>, '12'),
            getItem(<Link to={"/upload-images"}>Upload</Link>, '13'),
        ]),
        getItem(<Link to={"/add-payment-method"}>Payment</Link>, '14', <MoneyCollectOutlined />),
        getItem('Shipping Methods', 'sub4', <ProductOutlined />, [
            getItem(<Link to={"/shipping-methods"}>Shipping List</Link>, '16'),
            // getItem(<Link to={"/add-shipping-method"}>Create Shipping</Link>, '17'),
            // getItem(<Link to={"/edit-shipping-method/:id"}>Edit Shipping</Link>, '18'),
        ]),
        getItem(<span onClick={() => SignOut()}>Logout</span>, '15', <UserDeleteOutlined />),
    ];
    
    // Determine the active key based on the current URL path
    const getActiveKey = () => {
        const path = location.pathname;
        // Customize according to your routes
        if (path.startsWith('/users')) return '1';
        if (path.startsWith('/category-list')) return '3';
        // if (path.startsWith('/create-category')) return '4';
        // if (path.startsWith('/edit-category/:id')) return '5'; // Updated to '5' for Edit Category
        if (path.startsWith('/variation-list')) return '6'; // Updated from '5' to '6'
        if (path.startsWith('/product-list')) return '7'; // Updated from '6' to '7'
        if (path.startsWith('/create-product')) return '8'; // Updated from '7' to '8'
        if (path.startsWith('/product-variation-list')) return '9'; // Updated from '8' to '9'
        if (path.startsWith('/orders')) return '10'; // Updated from '9' to '10'
        if (path.startsWith('/addresses')) return '10';
        // if (path.startsWith('/settings')) return '11';
        if (path.startsWith('/gallery')) return '12';
        if (path.startsWith('/upload-images')) return '13';
        if (path.startsWith('/add-payment-method')) return '14';
        if (path.startsWith('/shipping-methods')) return '16';
        if (path.startsWith('/collection-list')) return '19';
        // if (path.startsWith('/add-shipping-method')) return '17';
        // if (path.startsWith('/edit-shipping-method/:id')) return '18';
        return '';
    };
    

    return (
        <>
            <div className='sidebar_main'>
                <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar'>
                    <div className="demo-logo-vertical">
                        <Image
                            className='logo'
                            preview={false}
                            src={logo}
                            alt='logo image'
                            fallback="data:image/png;base64,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"
                        />
                        {/* <h2 className='text-center'>LOGO</h2> */}
                    </div>
                    <Menu theme="dark" mode="inline" selectedKeys={[getActiveKey()]} items={sidebarNavigation} />
                </Sider>
            </div>
        </>
    )
}


export default Sidebar
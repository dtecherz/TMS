import { Button, Layout } from 'antd';
import React from 'react'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;


function Navbar({ collapsed, setCollapsed, colorBgContainer }) {

    return (
        <>
            <Header
                className='navbar_main'
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
            </Header>
        </>
    )
}

export default Navbar

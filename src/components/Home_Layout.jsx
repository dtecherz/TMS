import { Layout, Menu, theme } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const { Content } = Layout;

function Home_Layout() {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Layout>
                <Layout>

                    {/* <Navbar /> */}

                    <Content style={{ margin: 0, minHeight: 280, background: colorBgContainer, borderRadius: borderRadiusLG, }} >

                        <Outlet />

                    </Content>

                </Layout>
            </Layout>
        </>
    )
}

export default Home_Layout

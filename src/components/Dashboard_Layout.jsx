import React, { useEffect, useState } from 'react'
import { Layout, Tabs, theme } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Settings from '../pages/Settings';
import { Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const { Header, Sider, Content } = Layout;



function Dashboard_Layout() {
    const [collapsed, setCollapsed] = useState(false);

    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const [cookies, setCookie, removeCookie] = useCookies();
    
    useEffect(() => {
        if(cookies?.pk2 == undefined) window.location.href = "/"

    }, [])

    if(cookies?.pk2 == undefined) return 


    return (
        <>
            <div className='dashboard_layout'>

                <div className='sidebar_div'>
                    <Sidebar collapsed={collapsed} />
                </div>

                <div className='page_div'>

                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />

                    {/* <Content style={{ margin: '24px 16px', padding: 24, minHeight: 80, borderRadius: borderRadiusLG }}> */}

                        <Outlet />
                        {/* 
                            Yay outlet important hay yahan q k agr isko use na kerra jai to
                            Layout main jo components pass hore hain ya render hore hain wo nahi honge
                            or sirf khali layout hi show hoga
                         */}

                    {/* </Content> */}
                </div>
            </div>
        </>
    )
}


export default Dashboard_Layout
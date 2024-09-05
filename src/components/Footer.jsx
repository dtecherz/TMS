import React from 'react'
import { Col, Divider, Flex, Image, Row } from 'antd'
import { Link } from 'react-router-dom';

import { WhatsAppOutlined, InstagramOutlined, TikTokOutlined, FacebookOutlined, XOutlined } from '@ant-design/icons'

import logo from "../assets/logo.png"
import logo2 from '../assets/black-version-removebg-preview.png'
import insta_img from "../assets/insta-img.jpg"


const style = {
    // background: '#0092ff',
    padding: '8px 0',
};

function Footer() {

    const d = new Date();
    let year = d.getFullYear();

    return (
        <>
            <footer className='footer'>
                <div className="container">
                    <div className='footer_inner'>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div style={style}>
                                    <div>
                                        <Image src={logo2} alt="logo" preview={false} className='logo' />
                                        <p>Your new handmade and artisan site has already been created.</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div style={style}>
                                    <div>
                                        <h5>About Us</h5>

                                        <ul>
                                            <li><Link to="#">About Me</Link></li>
                                            <li><Link to="#">About Me</Link></li>
                                            <li><Link to="#">About Me</Link></li>
                                            <li><Link to="#">About Me</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div style={style}>
                                    <div>
                                        <h5>Help</h5>

                                        <ul>
                                            <li><Link to="#">About Us</Link></li>
                                            <li><Link to="#">Get In Touch</Link></li>
                                            <li><Link to="#">Discounts</Link></li>
                                            <li><Link to="#">Returns</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <div style={style}>
                                    <div>
                                        <h5>Socials</h5>

                                        <Flex gap={10}>
                                            <div>
                                                <a href="#">
                                                    <WhatsAppOutlined className='social_icons' />
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <InstagramOutlined className='social_icons' />
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <TikTokOutlined className='social_icons' />
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <FacebookOutlined className='social_icons' />
                                                </a>
                                            </div>
                                            <div>
                                                <a href="#">
                                                    <XOutlined className='social_icons' />
                                                </a>
                                            </div>
                                        </Flex>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="footer_bottom">
                    <div className="container">
                        <p>© {year} All Rights Reserved </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer

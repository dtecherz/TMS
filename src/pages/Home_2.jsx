import React from 'react'
import { Image, Row, Col } from 'antd'

import Navbar_2 from "../components/Navbar_2"
import Footer from "../components/Footer"
import My_Button from '../components/Button'

import Hero_Slider from '../components/Hero_Slider'

import image from "../assets/smart-product.webp"

import title_SVG from "../assets/Icons/4.svg"

import journey_SVG_1 from "../assets/Icons/1.svg"
import journey_SVG_2 from "../assets/Icons/2.svg"
import journey_SVG_3 from "../assets/Icons/3.svg"


import journey_1 from "../assets/Journey/journey.webp"
import journey_2 from "../assets/Journey/journey-img-2.jpg"
import journey_3 from "../assets/Journey/journey-img-3.webp"



function Home_2() {

    return (
        <>
            <Navbar_2 customClass={"py-16"} />

            <section className='hero_area_2'>
                <Hero_Slider />
            </section>


            <section className="journey_area">
                <div className="container">
                    <div className="section_header">
                        <Image src={title_SVG} alt='icon' preview={false} />
                        <h1 className='subheading'>Our Journey</h1>
                        <p className='subtitle'>Lorem ipsum dolor sit amet a con sectet adipisicing elit se do eiuso temp or incidi unt en sed labore et dolore magna aliqua ut enim minim veniam quis nost exercitation sen sene ullamco aboris nisi ut aliquip exea commodo consequat duis aut dolor in tes repre.</p>
                    </div>

                    <div className='mt-8'>
                        <Image src={journey_1} alt="image" preview={false} />
                    </div>

                    <Row className='py-20 flex items-center justify-center'>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} className='pr-16 max-lg:pr-4 max-[992px]:mb-12 max-md:mb-12 max-md:pr-24 max-md:pl-24 max-sm:pr-4 max-sm:pl-4'>
                            <div className="journey_card">
                                <Image src={journey_SVG_1} alt='icon' preview={false} />
                                <h4>Little Passage at Artillery Store</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris dolore magnumitus omnio summ.</p>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} className='pl-8 pr-8 max-lg:pl-4 max-lg:pr-4 max-[992px]:mb-12 max-md:mb-12 max-md:pr-24 max-md:pl-24 max-sm:pr-4 max-sm:pl-4'>
                            <div className="journey_card">
                                <Image src={journey_SVG_2} alt='icon' preview={false} />
                                <h4>First suit design in August</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris dolore magnumitus omnio summ.</p>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={8} xl={8} className='pl-8 max-lg:pl-4 max-md:pr-24 max-md:pl-24 max-sm:pr-4 max-sm:pl-4'>
                            <div className="journey_card">
                                <Image src={journey_SVG_3} alt='icon' preview={false} />
                                <h4>Crafting our old family business</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris dolore magnumitus omnio summ.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={30}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Image src={journey_2} alt='image' preview={false} />
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Image src={journey_3} alt='image' preview={false} />
                        </Col>
                    </Row>

                    <div className="journey_desc pt-20">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sets voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.</p>
                    </div>

                </div>
            </section>


            <section className='smart_product_area_2'>
                <div className='container'>

                    <div className="section_header">
                        <Image src={title_SVG} alt='icon' preview={false} />
                        <h1 className='subheading'>Products</h1>
                        <p className='subtitle'>Lorem ipsum dolor sit amet a con sectet adipisicing elit se do eiuso</p>
                    </div>

                    <div className='section_content'>
                        <div className="content_box">
                            <div className='col_1 card'>
                                <p className='sub_title'>The best industry practices</p>
                                <h1 className='title'>Share in the joy</h1>
                                <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipisicing el sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud se exercitation ullamco laboris nisi ut aliquip ex ea com modo conse.</p>

                                <My_Button text={"View More"} />

                                <div className="col_1_border_right"></div>
                            </div>
                            <div className='col_2 card'>
                                <Image src={image} alt="image" preview={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='workshops_area_2'>
                <div className='container'>
                    <div className='section_content flex justify-between items-center max-md:block'>
                        <div>
                            <h2>Lorem ipsum dolor sit amet consectetur sum</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor in</p>
                        </div>

                        <div>
                            <My_Button text={"Read More"} />
                        </div>

                    </div>
                </div>
            </section>


            <Footer />

        </>
    )
}

export default Home_2

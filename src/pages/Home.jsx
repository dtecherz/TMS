import React from 'react'
import Navbar from '../components/Navbar'
import { Button, Col, Flex, Image, Row, Typography } from 'antd'
import My_Button from '../components/Button'

import image from "../assets/img.jfif"
import image1 from '../assets/ab2.jpg'
// import image1 from '../assets/content.webp'
import image3 from '../assets/ab1.jpg'
// import image3 from '../assets/cc1.webp'
import image2 from '../assets/contentImage.jfif'
import testimonial_3 from "../assets/testimonials-3.png"
import Testimonial_Slider from '../components/Testimonial_Slider'
import { InstagramEmbed } from 'react-social-media-embed'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const imgStyle = {
    display: 'block',
    width: 273,
};

function Home() {
    return (
        <>
            <section className='hero_area'>
                <Navbar />

                <div className='section_inner'>
                    <div className='container'>
                        <div className='section_content'>
                            <h2>Elevate Your Style with Timeless Elegance</h2>
                            <p>Discover our premium tan leather handbag—where style meets functionality. Shop now for handcrafted bags and slippers that add a chic touch to any outfit.</p>

                            <Link to="/shop?bestFor=bags">
                                <My_Button text={"View More"} />
                            </Link>

                        </div>
                    </div>
                </div>


            </section>

            <section className='smart_product_area'>
                <div className='section_inner'>
                    <div className='container'>
                        <div className='section_content '>
                            <div className="content_box">
                                <div className='col_1 card'>
                                    <h1 className='title'>Elegant Leather Bags & Heels</h1>
                                    <p className='desc'>Discover premium leather handbags and stylish heels designed for modern fashion lovers. Elevate your look with timeless accessories that blend sophistication and functionality, perfect for every occasion. Shop now for exclusive designs that complete your wardrobe.</p>

                                    <Link to="/shop?bestFor=bags&bestFor=shoes">
                                        <My_Button text={"View More"} />
                                    </Link>

                                    <div className="col_1_border_right"></div>
                                </div>
                                <div className='col_2 card cccc'>
                                    <Image src={image3} alt="image" preview={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='workshops_area'>

                <div className='section_inner'>
                    <div className='container'>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} >
                                <div className='col_2 card ccc'>
                                    <Image src={image1} alt="image" preview={false} style={{
                                        maxHeight: "500px",
                                        width: "500px",
                                        objectFit: "cover",
                                        borderRadius: "5px"
                                    }} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} >
                                <div className='section_content'>
                                    <h2>CHILDREN CREATIVE WORKSHOPS</h2>
                                    <p>Elevate your style with this luxurious quilted leather handbag, featuring a sleek design for an elegant touch. Perfectly versatile, it’s a chic accessory for any occasion, blending sophistication with modern flair.</p>

                                    <Link to="/shop?bestFor=bags">
                                        <My_Button text={"View More"} />
                                    </Link>

                                </div>
                            </Col>

                        </Row>
                    </div>
                </div>
                <div>

                </div>

            </section>


            {/* <section className='post_area'>
                <div className="container">
                    <div className="section_content flex flex-wrap justify-center gap-3">
                        <div className="relative mx-auto border-[white] dark:border-[white] bg-[white] border-[14px] rounded-[1.5rem] h-[650px] w-[360px]">
                            <div className="h-[32px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-[white] dark:bg-[white] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                            <div className="insta_post_bg rounded-[0.5rem] overflow-hidden w-[330px] h-[625px] bg-[#a55e3f] p-1 dark:bg-[white]">
                                <InstagramEmbed url={"https://www.instagram.com/p/C8A4z6Bs6jT/"} />
                            </div>
                        </div>
                        <div className="relative mx-auto border-[white] dark:border-[white] bg-[white] border-[14px] rounded-[1.5rem] h-[650px] w-[360px]">
                            <div className="h-[32px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-[white] dark:bg-[white] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                            <div className="insta_post_bg rounded-[0.5rem] overflow-hidden w-[330px] h-[625px] bg-[#a55e3f] p-1 dark:bg-[white]">
                                <InstagramEmbed url={"https://www.instagram.com/p/C8A4z6Bs6jT/"} />
                            </div>
                        </div>
                        <div className="relative mx-auto border-[white] dark:border-[white] bg-[white] border-[14px] rounded-[1.5rem] h-[650px] w-[360px]">
                            <div className="h-[32px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[72px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
                            <div className="h-[46px] w-[3px] bg-[white] dark:bg-[white] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
                            <div className="h-[64px] w-[3px] bg-[white] dark:bg-[white] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
                            <div className="insta_post_bg rounded-[0.5rem] overflow-hidden w-[330px] h-[625px] bg-[#a55e3f] p-1 dark:bg-[white]">
                                <InstagramEmbed url={"https://www.instagram.com/p/C8A4z6Bs6jT/"} />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className='testimonials_area'>

                <div className='section_inner'>
                    <div className='container'>
                        <div className='section_content'>
                            <h1>THE WORDS OF OTHERS</h1>

                            <Testimonial_Slider />

                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </>
    )
}

export default Home

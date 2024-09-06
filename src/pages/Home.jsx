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
                            <h2>CRAFTING FINE SKILLS</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elitse tsed do eius mod tempor incididu nt ut labor dolore senast magna se aliqua ut enim minims veniam</p>

                            <My_Button text={"View More"} />

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
                                    <p className='sub_title'>Smart products</p>
                                    <h1 className='title'>THE FINEST OF HANDMADE</h1>
                                    <p className='desc'>Lorem ipsum dolor sit amet a con sectetur adipisicing elit se do eius mod tempor incididunt ut labore et dolore magna aliqua ut enim minim veniam quis ost rud exercitation ullamc laboris nisi ut aliquip ex ea commo.</p>

                                    <My_Button text={"View More"} />

                                    <div className="col_1_border_right"></div>
                                </div>
                                <div className='col_2 card cccc'>
                                    <Image src={image3} alt="image" preview={false} style={{
                                        maxHeight: "500px",
                                        width: "500px",
                                        objectFit: "cover"
                                    }} />
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
                                        borderRadius:"5px"
                                    }} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} >
                                <div className='section_content'>
                                    <h2>CHILDREN CREATIVE WORKSHOPS</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elitse tsed do eius mod tempor incididu nt ut labor dolore senast magna se aliqua ut enim minims veniam om.</p>

                                    <My_Button text={"View More"} />

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
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p>


                            <Testimonial_Slider />

                        </div>
                    </div>
                </div>
                <Footer/>

            </section>
        </>
    )
}

export default Home

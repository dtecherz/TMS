import React from 'react'
import { Image } from 'antd';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { RightOutlined, LeftOutlined } from "@ant-design/icons"

import My_Button from './Button';
import leaf_img from "../assets/leaf.png"


function Hero_Slider() {

    const settings = {
        dots: false,
        fade: true,
        autoplay: true,
        infinite: true,
        arrows: true,
        // nextArrow: <RightOutlined className='slick_icon' to="next" />,
        // prevArrow: <LeftOutlined className='slick_icon' to="prev" />,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            },
        ]
    };

    return (
        <>

            <div className="container">
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className='slide_1'>
                            <div className="content max-w-lg h-full flex justify-center flex-col pl-28 max-md:pl-8">
                                <Image src={leaf_img} alt="img" preview={false} className='!h-12 !w-9 mb-4' />
                                <h1 className='text-[42px] tracking-[4px] mb-4 max-md:text-[35px]'>The Maker Collections</h1>
                                <p className='text-[#a55e3f] mb-8'>Lorem ipsum dolor sit amet, consecteturs.</p>

                                <My_Button text={"View More"} />
                            </div>
                        </div>
                        <div className='slide_2'>
                            <div className="content max-w-lg h-full flex justify-center flex-col pl-28 max-md:pl-8">
                                <Image src={leaf_img} alt="img" preview={false} className='!h-12 !w-9 mb-4' />
                                <h1 className='text-[42px] tracking-[4px] mb-4 max-md:text-[35px]'>Brand New Products</h1>
                                <p className='text-[#a55e3f] mb-8'>Lorem ipsum dolor sit amet, consecteturs.</p>

                                <My_Button text={"View More"} />
                            </div>
                        </div>
                        <div className='slide_3'>
                            <div className="content max-w-lg h-full flex justify-center flex-col pl-28 max-md:pl-8">
                                <Image src={leaf_img} alt="img" preview={false} className='!h-12 !w-9 mb-4' />
                                <h1 className='text-[42px] tracking-[4px] mb-4 max-md:text-[35px]'>Devoted To Elegance</h1>
                                <p className='text-[#a55e3f] mb-8'>Lorem ipsum dolor sit amet, consecteturs.</p>

                                <My_Button text={"View More"} />
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Hero_Slider

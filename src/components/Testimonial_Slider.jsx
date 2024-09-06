import React from 'react'
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import testimonial_3 from "../assets/testimonials-3.png"

function Testimonial_Slider() {

    const settings = {
        autoplay: false,
        arrows: false,
        dots: false,
        infinite: true,
        centerMode: false,
        centerPadding: "10px",
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>
            <div className="slider-container">
                <Slider {...settings}>


                    <div>
                        <div className="testimonial_card">
                            <h4>Functional design</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dunt ut te dolore magna aliqua ut enim minim veni</p>
                            <div className="testimonial_card_border"></div>
                        </div>
                        <div className='testimonial_author_desc'>
                            {/* <img src={testimonial_3} alt="avatar" className='testimonail_avatar' />
                            <h5 className='name'>Wayne Olson</h5> */}
                            {/* <p className='job'>Editor</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="testimonial_card">
                            <h4>Functional design</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dunt ut te dolore magna aliqua ut enim minim veni</p>
                            <div className="testimonial_card_border"></div>
                        </div>
                        <div className='testimonial_author_desc'>
                            {/* <img src={testimonial_3} alt="avatar" className='testimonail_avatar' />
                            <h5 className='name'>Wayne Olson</h5> */}
                            {/* <p className='job'>Editor</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="testimonial_card">
                            <h4>Functional design</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dunt ut te dolore magna aliqua ut enim minim veni</p>
                            <div className="testimonial_card_border"></div>
                        </div>
                        <div className='testimonial_author_desc'>
                            {/* <img src={testimonial_3} alt="avatar" className='testimonail_avatar' />
                            <h5 className='name'>Wayne Olson</h5> */}
                            {/* <p className='job'>Editor</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="testimonial_card">
                            <h4>Functional design</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dunt ut te dolore magna aliqua ut enim minim veni</p>
                            <div className="testimonial_card_border"></div>
                        </div>
                        <div className='testimonial_author_desc'>
                            {/* <img src={testimonial_3} alt="avatar" className='testimonail_avatar' />
                            <h5 className='name'>Wayne Olson</h5> */}
                            {/* <p className='job'>Editor</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="testimonial_card">
                            <h4>Functional design</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dunt ut te dolore magna aliqua ut enim minim veni</p>
                            <div className="testimonial_card_border"></div>
                        </div>
                        <div className='testimonial_author_desc'>
                            {/* <img src={testimonial_3} alt="avatar" className='testimonail_avatar' />
                            <h5 className='name'>Wayne Olson</h5> */}
                            {/* <p className='job'>Editor</p> */}
                        </div>
                    </div>

                </Slider>
            </div>
        </>
    )
}

export default Testimonial_Slider

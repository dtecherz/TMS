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
        slidesToShow: 3,
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
                    initialSlide: 2,
                    arrows: true,
                    dots: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true,
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
                            <h4>Saim Rafi</h4>
                            <p>"Exceeded expectations! My shoes fit perfectly, and the bag is just beautiful. Quick delivery, top-notch quality </p>
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
                            <h4>Usama Khan</h4>
                            <p>Perfect shoes and bag! Quality materials, trendy styles, and fast service. Shopping here was so easy </p>
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
                            <h4>Hassan Tanoli</h4>
                            <p>Best shopping experience! Stylish shoes and bags, superb quality, and quick delivery. My go-to place now!</p>
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
                            <h4>Ahsan Khan</h4>
                            <p>"Quality shoes and bags that match every outfit! Great fit, trendy styles, and fast shipping. </p>
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
                            <h4>Musto</h4>
                            <p>Love my new shoes and bag! Stylish, comfortable, and exactly as pictured. Fast delivery and amazing quality.</p>
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

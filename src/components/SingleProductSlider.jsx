import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Image } from "antd";
import { File_URL } from "../config";

import jacket from "../assets/jacket.webp"


function SingleProductSlider({ product, pImg, setPImg, images }) {
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <Image src={`${File_URL}/${images[i]?.image_url}`} preview={false} width={"100%"} className="single_product_image !p-1" />
                </a>
            );
        },
        dots: true,
        arrows: false,
        nextArrow: <FaChevronRight to="next" />,
        prevArrow: <FaChevronLeft to="prev" />,
        dotsClass: "slick-dots slick-thumb",
        infinite: false,
        fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {
                    images.map((img, i) => {
                        return <div key={i}>
                            <Image src={`${File_URL}/${img?.image_url}`} preview={true} width={"100%"} className="single_product_image" />
                        </div>
                    })
                }
            </Slider>
        </div>
    );
}


export default SingleProductSlider;
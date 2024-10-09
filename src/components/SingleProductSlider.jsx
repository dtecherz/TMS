import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Image } from "antd";
import { File_URL } from "../config";

import jacket from "../assets/jacket.webp"


function SingleProductSlider({ product, pImg, setPImg, images }) {
    console.log('>>>>>>>>>>>>', images)
    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    {
                        images[i].type === "video" ?
                            <div>Video</div>

                            :

                            <Image src={`${File_URL}/${images[i]?.image_url}`} preview={false} width={"100%"} className="single_product_image !p-1" />
                    }
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
                    images.map((e, i) => {
                        return (<div key={i}>
                            {
                                e.type === "video" ? (
                                    <iframe
                                        width={"100%"}
                                        height="auto"
                                        className="single_product_image"
                                        src={e.image_url}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                ) : e.type === "external-image" ? (
                                    <Image
                                        width={"100%"}
                                        className="single_product_image"
                                        preview={false}
                                        src={e.image_url}
                                        alt='external logo image'
                                    //   fallback={placeholderimage}
                                    />
                                ) : (
                                    <Image
                                        width={"100%"}
                                        className="single_product_image"
                                        preview={false}
                                        src={`${File_URL}/${e.image_url}`}
                                        alt='logo image'
                                    //   fallback={placeholderimage}
                                    />
                                )
                            }
                            {/* <Image src={`${File_URL}/${img?.image_url}`} preview={true} width={"100%"} className="single_product_image" /> */}
                        </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
}


export default SingleProductSlider;
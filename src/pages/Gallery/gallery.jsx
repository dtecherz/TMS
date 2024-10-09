import React, { useEffect, useState } from 'react'
import { getImages } from '../../ContextAPI/APIs/api';
import { File_URL } from '../../config';
import { Alert } from '../../ContextAPI/Components/notify';
import { Col, Row, Image } from 'antd';
import placeholderimage from "../../assets/placeholderimage.png"

import { DeleteOutlined } from "@ant-design/icons"

function Gallery() {
  const [img, setImg] = useState([]);

  const getAllImages = async () => {
    try {
      const response = await getImages();
      if (response.success) setImg(response.images);

    } catch (error) {
      console.log(error);
      Alert(error.message, false);
    }
  };


  useEffect(() => {
    getAllImages();

  }, []);



  return (
    <>
      <section className='addresses_area'>
        <h2>Gallery</h2>

        <Row>
  {
    img.map((e, i) => {
      return (
        <Col key={i} xs={12} sm={12} md={8} lg={6} style={{ padding: "10px", border: "2px dashed gray" }}>
          <div className='relative'>
            {
              e.type === "video" ? (
                <iframe
                  width="230"
                  height="315"
                  src="https://www.youtube.com/embed/8-E1LbChJ88?si=2BLn04c9Scs_E4vY"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : e.type === "external-image" ? (
                <Image
                  className='logo all_images'
                  preview={false}
                  src={e.image_url}
                  alt='external logo image'
                  fallback={placeholderimage}
                />
              ) : (
                <Image
                  className='logo all_images'
                  preview={false}
                  src={`${File_URL}/${e.image_url}`}
                  alt='logo image'
                  fallback={placeholderimage}
                />
              )
            }
            <div className='absolute top-0 right-0 border-red-600 bg-white text-red-600 px-2 py-1 rounded-lg cursor-pointer'>
              <DeleteOutlined />
            </div>
          </div>
        </Col>
      );
    })
  }
</Row>

        <div></div>
      </section>
    </>
  )
}


export default Gallery
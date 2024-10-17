import { Col, Image, Row } from 'antd';
import React from 'react';
import { File_URL } from '../config';
import placeholderimage from "../assets/placeholderimage.png";

const GalleryComponent = ({ images, onSelect }) => {
  return (
    <div className="container">
      <Row gutter={[16, 16]} justify="start">
        {images.map((image, index) => (
          <Col xs={24} sm={12} md={8} lg={8} key={index} style={{ display: "flex", justifyContent: "center" }}>
            {image.type === "video" ? (
              <div
                style={{
                  position: 'relative',
                  width: "100%",
                  height: "200px",
                  border: image.isSelected ? '3px solid blue' : 'none',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={image.image_url}
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                {/* Overlay to capture clicks */}
                <div
                  onClick={(event) => onSelect(index, image, event)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '24px',
                    color: '#fff'
                  }}>Select</span>
                </div>
              </div>
            ) : (
              <Image
                className='logo all_images'
                preview={false}
                src={image.type === "external-image" ? image.image_url : `${File_URL}/${image.image_url}`}
                alt='image'
                fallback={placeholderimage}
                onClick={(event) => onSelect(index, image, event)}
                style={{
                  border: image.isSelected ? '3px solid blue' : 'none',
                  borderRadius: '4px',
                  width: "100%",
                  height: "200px",
                  objectFit: "containe"
                }}
              />
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GalleryComponent;

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { File_URL } from '../../config';
import { DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const ImageModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);

    const showModal = () => setIsModalOpen(true);

    const handleOk = () => {
        setIsModalOpen(false);
        if (props.productUpdate) props.productUpdate(images);
    };

    const handleCancel = () => setIsModalOpen(false);

    const swapImages = (index1, index2) => {
        if (index2 >= 0 && index2 < images.length) {
            const newImages = [...images];
            [newImages[index1], newImages[index2]] = [newImages[index2], newImages[index1]];
            setImages(newImages);
            if (props.sortedImages) props.sortedImages(newImages);
        }
    };

    useEffect(() => {
        if (props.photos && props.photos.length > 0) {
            setImages(props.photos);
        }
    }, [props.photos]);

    return (
        <>
            <Button type="primary" onClick={showModal}>{props.btn}</Button>
            <Modal title="Sort Images" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'  // Prevents scrollbars from appearing
                }}>
                    {images.map((img, i) => (
                        <div className="images" key={i} style={{ margin: '10px', textAlign: 'center' }}>
                            <div>
                                <UpOutlined onClick={() => swapImages(i, i - 1)} style={{ cursor: 'pointer', margin: '5px' }} />
                                <DownOutlined onClick={() => swapImages(i, i + 1)} style={{ cursor: 'pointer', margin: '5px' }} />
                            </div>
                            {img.type === "image" ? (
                                <img
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        margin: '10px'
                                    }}
                                    src={`${File_URL}/${img.image_url}`}
                                    alt={`Selected image ${i}`}
                                />
                            ) : img.type === "external-image" ? (
                                <img
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        margin: '10px'
                                    }}
                                    src={img.image_url}
                                    alt={`Selected image ${i}`}
                                />
                            ) : (
                                <iframe
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        border: 'none',
                                        overflow: 'hidden'
                                    }}
                                    src={img.image_url}
                                    title="Video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    alt={`Selected image ${i}`}
                                ></iframe>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default ImageModal;

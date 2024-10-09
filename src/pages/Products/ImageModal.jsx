import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { File_URL } from '../../config';
import { DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const ImageModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]); // Use photos from props as initial images
    console.log('pp', props.photos)
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        // Call the productUpdate function with the updated images
        if (props.productUpdate) {
            props.productUpdate(images);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const swapImages = (index1, index2) => {
        if (index2 < images.length && index2 >= 0) {
            const newImages = [...images];
            [newImages[index1], newImages[index2]] = [newImages[index2], newImages[index1]];
            setImages(newImages);
            props.sortedImages(newImages)
        }
    };

    useEffect(() => {
        return () => {
            if(images?.length == 0) setImages(props.photos)
        }
        
    }, [props.photos])
    

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.btn}
            </Button>
            <Modal title="Sort Images" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>


                    {
                    props.photos?.map((img, i) => {
                        console.log(i, img);

                        return <div className='images' key={i} style={{ margin: '10px', textAlign: 'center' }}>
                            <div>
                                <UpOutlined onClick={() => swapImages(i, i - 1)} style={{ cursor: 'pointer', margin: '5px' }} />
                                <DownOutlined onClick={() => swapImages(i, i + 1)} style={{ cursor: 'pointer', margin: '5px' }} />
                            </div>
                            <img
                                style={{
                                    width: '250px',
                                    height: 'auto',
                                    display: 'flex',
                                    margin: '10px'
                                }}
                                src={`${File_URL}/${img.image_url}`}
                                alt={`Selected image ${i}`}
                            />
                        </div>


                    })}
                </div>
            </Modal>
        </>
    );
};

export default ImageModal;

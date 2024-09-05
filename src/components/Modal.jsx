  import React, { useEffect, useState } from 'react';
  import { Button, Form, Modal, Upload } from 'antd';
  import { Alert } from '../ContextAPI/Components/notify';
  import { getImages } from '../ContextAPI/APIs/api';
  import { Gallery } from "react-grid-gallery";
  import { File_URL } from '../config';



  const MyModal = ({ handleImageSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [img, setImg] = useState([]);

    const getAllImages = async () => {
      try {
        const response = await getImages();
        if (response.success) {
          const formattedImages = response.images.map(img => ({
            src: `${File_URL}/${img.image_url}`,
            width: 320,
            height: 240,
            caption: img.caption || "",
            isSelected: false,  // Add this line to track selection
            _id: img._id, // Store the ID for selection
            image_url: img.image_url
          }));
          setImages(formattedImages);
          setImg(response.images);
        }
      } catch (error) {
        console.log(error);
        Alert(error.message, false);
      }
    };

    const showModal = () => setIsModalOpen(true);

    const handleOk = () => setIsModalOpen(false);

    const handleCancel = () => setIsModalOpen(false);

    const handleSelect = (index, item, event) => {
        const nextImages = images.map((image, i) =>
          i === index ? { ...image, isSelected: !image.isSelected } : image
        );
        setImages(nextImages);
        console.log('nextImages', nextImages)

        const selectedImages = nextImages.filter(image => image.isSelected).map(image => image._id);
        const selectedImagesUrl = nextImages.filter(image => image.isSelected).map(image => image.image_url);
        console.log('sleected', selectedImages)
        handleImageSelect(selectedImages, selectedImagesUrl); // Pass the selected images' IDs to the parent component
      };


    useEffect(() => {
      getAllImages();

    }, []);

    return (
      <>
        <div className='gallery'>
          <button className='btn' type="button" onClick={showModal} style={{ width: "20%", marginBottom: "1rem" }}>
            Add Images
          </button>

          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Gallery images={images} onSelect={handleSelect} />
          </Modal>
        </div>
      </>
    );
  }


  export default MyModal;
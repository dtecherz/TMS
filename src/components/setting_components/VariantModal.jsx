import { Button, Modal } from 'antd';
import React, { useState } from 'react'

const VariantModal = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [variation_id,setVariationIs] = useState("")

    const showModal = () => {
        setIsModalOpen(true);
        if (props.onOpen) {
            props.onOpen(); // Call the onOpen function if it's passed as a prop
        }
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.getProductData()
    };

  return (
    <>
            <Button className={`create_btn ${props.customClasses}`} type="danger" onClick={showModal}>
                {props.btnText}
            </Button>

            <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>


                {/* <h2>Add New Variation Optin</h2> */}

                {props.children}


            </Modal>
        </>
  )
}

export default VariantModal

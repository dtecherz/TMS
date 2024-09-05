import { Button, Card, Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react'
import { addVaraitionOption, addVariant } from '../ContextAPI/APIs/api';
import { Alert } from '../ContextAPI/Components/notify';
import { RichTextEditor } from './richTextEditor';

const PaymentModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [variation_id,setVariationIs] = useState("")

    const showModal = () => {
        setIsModalOpen(true);
        props.onOpen()
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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

export default PaymentModal

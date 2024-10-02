import { Button, Modal, Popconfirm } from 'antd';
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';

const VariationModal = (props) => {
    const { isModalOpen, setIsModalOpen, btnText, title, customClasses, children, formData, setFormData } = props;

    const handleOk = () => {
        setIsModalOpen(false); // Close the modal on OK
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal on Cancel
    };

    const resetFormData = () => {
        console.log('Resetting form data');
        setFormData([]); // Reset form data
        setIsModalOpen(true); // Open modal after confirming
    };

    const handleAddClick = () => {
        if (formData.length === 0) {
            setIsModalOpen(true); // Open modal directly if no form data
        }
    };

    return (
        <>
            {
                formData.length > 0 ? (
                    <Popconfirm
                        title="Add Another Variation"
                        description="If you agree, all the variations you have created will be removed."
                        icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                        onConfirm={resetFormData} // Reset form data and open modal when confirmed
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            className={`create_btn ${customClasses}`}
                            type="danger"
                            style={{ width: "50px" }}
                        >
                            {btnText}
                        </Button>
                    </Popconfirm>
                ) : (
                    <Button
                        className={`create_btn ${customClasses}`}
                        type="danger"
                        onClick={handleAddClick} // Handle button click if formData is empty
                        style={{ width: "50px" }}
                    >
                        {btnText}
                    </Button>
                )
            }

            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {children}
            </Modal>
        </>
    );
};

export default VariationModal;

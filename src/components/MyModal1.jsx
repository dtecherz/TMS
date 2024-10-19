import { Button, Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { addVariant } from '../ContextAPI/APIs/api';
import { Alert } from '../ContextAPI/Components/notify';

const MyModal1 = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("")


  const VariationAdd = async () => {
    try {
      const response = await addVariant({ name: name })
      if (response.success) Alert(response.message, response.success)
      props.getVraiations()
    } catch (error) {
      console.log(error)
      Alert(error.message, false)
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div className=''>
      <Button className='create_btn' type="danger" onClick={showModal}>
        Add Variation
      </Button>

      <Modal title="Add New Variation" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} >

        {/* <h2>Add New Variation</h2> */}

        <Form
          name="basic"
          layout='horizontal'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: "100%" }}
          initialValues={{ remember: true }}
          onFinish={VariationAdd}
          onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your product name!' }]}
          >
            <Input
              type='text'
              placeholder='Enter variation name'
              className='form_input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create
          </Button>
        </Form>

      </Modal>
    </div>
  )
}

export default MyModal1

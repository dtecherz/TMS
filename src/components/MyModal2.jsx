import { Button, Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import { addVaraitionOption, addVariant } from '../ContextAPI/APIs/api';
import { Alert } from '../ContextAPI/Components/notify';

const MyModal2 = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [variation_id,setVariationIs] = useState("")


    const [name,setName] = useState("")


        const VariationOption = async ()=>{
            try {
                const response = await addVaraitionOption({name:name,variation_id:props.variation_id})
                if(response.success) Alert(response.message,response.success)
                    props.getVriationOption()
            } catch (error) {
                console.log(error)
                Alert(error.message,false)
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
    <div className='container'>
      <Button type="danger" onClick={showModal}>
        Add Variation Option
      </Button>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}   footer={null}>
      
      
            <h2>Add New Variation Option</h2>

            <Form
                name="basic"
                layout='horizontal'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: "100%" }}
                initialValues={{ remember: true }}
                    onFinish={VariationOption}
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
                        placeholder='Enter Product Name'
                        className='form_input'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
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

export default MyModal2

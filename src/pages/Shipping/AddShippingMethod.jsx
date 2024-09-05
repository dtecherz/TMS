import { Button, Card, Form, Input } from 'antd'
import React, { useState } from 'react'
import { addCategory, addShippingMethods } from '../../ContextAPI/APIs/api'
import { Alert } from '../../ContextAPI/Components/notify'

const AddShippingMethod = () => {


  const [formData, setFormData] = useState({
    name: "",
    charges: "",

})

const shippingMethodCreate = async () => {
  try {
      const response = await addShippingMethods(formData)
      if (response.success) Alert(response.message, response.success)
    
  } catch (error) {
      console.log(error)
      Alert(error.message, false)
  }
}


  return (
    <>
    <section className='create_area'>
        <Card className='add_card'>
            <h2>Add Shipping Method</h2>

            <Form
                name="basic"
                layout='horizontal'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: "100%" }}
                initialValues={{ remember: true }}
                onFinish={shippingMethodCreate}
                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input  name!' }]}
                >
                    <Input
                        type='text'
                        placeholder='Enter Shipping Method Name'
                        className='form_input'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item
                    label="Charges"
                    name="charges"
                    rules={[{ required: true, message: 'Please input shiping charges' }]}
                >
                    <Input
                        type='text'
                        placeholder='Enter Shipping Method Charges'
                        className='form_input'
                        value={formData.charges}
                        onChange={(e) => setFormData({ ...formData, charges: e.target.value })}
                    />
                </Form.Item>
                

                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    Add
                </Button>
            </Form>
        </Card>
    </section>
</>
  )
}

export default AddShippingMethod

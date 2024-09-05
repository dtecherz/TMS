import { Button, Card, Form, Select } from 'antd'
import React, { useState } from 'react'

const Addpayment = () => {
    const [paymentData,setPaymentData] = useState({
        payment_type:"",
        Title:"",
        Account_Details:""
    })
  return (
    <>
          <section className='create_area'>
                <Card className='add_card'>
                    <h2>Create Category</h2>

                    <Form
                        name="basic"
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={createCategory}
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
                                value={formData.category_name}
                                onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Parent Category" name="category_id">
                            <Select
                                showSearch
                                optionFilterProp="label"
                                defaultValue={formData.parent_category_id}
                                value={formData.parent_category_id}
                                onSearch={onSearch}
                                onChange={(value) => setFormData({ ...formData, parent_category_id: value })}
                                options={[{ value: '', label: 'None', }, ...categories.map((e, i) => { return { value: e._id, label: e.category_name } })]}
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Create
                        </Button>
                    </Form>
                </Card>
            </section>
    </>
  )
}

export default Addpayment

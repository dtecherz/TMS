import { Button, Card, Form, Input, Select } from 'antd'
import React, { useEffect } from 'react'
import { Alert } from '../../ContextAPI/Components/notify'
import { useParams } from 'react-router-dom'
import { getSingleShippingMethod, updateShippingMethod } from '../../ContextAPI/APIs/api' // Ensure this function is imported

const EditShippingMethods = () => {
    const [form] = Form.useForm() // Destructure the form instance
    const { id } = useParams()

    const getSingleShipping = async () => {
        try {
            const response = await getSingleShippingMethod(id)
            if (response.success) {
                const shippingData = response.shippingMethod
                form.setFieldsValue({
                    name: shippingData.name,
                    charges: shippingData.charges,
                    status: shippingData.status
                })
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    useEffect(() => {
        getSingleShipping()
    }, [id]) // Add id as a dependency to refetch if it changes

    const handleFinish = async (values) => {
        try {
            const response = await updateShippingMethod(id, values)
            if (response.success) {
                Alert(response.message, response.success)
                // Optionally redirect or clear form
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    return (
        <>
            <section className='create_area'>
                <Card className='add_card'>
                    <h2>Edit Shipping Method</h2> {/* Update title */}
                    <Form
                        form={form}
                        name="basic"
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={handleFinish} // Correctly set to function
                        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input shipping method name!' }]}
                        >
                            <Input
                                type='text'
                                placeholder='Enter Shipping Method Name'
                                className='form_input'
                            />
                        </Form.Item>
                        <Form.Item
                            label="Charges"
                            name="charges"
                            rules={[{ required: true, message: 'Please input shipping charges' }]}
                        >
                            <Input
                                type='text'
                                placeholder='Enter Shipping Method Charges'
                                className='form_input'
                            />
                        </Form.Item>

                        <Form.Item label="Status" name="status">
                            <Select>
                                <Select.Option value="" disabled>Select</Select.Option>
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                            </Select>
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Update
                        </Button>
                    </Form>
                </Card>
            </section>
        </>
    )
}

export default EditShippingMethods

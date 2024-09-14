import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Select } from 'antd'
import { Alert } from '../../ContextAPI/Components/notify'
import { GetCategories, singleCategory, updateCategory } from '../../ContextAPI/APIs/api'
import { useParams } from 'react-router-dom'

const EditCategory = () => {
    const { slug } = useParams()
    const [form] = Form.useForm()
    const [categories, setCategories] = useState([])
    const [id,setId] = useState("")

    const getAllCategories = async () => {
        try {
            const response = await GetCategories()
            if (response.success) {
                setCategories(response.categories)
            } else {
                Alert(response.message, false)
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
            Alert(error.message, false)
        }
    }

    const getSingleCategory = async () => {
        try {
            const response = await singleCategory(slug)
            if (response.success) {
                const categoryData = response.category
                console.log('ccc',categoryData)
                form.setFieldsValue({
                    category_name: categoryData.category_name,
                    parent_category_id: categoryData?.parent_category_id?._id || null, // Set default to empty if no parent
                    status:categoryData.status
                })
                setId(categoryData._id)
            } else {
                Alert(response.message, false)
            }
        } catch (error) {
            console.error('Error fetching category:', error)
            Alert(error.message, false)
        }
    }



    // update category 

    const categoryUpdate = async () => {
        const values = form.getFieldsValue();
        console.log('vvvv', values)
        try {
            const response = await updateCategory(id, values)
            if (response.success) Alert(response.message, response.success)
            getSingleCategory()
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    useEffect(() => {
        if (slug) {
            getSingleCategory()
        }
        getAllCategories()
    }, [slug])

    return (
        <section className='create_area'>
            <Card className='add_card'>
                <h2>Edit Category</h2>

                <Form
                    form={form}
                    name="basic"
                    layout='horizontal'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: "100%" }}
                    initialValues={{ remember: true }}
                    onFinish={categoryUpdate}
                    onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="category_name"
                        rules={[{ required: true, message: 'Please input category name!' }]}
                    >
                        <Input placeholder='Enter Category Name' />
                    </Form.Item>

                    <Form.Item label="Parent Category" name="parent_category_id">

                        <Select>
                            <Select.Option value={null}>None</Select.Option>
                            {categories.map(e => (
                                <Select.Option key={e._id} value={e._id}>
                                    {e?.category_name || null}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Status" name="status">

                        <Select>
                            <Select.Option value={""} disabled >Select</Select.Option>
                            <Select.Option value={"active"}>Active</Select.Option>
                            <Select.Option value={"inactive"}>InActive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Update
                    </Button>
                </Form>
            </Card>
        </section>
    )
}

export default EditCategory

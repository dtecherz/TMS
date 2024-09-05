import { Button, Card, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { addCategory, GetCategories } from '../../ContextAPI/APIs/api';
import { Alert } from '../../ContextAPI/Components/notify';

const CreateCategory = () => {

    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        category_name: "",
        parent_category_id: "",

    })

    const getAllCategories = async () => {
        try {
            const response = await GetCategories();
            if (response.success) {
                setCategories(response.categories);
            }
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };


    const createCategory = async () => {
        try {
            const response = await addCategory(formData)
            if (response.success) Alert(response.message, response.success)
            getAllCategories()
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }


    useEffect(() => {
        getAllCategories();
    }, []);

    const onSearch = (value) => {
        console.log('search:', value);
    };

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

export default CreateCategory

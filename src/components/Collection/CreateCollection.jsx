import React, { useEffect, useState } from 'react';
import { addCollection, getCollections, getProductName } from '../../ContextAPI/APIs/api';
import { Form, Input, Select, Button, Card } from 'antd';
import { Alert } from '../../ContextAPI/Components/notify';
import { DownOutlined } from '@ant-design/icons';

const CreateCollection = () => {
    const [form] = Form.useForm();

    const [products, setProducts] = useState([]);   

    const [formData, setFormData] = useState({
        name: '',
        products: [], // Array to store selected product IDs
        status: 'active',
    });
    const [collection, setCollections] = useState([]);

    const MAX_COUNT = 10;


    const getProducts = async ()=>{
        try {
            const response = await getProductName()
            if(response.success) setProducts(response.products)
        } catch (error) {
            console.log(error)
        }
    }

    const CollectionsData = async () => {
        try {
            const response = await getCollections();
            setCollections(response.collections);

            setFormData({
                name: '',
                products: [],
                status: 'active'
            });
        } catch (error) {
            console.log(error);
        }
    };

    const CreateCollectiion = async () => {
        try {
            const response = await addCollection(formData);
            if (response.success) Alert(response.message, response.success);
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };

    useEffect(() => {
        CollectionsData();
        getProducts()
    }, []);

    return (
        <>
            <section className='create_area'>
                <Card className='add_card'>
                    <h2>Create Collection</h2>

                    <Form
                        name="basic"
                      
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: '100%' }}
                        initialValues={{ remember: true }}
                        onFinish={CreateCollectiion}
                        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your collection name!' }]}
                        >
                            <Input
                                type='text'
                                placeholder='Enter Collection Name'
                                className='form_input'
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label="Select Products" name="products">
                            <Select
                                mode="multiple"
                                
                                value={formData.products}
                                style={{ width: '100%' }}
                                onChange={(selectedValues) => setFormData({ ...formData, products: selectedValues })}
                                suffixIcon={<DownOutlined />}
                                placeholder="Please select products"
                                options={products.map((product) => ({
                                    value: product._id, // Assuming each product has an _id
                                    label: product.name, // Assuming each product has a name
                                }))}
                            />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Create
                        </Button>
                    </Form>
                </Card>
            </section>
        </>
    );
};

export default CreateCollection;

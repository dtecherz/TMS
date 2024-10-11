import { Button, Card, Input, Select } from 'antd';
import Form from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { getOneColection, getProductName, updateColection } from '../../ContextAPI/APIs/api';
import { useParams } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Alert } from '../../ContextAPI/Components/notify';

const EditCollection = () => {
    const [form] = Form.useForm();
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [productOptions, setProductOptions] = useState([]); // Store options for Select component

    const getProducts = async () => {
        try {
            const response = await getProductName();
            if (response.success) {
                const productsData = response.products;
                setProducts(productsData);

                // Prepare the options for the Select component
                const options = productsData.map((product) => ({
                    value: product._id, // Set product ID as the value
                    label: product.name, // Set product name as the label
                }));
                setProductOptions(options); // Set the product options in state
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSingleCollection = async () => {
        try {
            const response = await getOneColection(id);
            if (response.success) {
                const collectionData = response.collection
                console.log('cccc', collectionData)
                form.setFieldsValue({
                    //    id:collectionData._id,
                    name: collectionData.name,
                    products: collectionData.products.map(e => e._id),
                    status: collectionData.status,
                })
            }
        } catch (error) {
            console.log(error);
        }
    };



    const collectionUpdate = async () => {
        console.log("::::::::::::")
        const values = form.getFieldsValue();
        // const id = form.getFieldValue("id")
        console.log('vvvvvvvvvv', id, values)
        try {
            const response = await updateColection(id, values)
            if (response.success) Alert(response.message, response.success)
            getSingleCollection()
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }


    function onSearch(val) {
        console.log('search:', val);
      }
    useEffect(() => {
        // Fetch products first, then collection to ensure all data is available
        getProducts().then(getSingleCollection);
    }, []);

    return (
        <section className='create_area'>
            <Card className='add_card'>
                <h2>Edit Collection</h2>

                <Form
                    name="basic"
                    form={form}
                    layout='horizontal'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: '100%' }}
                    onFinish={collectionUpdate}
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
                        />
                    </Form.Item>

                    <Form.Item label="Select Products" name="products">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            showSearch={true}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            suffixIcon={<DownOutlined />}
                            placeholder="Please select products"
                            options={productOptions} // Use the options prepared from the product list
                            value={form.getFieldValue('products')} // Ensure selected values are correctly mapped
                        />
                    </Form.Item>

                    <Form.Item label="Status" name="status">
                        <Select>
                            <Select.Option value={""} disabled>
                                Select
                            </Select.Option>
                            <Select.Option value={"active"}>Active</Select.Option>
                            <Select.Option value={"inactive"}>InActive</Select.Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Update
                    </Button>
                </Form>
            </Card>
        </section>
    );
};

export default EditCollection;

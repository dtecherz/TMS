import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { addProduct, GetCategories } from '../../ContextAPI/APIs/api';
import { Alert } from '../../ContextAPI/Components/notify';
import { useNavigate } from 'react-router-dom';
import { File_URL } from '../../config';
import MyModal from "../../components/Modal"

import { DeleteOutlined } from "@ant-design/icons";
import { RichTextEditor } from '../../components/richTextEditor';
import TextArea from 'antd/es/input/TextArea';


function AddProduct({ onProductCreate }) {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);
    const [img, setImg] = useState("")
    const [stock,setStock] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        category_id: "",
        long_description: "",
        stock_management: false,
        SKU: "",
        price: "",
        discount: "",
        total_quantity: 0,
        images: []
    });
    const creatProduct = async () => {
        try {
            console.log(formData);
            const response = await addProduct(formData);
            if (response.success) Alert(response.message, response.success);
            
            // Get product ID and name (slug)
            const productId = response.data._id;
            const productSlug = response.data.slug;
            const productStock = response.data.stock_management
    
            console.log('Product ID:', productId);
            console.log('Product Slug:', productSlug,productStock);
    
            // Call the onProductCreate function with both id and slug
            onProductCreate('id', productId, productSlug,productStock);
    
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };

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

    const handleImageSelect = (imageId, imgUrl) => {
        console.log('img', imageId);
        setFormData({ ...formData, images: imageId });
        setImg(imgUrl);
        console.log('imggggg', imgUrl)
    };

    const handleTextEditor = (e) => {
        console.log('eee', e)

        setFormData({ ...formData, long_description: e })
    }

    useEffect(() => {
        getAllCategories();

    }, []);


    return (
        <>
            <section className='create_area'>
                <Card className='add_product_card'>
                    <h2>Create Product</h2>

                    <Form
                        name="basic"
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={creatProduct}
                        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                        autoComplete="off"
                    >

                        <Row>
                            <Col xs={24} sm={24} md={12} className='col'>
                                <Form.Item label="Name" name="name"
                                    rules={[{ required: true, message: 'Please input your product name!' }]}
                                >
                                    <Input
                                        type='text'
                                        placeholder='Enter Product Name'
                                        className='form_input'
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} className='col'>
                                <Form.Item label="Category" name="category_id"
                                    rules={[{ required: true, message: 'Please input your product name!' }]}
                                >
                                    <Select
                                        defaultValue={""}
                                        value={formData.category_id}
                                        onChange={(value) => setFormData({ ...formData, category_id: value })}
                                    >
                                        <Select.Option value="" disabled selected>Select Category</Select.Option>
                                        {categories.map((e, i) => {
                                            return <Select.Option key={e._id} value={e._id}>{e.category_name}</Select.Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} className='col'>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[{ required: true, message: 'Please input Product Price!' }]}
                                >
                                    <Input
                                        type="number"
                                        placeholder='Enter Product Price'
                                        className='form_input'
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} className='col'>
                                <Form.Item
                                    label="Discount %"
                                    name="discount"
                                >
                                    <Input
                                        type='number'
                                        placeholder='Enter discount in %'
                                        className='form_input'
                                        value={formData.discount}
                                        min={1}
                                        max={100}
                                        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item label="Stock Management" name="stock_management">
                                    <Select defaultValue={false} value={formData.stock_management}
                                        onChange={(value) => setFormData({ ...formData, stock_management: value })}
                                    >
                                        <Select.Option >Select</Select.Option>
                                        <Select.Option value={true}>Yes</Select.Option>
                                        <Select.Option value={false}>No</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item label="Total Quantity" name="total_quantity"
                                    rules={[{ required: formData.stock_management, message: 'Please input total quantity!' }]}
                                >
                                    <Input
                                        type='number'
                                        placeholder='Enter Total Quantity of Product'
                                        className='form_input'
                                        value={formData.total_quantity}
                                        disabled={!formData.stock_management}
                                        min={1}
                                        
                                        onChange={(e) => setFormData({ ...formData, total_quantity: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item label="SKU" name="SKU" >
                                    <Input
                                        type='text'
                                        placeholder='Enter Product SKU'
                                        className='form_input'
                                        value={formData.SKU}
                                        onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} className='col'>
                                <Form.Item label="Short Description" name="short_description">
                                    <Input.TextArea
                                        type='text'
                                        rows={4}
                                        placeholder='Enter Product Description'
                                        className='form_input'
                                        value={formData.short_description}
                                        onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} className='col'>
                                {/* <Form.Item
                                    label="Long Description"
                                    name="long_description"
                                    rules={[{ required: true, message: 'Please input Product Long Description!' }]}
                                > */}
                                    {/* <Input
                                        type='text'
                                        placeholder='Enter Product Long Description'
                                        className='form_input'
                                        value={formData.long_description}
                                        onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                                    /> */}
                                        {/* {
                                            formData.long_description == "" ? Alert("Long description is required")
                                             :

                                            } */}
                                    <RichTextEditor value={formData.long_description} handleTextEditor={handleTextEditor} />




                                {/* </Form.Item> */}
                            </Col>
                        </Row>


                        <div className='product_images'>
                        
                            {
                                img.length > 0 && img?.map((url, index) => (
                                    <div className='images'>
                                        <img
                                            key={index}
                                            src={`${File_URL}/${url}`}
                                            alt={`Selected image ${index}`}
                                        />

                                        <div className="overlay">
                                            <DeleteOutlined className='dlt_image_btn' />
                                        </div>
                                    </div>
                                ))
                            }



                        </div>

                        <MyModal handleImageSelect={handleImageSelect} />

                        <button className='btn' htmlType="submit" style={{ width: "100%" }}>
                            Create
                        </button>
                    </Form>
                </Card>
            </section>
        </>
    )
}

export default AddProduct;

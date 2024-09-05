import { Card, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import img_1 from "../../assets/1.jpg"
import img_2 from "../../assets/2.jpg"
import img_3 from "../../assets/3.jpg"
import img_4 from "../../assets/4.jpg"
import img_5 from "../../assets/5.webp"
import img_6 from "../../assets/6.webp"
import img_7 from "../../assets/7.jpg"
import { Alert } from '../../ContextAPI/Components/notify'
import { GetCategories, getSingleProduct, updateProduct } from '../../ContextAPI/APIs/api'
import { useParams } from 'react-router-dom'
import { RichTextEditor } from '../../components/richTextEditor';
import { File_URL } from '../../config'
import { DeleteOutlined } from '@ant-design/icons'
import MyModal from '../../components/Modal'

function ProductDetail() {

    const { id } = useParams()
    const [categories, setCategories] = useState([])
    const [productVariationData, setProductVariationData] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        category_id: "",
        long_description: "",
        stock_management: "",
        SKU: "",
        price: "",
        discount: "",
        total_quantity: "",
        images: []
    });

    const hasChanges = useRef(false);

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

    const getProductData = async () => {
        try {
            const response = await getSingleProduct(id)
            if (response.success) {
                setFormData(prevState => ({
                    ...prevState,
                    name: response.productData.name,
                    short_description: response.productData.short_description,
                    category_id: response.productData.category_id._id,
                    long_description: response.productData.long_description,
                    stock_management: response.productData.stock_management,
                    SKU: response.productData.SKU,
                    price: response.productData.price,
                    discount: response.productData.discount,
                    total_quantity: response.productData.total_quantity,
                    images: response.productData.images,
                }));

                setFormData(response.productData)
                setProductVariationData(response.productData.productConfig)
                console.log('ppppp', productVariationData)
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    const handleTextEditor = (e) => {
        setFormData({ ...formData, long_description: e })
    }

    // const handleImageSelect = (selectedImageIds) => {
    //     setFormData(prevForm => ({
    //         ...prevForm,
    //         images: Array.from(new Set([...prevForm.images, ...selectedImageIds])) // Ensure unique images
    //     }));
    // };


    const handleImageSelect = (selectedImageIds, selectedImageUrls) => {
        const newImages = selectedImageIds.map((id, index) => {
            return {
                _id: id,
                image_url: selectedImageUrls[index] || '' // Add a fallback if URL is not available
            };
        });
    
        setFormData(prevForm => {
            // Filter existing images that are objects and not strings
            const existingImages = prevForm.images.filter(image => typeof image === 'object');
    
            return {
                ...prevForm,
                images: [...existingImages, ...newImages]
            };
        });
    };



    // update product data 

    const productUpdate = async ()=>{
        try {
            const response = await updateProduct(id,formData)
            if(response.success) return Alert(response.message,response.succces)
        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
    }



   

    const handleImageDelete = (indexToRemove) => {
        console.log("index", indexToRemove);

        // Remove the image from the state
        const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);
        console.log('updatedImages', updatedImages);

        // Update the state
        setFormData(prevFormData => ({
            ...prevFormData,
            images: updatedImages
        }));

        // Mark that changes have been made
        hasChanges.current = true;
    };

// Trigger productUpdate when formData.images changes
useEffect(() => {
    if (hasChanges.current) {
        productUpdate();
    }
}, [formData.images]);

    useEffect(() => {
        getProductData()
        getAllCategories()
    }, [])
    if (formData.name) {
        return (
            <>
                <section className='create_area'>
                    <Card className='add_product_card'>
                        <h2>Product Detail</h2>

                        <Form
                            name="basic"
                            layout='horizontal'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: "100%" }}
                            initialValues={{ remember: true }}
                            onFinish={productUpdate}
                            onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                            autoComplete="off"
                        >

                            <Row>
                                <Col xs={24} sm={24} md={12} className='col'>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your product name!' }]}
                                    >
                                        {console.log(formData.name, 'BHAI YAHI NAME HAI')}
                                        <Input
                                            type='text'
                                            placeholder='Enter Product Name'
                                            className='form_input'
                                            defaultValue={formData?.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} className='col'>
                                    <Form.Item label="Category" name="category_id">
                                        {
                                            formData?.category_id != "" &&
                                            <Select
                                                defaultValue={formData?.category_id._id}
                                                onChange={(value) => setFormData({ ...formData, category_id: value })}
                                            >
                                                {categories.map((e, i) => {
                                                    return <Select.Option key={e._id} value={e._id}>{e.category_name}</Select.Option>
                                                })}
                                            </Select>
                                        }
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
                                            defaultValue={formData?.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={12} className='col'>
                                    <Form.Item
                                        label="Discount"
                                        name="discount"
                                    >
                                        <Input
                                            type='number'
                                            placeholder='Enter Discount on Product'
                                            className='form_input'
                                            defaultValue={formData?.discount}
                                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} className='col'>
                                    <Form.Item label="Stock Management" name="stock_management">
                                        <Select
                                            defaultValue={false}
                                            value={formData?.stock_management}
                                            onChange={(value) => setFormData({ ...formData, stock_management: value })}
                                        >

                                            <Select.Option value={""}>Select</Select.Option>
                                            <Select.Option value={true}>Yes</Select.Option>
                                            <Select.Option value={false}>No</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} className='col'>
                                    <Form.Item
                                        label="Total Quantity"
                                        name="total_quantity"
                                    >
                                        <Input
                                            type='number'
                                            placeholder='Enter Total Quantity of Product'
                                            className='form_input'
                                            defaultValue={formData?.total_quantity}
                                            onChange={(e) => setFormData({ ...formData, total_quantity: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} className='col'>
                                    <Form.Item
                                        label="SKU"
                                        name="SKU"
                                        rules={[{ required: true, message: 'Please input Product SKU!' }]}
                                    >
                                        <Input
                                            type='text'
                                            placeholder='Enter Product SKU'
                                            className='form_input'
                                            defaultValue={formData?.SKU}
                                            onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} className='col'>
                                    <Form.Item
                                        label="Short Description"
                                        name="short_description"
                                        rules={[{ required: true, message: 'Please input Product Short Description!' }]}
                                    >
                                        <Input.TextArea
                                            type='text'
                                            placeholder='Enter Product Description'
                                            className='form_input'
                                            defaultValue={formData.short_description}
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

                                        <RichTextEditor value={formData?.long_description} handleTextEditor={handleTextEditor} />

                                        {console.log("images", formData.images)}
                                        {console.log('formdata',formData)}
                                    {/* </Form.Item> */}
                                </Col>
                            </Row>


                            <div className='product_images'>
                                {
                                    formData.images.length > 0 && formData.images?.map((o, index) => (
                                        <div className='images'>
                                            <img
                                                key={index}
                                                src={`${File_URL}/${o.image_url}`}
                                                alt={`Selected image ${index}`}
                                            />

                                            <div className="overlay">
                                                <DeleteOutlined className='dlt_image_btn'   onClick={()=>handleImageDelete(index)} />
                                            </div>
                                        </div>
                                    ))
                                }
                                




                            </div>
                        <MyModal handleImageSelect={handleImageSelect} />



                            {/* <h2>Product Images</h2>
                            <div className='product_images'>
                                <div className='images'>
                                    <img src={img_1} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_2} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_3} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_4} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_5} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_6} alt={`Selected image`} />
                                </div>
                                <div className='images'>
                                    <img src={img_7} alt={`Selected image`} />
                                </div>
                            </div> */}
                            <button className='btn' htmlType="submit" style={{ width: "100%" }}>
                                Update
                            </button>
                        </Form>
                        <h2>Product Variations</h2>
                        <div>
                            {productVariationData.map((variation, index) => (
                                <div key={variation._id} className='flex gap-5'>
                                    <p><strong>Variation {index + 1}:</strong></p>
                                    {variation.color && <p>{variation.color.name}</p>}
                                    {variation.size && <p>{variation.size.name}</p>}
                                    {variation.material && <p>{variation.material.name}</p>}
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
            </>
        )
    }
}

export default ProductDetail

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
        const [_, forceUpdate] = useState();
        const [form] = Form.useForm();
        const [categories, setCategories] = useState([])
        const [productVariationData, setProductVariationData] = useState([])
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
            console.log("qqqqq")
            try {
                const response = await getSingleProduct(id)
                if (response.success) {
                    const productData = response.productData;
                    form.setFieldsValue({
                        name: productData.name,
                        short_description: productData.short_description,
                        category_id: productData.category_id._id,
                        long_description: productData.long_description,
                        stock_management: productData.stock_management,
                        SKU: productData.SKU,
                        price: productData.price,
                        discount: productData.discount,
                        total_quantity: productData.total_quantity,
                        images: productData.images,
                        status: productData.status
                    });
                    setProductVariationData(productData.productConfig);
                }
            } catch (error) {
                console.log(error)
                Alert(error.message, false)
            }
        }

        const handleTextEditor = (e) => {
            form.setFieldsValue({ long_description: e });
        }

        const handleImageSelect = (selectedImageIds, selectedImageUrls) => {
            const newImages = selectedImageIds.map((id, index) => ({
                _id: id,
                image_url: selectedImageUrls[index] || ''
            }));

                console.log('new',newImages);
                
            const currentImages = form.getFieldValue('images') || [];
            console.log('ccc',currentImages);
            
            form.setFieldsValue({ images: [...currentImages, ...newImages] });
            console.log('iiii',{ images: [...currentImages, ...newImages] });
            
        };

        // const handleImageDelete = (indexToRemove) => {
        //     console.log('index',indexToRemove)
        //     const updatedImages = form.getFieldValue('images').filter((_, index) => index !== indexToRemove);
        //     console.log('imagesss',updatedImages)
        //     console.log('getfeild',form.getFieldValue('images'))
        //     form.setFieldsValue({ images: updatedImages });
        //     hasChanges.current = true;
        // };

        const handleImageDelete = (indexToRemove) => {
            console.log('index', indexToRemove);
            const updatedImages = form.getFieldValue('images').filter((_, index) => index !== indexToRemove);
            console.log('updated images', updatedImages);
            
            form.setFieldsValue({ images: updatedImages });  // Update the form values
            // hasChanges.current = true;
            productUpdate()
        
            // Force re-render to update the UI
            forceUpdate({});
        };

        const productUpdate = async () => {
            const values = form.getFieldsValue();
            console.log('vvvv', values)
            
            try {
                const response = await updateProduct(id, values);
                if (response.success) {
                    Alert(response.message, response.success);
                    getProductData()
                }
            } catch (error) {
                console.log(error);
                Alert(error.message, false);
            }
        };

        useEffect(() => {
            getProductData()
            getAllCategories()
        }, [])
        useEffect(()=>{
            if(hasChanges.current){
                productUpdate()
            }
        },[hasChanges])

        return (
            <section className='create_area'>
                <Card className='add_product_card'>
                    <h2>Product Detail</h2>

                    <Form
                        form={form}
                        name="basic"
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        onFinish={productUpdate} // Pass form values to productUpdate
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
                                    <Input
                                        type='text'
                                        placeholder='Enter Product Name'
                                        className='form_input'
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={12} className='col'>
                                <Form.Item label="Category" name="category_id">
                                    <Select>
                                        {categories.map(e => (
                                            <Select.Option key={e._id} value={e._id}>
                                                {e.category_name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item
                                    label="Price"
                                    
                                    name="price"
                                    rules={[{ required: true, message: 'Please input Product Price!' }]}
                                >
                                    <Input
                                        type="number"
                                        min={0}
                                        step={1}
                                        placeholder='Enter Product Price'
                                        className='form_input'
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item label="Status" name="status">
                                    <Select>
                                        <Select.Option value={""}  disabled >Select</Select.Option>
                                        <Select.Option value={"active"}>Active</Select.Option>
                                        <Select.Option value={"inactive"}>InActive</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item
                                    label="Discount"
                                    name="discount"
                                >
                                    <Input
                                        type='number'
                                        placeholder='Enter Discount on Product'
                                        className='form_input'
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                                <Form.Item label="Stock Management" name="stock_management">
                                    <Select>
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
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={8} className='col'>
                            {console.log('ttt',form.getFieldValue('SKU'))}
                                <Form.Item
                                    label="SKU"
                                    name="SKU"
                                    rules={[{ required: true, message: 'Please input Product SKU!' }]}
                                >
                                    <Input
                                        type='text'
                                        placeholder='Enter Product SKU'
                                        className='form_input'
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
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} className='col'>

                                <Form.Item
                                    label="Long Description"
                                    name="long_description"
                                    rules={[{ required: true, message: 'Please input the long description!' }]}
                                >
                                    <RichTextEditor value={form.getFieldValue('long_description')} handleTextEditor={handleTextEditor} />
                                </Form.Item>
                                {/* <RichTextEditor value={form.getFieldValue('long_description')} handleTextEditor={handleTextEditor} /> */}
                            </Col>
                        </Row>

                        <div className='product_images'>
                            {console.log('aaaa',form.getFieldValue('images'))}
                            {form.getFieldValue('images')?.map((o, index) => (
                                <div className='images' key={index}>
                                    <img
                                        src={`${File_URL}/${o.image_url}`}
                                        alt={`Selected image ${index}`}
                                    />
                                    <div className="overlay">
                                        <DeleteOutlined className='dlt_image_btn' onClick={() => handleImageDelete(index)} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Form.Item
                            label="Images"
                            name="images"
                        >
                            <MyModal handleImageSelect={handleImageSelect} />
                        </Form.Item>

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
        );
    }

    export default ProductDetail;

import { Button, Card, Col, Form, Input, Popconfirm, Row, Select } from 'antd'
import { HolderOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import React, { useEffect, useRef, useState } from 'react'
import img_1 from "../../assets/1.jpg"
import img_2 from "../../assets/2.jpg"
import img_3 from "../../assets/3.jpg"
import img_4 from "../../assets/4.jpg"
import img_5 from "../../assets/5.webp"
import img_6 from "../../assets/6.webp"
import img_7 from "../../assets/7.jpg"
import { Alert } from '../../ContextAPI/Components/notify'
import { deleteProductVariant, getAllVariationBasisOnVariantName, GetCategories, getSingleProduct, getSingleVariant, updateProduct, updateProductVariant } from '../../ContextAPI/APIs/api'
import { useParams } from 'react-router-dom'
import { RichTextEditor } from '../../components/richTextEditor';
import { File_URL } from '../../config'
import { DeleteOutlined } from '@ant-design/icons'
import MyModal from '../../components/Modal'
import VariantModal from '../../components/setting_components/VariantModal'

// import e from 'express'

function ProductDetail() {

    const { slug } = useParams()
    const [_, forceUpdate] = useState();
    const [form] = Form.useForm();
    const [productVariationData, setProductVariationData] = useState([])
    const [id, setId] = useState("")
    const [variantId, setVariantId] = useState("")
    const hasChanges = useRef(false);
    const [variationData, setVariationData] = useState({
        color: null,
        size: null,
        material: null,
        price: "",
        stock_quantity: ""

    })

    const [categories, setCategories] = useState([])

    const [variationOption, setVariationOption] = useState({
        Color: [],
        Size: [],
        Material: [],
    });




    const getVariantOnNameBasis = async (fieldName) => {
        try {
            console.log('here', fieldName)
            const response = await getAllVariationBasisOnVariantName(fieldName)
            console.log('response', response)
            if (response.success)
                setVariationOption((prevState) => ({
                    ...prevState,
                    [fieldName]: response.variationOption,
                }));
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }


    const singlevariant = async (configId) => {
        try {
            const response = await getSingleVariant(configId)
            if (response.success) {
                const variantData = response.variant
                form.resetFields();
                form.setFieldValue({
                    size: variantData.size,
                    color: variantData.color,
                    material: variantData?.material,
                    price: variantData.price,
                    stock_quantity: variantData.stock_quantity
                })
                setVariantId(variantData._id)
                console.log('vvvv', variantId)
                console.log('vvv', form.getFieldValue('price'))
            }

        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('variantId', variantId)
        const values = form.getFieldsValue();

        try {
            if (variantId) {
                console.log('var', variantId)
                // If variantId is set, update the variant
                const response = await updateProductVariant(variantId, variationData);
                if (response.success) {
                    Alert(response.message, true);
                }
                // } else {
                //     // If no variantId, update the product
                //     const response = await updateProduct(id, values);
                //     if (response.success) {
                //         Alert(response.message, true);
                //         getProductData();  // Refresh product data after update
                //     }
            }
        } catch (error) {
            console.error('Error updating:', error);
            Alert(error.message, false);
        }
    };


    const deleteVariant = async (id)=>{
        try {
            const response = await deleteProductVariant(id)
            if(response.success){
                Alert(response.message,response.success)
                getProductData()
                
            }
        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
    }




    // variant update function api 

    // const variantUpdate = async () =>{
    //     try {

    //         const values = form.getFieldsValue();
    //         console.log('vvvv', values)
    //         const response = await updateProductVariant(variantId,values)
    //         if(response.success){
    //             Alert(response.message,response.success)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         Alert(error.message,false)
    //     }
    // }



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
            const response = await getSingleProduct(slug)
            console.log(response)
            if (response.success) {
                const productData = response.productData;
                form.resetFields();
                console.log('oooooo', productData)
                form.setFieldsValue({
                    name: productData.name,
                    short_description: productData.short_description,
                    category_id: productData?.category_id?._id,
                    long_description: productData.long_description,
                    stock_management: productData.stock_management,
                    SKU: productData.SKU,
                    price: productData.price,
                    discount: productData.discount,
                    total_quantity: productData.total_quantity,
                    images: productData.images,
                    status: productData.status,


                });
                setProductVariationData(productData.productConfig);
                setId(productData._id)


            }
        } catch (error) {
            console.log('ee', error)
            Alert(error.message, false)
        }
    }


    console.log('iddddddd', id)
    const handleTextEditor = (e) => {
        form.setFieldsValue({ long_description: e });
    }

    const handleImageSelect = (selectedImageIds, selectedImageUrls) => {
        const newImages = selectedImageIds.map((id, index) => ({
            _id: id,
            image_url: selectedImageUrls[index] || ''
        }));

        console.log('new', newImages);

        const currentImages = form.getFieldValue('images') || [];
        console.log('ccc', currentImages);

        form.setFieldsValue({ images: [...currentImages, ...newImages] });
        console.log('iiii', { images: [...currentImages, ...newImages] });

    };



    const handleImageDelete = (indexToRemove) => {
        console.log('index', indexToRemove);
        const updatedImages = form.getFieldValue('images').filter((_, index) => index !== indexToRemove);
        console.log('updated images', updatedImages);

        form.setFieldsValue({ images: updatedImages });  // Update the form values
        // hasChanges.current = true;
        // productUpdate()

        // Force re-render to update the UI
        forceUpdate({});
    };
    // let id = form.getFieldValue('id')
    // console.log('iddd',id)


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

        getVariantOnNameBasis("Size");
        getVariantOnNameBasis("Color");
        getVariantOnNameBasis("Material");
    }, []);


    useEffect(() => {
        getProductData()
        getAllCategories()
    }, [])
    useEffect(() => {
        if (hasChanges.current) {
            productUpdate();
            hasChanges.current = false; // Reset the flag after updating
        }
    }, [hasChanges]);

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
                                    <Select.Option disabled>None</Select.Option>
                                    {categories.map(e => (
                                        <Select.Option key={e._id} value={e._id}>
                                            {e?.category_name || "none"}
                                            {/* {e.parent_category_id ? e.parent_category_id.category_name : "none"} */}
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
                                    <Select.Option value={""} disabled >Select</Select.Option>
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
                            {console.log('ttt', form.getFieldValue('SKU'))}
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
                        {console.log('aaaa', form.getFieldValue('images'))}
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
                            <p><strong>Variation {index + 1}:</strong></p> ||
                            {variation.color && <p>{variation.color.name}</p>} ||
                            {variation.size && <p>{variation.size.name}</p>} ||
                            {variation.material && <p>{variation.material.name}</p> || "null"} ||
                            {variation.price && <p>{variation.price}</p>} ||
                            {variation.stock_quantity && <p>{variation.stock_quantity}</p>}
                            <VariantModal
                                btnText={"Edit"}
                                title={"Edit"}
                                customClasses="w-full"
                                onOpen={() => {
                                    setVariationData({
                                        size: variation.size?._id || "",
                                        color: variation.color?._id || "",
                                        material: variation.material?._id || "",
                                        price: variation.price || "",
                                        stock_quantity: variation.stock_quantity || ""
                                    });
                                    singlevariant(variation._id); // Fetch additional data if needed
                                }}
                                getProductData={getProductData}
                            >
                                <form>
                                    <div>
                                        <label>Sizes</label>
                                        <Select
                                            value={variationData.size}  // Controlled component
                                            onChange={(value) => setVariationData({ ...variationData, size: value })}
                                            placeholder="Select size"
                                        >
                                            {variationOption?.Size?.length > 0 ? (
                                                variationOption?.Size.map((e) => (
                                                    <Select.Option key={e._id} value={e._id}>
                                                        {e.name}
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <Select.Option value={null}>No Option Found</Select.Option>
                                            )}
                                        </Select>
                                    </div>

                                    <div>
                                        <label>Colors</label>
                                        <Select
                                            value={variationData.color}  // Controlled component
                                            onChange={(value) => setVariationData({ ...variationData, color: value })}
                                            placeholder="Select color"
                                        >
                                            {variationOption?.Color?.length > 0 ? (
                                                variationOption?.Color.map((e) => (
                                                    <Select.Option key={e._id} value={e._id}>
                                                        {e.name}
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <Select.Option value={null}>No Option Found</Select.Option>
                                            )}
                                        </Select>
                                    </div>

                                    <div>
                                        <label>Materials</label>
                                        <Select
                                            value={variationData.material}  // Controlled component
                                            onChange={(value) => setVariationData({ ...variationData, material: value })}
                                            placeholder="Select material"
                                        >
                                            {variationOption?.Material?.length > 0 ? (
                                                variationOption?.Material.map((e) => (
                                                    <Select.Option key={e._id} value={e._id}>
                                                        {e.name}
                                                    </Select.Option>
                                                ))
                                            ) : (
                                                <Select.Option value={null}>No Option Found</Select.Option>
                                            )}
                                        </Select>
                                    </div>

                                    <div>
                                        <label>Price</label>
                                        <Input
                                            type="text"
                                            value={variationData.price}  // Controlled component
                                            onChange={(e) => setVariationData({ ...variationData, price: e.target.value })}
                                            placeholder="Enter Price"
                                        />
                                    </div>

                                    <div>
                                        <label>Stock Quantity</label>
                                        <Input
                                            type="text"
                                            value={variationData.stock_quantity}  // Controlled component
                                            onChange={(e) => setVariationData({ ...variationData, stock_quantity: e.target.value })}
                                            placeholder="Enter Stock Quantity"
                                        />
                                    </div>

                                    <button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ width: "50%", color: "white", background: "blue" }}
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Update
                                    </button>
                                </form>
                            </VariantModal>
                            <Button type="primary" danger ghost>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to delete this product variant?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => deleteVariant(variation._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Delete
                                </Popconfirm>
                            </Button>
                        </div>
                    ))}

                </div>
            </Card>
        </section >
    );
}

export default ProductDetail;

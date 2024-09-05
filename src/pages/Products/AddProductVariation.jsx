import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Alert } from '../../ContextAPI/Components/notify'
import { addProductVariant, getAllVariationBasisOnVariantName } from '../../ContextAPI/APIs/api'
import { Button, Card, Form, Input, Select } from 'antd'
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"

const AddProductVariation = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get('id'); // Get the id from query parameters
    console.log('productId', productId)
    const [form] = Form.useForm();
    const [variationOption, setVariationOption] = useState({
        Color: [],
        Size: [],
        Material: [],
    });

    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([])
    const [colors, setColors] = useState([])
    const [materials, setMaterials] = useState([])
    const { id } = useParams()
    console.log('idddddddddd', id)
    const [formData, setFormData] = useState([])

    const [initialData, setInitialData] = useState({
        product_id: productId,
        size: null,
        color: null,
        material: null,
        stock_quantity: "",
        price: "",
    });

    const AddAnotherVariant = () => {
        form.resetFields();
        setInitialData({
            product_id: productId,
            size: null,
            color: null,
            material: null,
            stock_quantity: "",
            price: "",
        });
    };

    const addProductVariation = async () => {
        try {
            const response = await addProductVariant(formData);
            if (response.success) Alert(response.message, response.success);
            setInitialData({
                product_id: productId,
                size: null,
                color: null,
                material: null,
                stock_quantity: "",
                price: "",
            });
            setFormData([]);
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };

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
    console.log('variationOption', variationOption)

    // const pushInitialData = async () => {
    //     if (!initialData.stock_quantity || !initialData.price) {
    //         return Alert("Please Add Price and Quantitiy", false);
    //     } else if (
    //         !initialData.size &&
    //         !initialData.color &&
    //         !initialData.material
    //     ) {
    //         return Alert("Please Select One Variant atLeast", false);
    //     }

    //     setFormData([...formData, initialData]);
    //     console.log([...formData, initialData]);
    // };

    const pushInitialData = async () => {
        if (!initialData.stock_quantity || !initialData.price) {
            return Alert("Please Add Price and Quantity", false);
        } else if (!initialData.size && !initialData.color && !initialData.material) {
            return Alert("Please Select At Least One Variant", false);
        }

        setFormData([...formData, { ...initialData }]);
        // AddAnotherVariant(); // Reset form after adding variant
    };

    useEffect(() => {
        if (productId) {
            setInitialData((prevState) => ({ ...prevState, product_id: productId }));
        }
    }, [productId]);

    useEffect(() => {
        getVariantOnNameBasis("Size");
        getVariantOnNameBasis("Color");
        getVariantOnNameBasis("Material");
    }, []);

    return (
        <>
            <section className=''>
                <Card className='add_product_variant_card'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1rem" }}>
                        <h2>Add Product Variant</h2>
                        <button className='btn'><PlusOutlined style={{ fontSize: "16px", marginBottom: "0px" }} /></button>
                    </div>
                    <Form
                        form={form}
                        name="basic"
                        layout='horizontal'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: "100%" }}
                        initialValues={{ remember: true }}
                        onFinish={addProductVariation}
                        onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                        autoComplete="off"
                    >
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {/* <Form.Item
                                label="Product"
                                name="Product"
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: 'Please input your product name!' }]}
                            >
                                {console.log('productIdddd',initialData.product_id)}
                                <Input
                                    type='text'
                                    placeholder='Enter Product name'
                                    className='form_input'
                                    defaultValue={productId}
                                    // onChange={(e) => setInitialData({ ...initialData, product_id: e.target.value })}
                                    disabled
                                />
                            </Form.Item> */}

                            {console.log(initialData.color, 'colorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')}


                            <Form.Item label="Colors" name="color" style={{ width: "100%" }}>
                                <Select
                                    value={initialData.color}
                                    onChange={(value) => setInitialData({ ...initialData, color: value })}
                                >
                                    <Select.Option value="">Select</Select.Option>
                                    {variationOption?.Color?.length > 0 ? (
                                        variationOption?.Color.map((e) => (
                                            <Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>
                                        ))
                                    ) : (
                                        <Select.Option value={null}>No Option Found</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Sizes" name="size" style={{ width: "100%" }}>
                                <Select
                                    value={initialData.size}
                                    onChange={(value) => setInitialData({ ...initialData, size: value })}
                                >
                                    <Select.Option value="">Select</Select.Option>
                                    {variationOption?.Size?.length > 0 ? (
                                        variationOption?.Size?.map((e) => (
                                            <Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>
                                        ))
                                    ) : (
                                        <Select.Option value={null}>No Option Found</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Materials" name="material" style={{ width: "100%" }}>
                                <Select

                                    value={initialData?.material}
                                    onChange={(value) => setInitialData({ ...initialData, material: value })}
                                >
                                    <Select.Option value="">Select</Select.Option>
                                    {variationOption?.Material?.length > 0 ? (
                                        variationOption?.Material?.map((e) => (
                                            <Select.Option key={e._id} value={e._id}>{e.name}</Select.Option>
                                        ))
                                    ) : (
                                        <Select.Option value={null}>No Option Found</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Price"
                                name="price"
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <Input
                                    type='text'
                                    placeholder='Enter Price'
                                    className='form_input'
                                    value={initialData.price}
                                    onChange={(e) => setInitialData({ ...initialData, price: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item
                                label="stock Managment"
                                name="stock managment"
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: 'Please input stock quantity' }]}
                            >
                                <Input
                                    type='text'
                                    placeholder='Enter quantity'
                                    className='form_input'
                                    value={initialData.stock_quantity}
                                    onChange={(e) => setInitialData({ ...initialData, stock_quantity: e.target.value })}
                                />
                            </Form.Item>

                            <div>
                                <p></p>
                                <button className='btn' style={{ marginBottom: "0px" }}>
                                    <DeleteOutlined style={{ fontSize: "16px", marginBottom: "0px" }} />
                                </button>
                            </div>
                        </div>

                        <Button className='btn' onClick={pushInitialData} type="button" style={{ width: "100%" }}>
                            Add Variant
                        </Button>

                        {
                            formData.length > 0 ? (
                                <>
                                    {formData.map((e, i) => (
                                        <div key={i}>
                                            size: {e?.size}, color: {e?.color}, material: {e?.material}, price: {e?.price}, stockQuantity: {e?.stock_quantity}
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <></>
                            )
                        }
                        {formData.length > 0 && (
                            <>
                                <div className="mb-4" style={{ marginBottom: "4px" }}>

                                    <Button type="primary" onClick={AddAnotherVariant} style={{ width: "100%" }}>
                                        ADD ANOTHER VARIANT
                                    </Button>
                                </div>
                                <div className="mb-4" style={{ marginBottom: "4px" }}>

                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                        SAVE VARIANTS
                                    </Button>
                                </div>
                            </>
                        )}

                    </Form>
                </Card>
            </section>
        </>
    )
}

export default AddProductVariation

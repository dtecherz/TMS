import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Alert } from '../../ContextAPI/Components/notify'
import { addProductVariant, getAllVariationBasisOnVariantName, getSingleProduct } from '../../ContextAPI/APIs/api'
import { Button, Card, Form, Input, Select } from 'antd'
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons"
import VariationModal from './VariationModal'

const AddProductVariation = ({ productId, stock ,getProductData}) => {

    const location = useLocation();


    const queryParams = new URLSearchParams(location.search);
    console.log('productId', productId)
    console.log('stock', stock)
    const [form] = Form.useForm();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [variationName, setVariationName] = useState([])
    const [VarName, setVarName] = useState("")

    // variation name function for shoing variaiton options 
    const VariationShow = () => {
        // Update the variationName array immutably
        setVariationName(prev => [...prev, VarName]);
        setVarName("");
        setIsModalOpen(false);

    };
    console.log('VarName', VarName, variationName)


     // Function to show the modal
     const showModal = () => {
        setIsModalOpen(true);
    };

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
        stock_quantity: null,
        price: "",
    });



    console.log('formmmmmmmm', form.getFieldValue('stock_management'))

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

    const addProductVariation = async (e) => {
        e.preventDefault()
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
            // getProductData()
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

    const pushInitialData = async () => {
        if (!initialData.price) {
            return Alert("Please Add Price and Quantity", false);
        } else if (!initialData.size && !initialData.color && !initialData.material) {
            return Alert("Please Select At Least One Variant", false);
        } else if ((stock || stock == true) && !initialData.stock_quantity) {

            return Alert("Please Add  Quantity", false);
        }


        setFormData([...formData, { ...initialData }]);
        form.resetFields();
        setInitialData({
            product_id: productId,
            size: null,
            color: null,
            material: null,
            stock_quantity: "",
            price: "",
        });
        console.log('forii',formData)
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
                        <VariationModal
                            btnText={<PlusOutlined style={{ fontSize: "16px", marginBottom: "0px" }} />}
                            title={"Add Variation to Create"}
                            customClasses="w-full"
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen} 
                            formData={formData}
                            setFormData={setFormData}
                        >
                            <Form
                                name="basic"
                                layout='horizontal'
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                style={{ maxWidth: "100%" }}

                                onFinish={VariationShow}
                                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Variation Name"
                                    name="Title"
                                    rules={[{ required: true, message: 'Please input your payment method name!' }]}
                                    value={VarName}
                                >
                                    <Input type='text' placeholder='e.g Colors' onChange={(e) => setVarName(e.target.value)} />
                                </Form.Item>

                                {/* Other Form Fields... */}

                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                        </VariationModal>
                        {/* <button className='btn'><PlusOutlined style={{ fontSize: "16px", marginBottom: "0px" }} /></button> */}
                    </div>

                    {
                        variationName.length > 0 &&
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
                            {
                                variationName.includes("color") ?
                                    <Form.Item label="Colors" name="color" style={{ width: "100%" }}
                                    
                                    rules={[{ required: true, message: 'Please input color' }]}
                                    >
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
                                    :
                                    <></>
                            }

                            {
                                variationName.includes("size") ?
                                    <Form.Item label="Sizes" name="size" style={{ width: "100%" }} 
                                    rules={[{ required: true, message: 'Please input size' }]}
                                    >
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
                                    :
                                    <></>
                            }
                            {
                                variationName.includes("material") ?
                                    <Form.Item label="Materials" name="material" style={{ width: "100%" }}
                                    rules={[{ required: true, message: 'Please input material!' }]}
                                    >
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
                                    :
                                    <></>
                            }

                            <Form.Item
                                label="Variant additional Price"
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
                                label="Stock Management"
                                name="stock_management"
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
                                            size: {e?.size}, color: {e?.color}, material: {e?.material  || null}, price: {e?.price}, stockQuantity: {e?.stock_quantity}
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

                                    <Button type="primary" onClick={addProductVariation} style={{ width: "100%" }}>
                                        Save
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                    }
                   
                </Card>
            </section>
        </>
    );
};

export default AddProductVariation;

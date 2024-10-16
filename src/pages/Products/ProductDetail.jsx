import { Button, Card, Col, Form, Input, Popconfirm, Row, Select, Table } from 'antd'
import { HolderOutlined, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons'

import React, { useEffect, useRef, useState } from 'react'
import img_1 from "../../assets/1.jpg"
import img_2 from "../../assets/2.jpg"
import img_3 from "../../assets/3.jpg"
import img_4 from "../../assets/4.jpg"
import img_5 from "../../assets/5.webp"
import img_6 from "../../assets/6.webp"
import img_7 from "../../assets/7.jpg"
import { Alert } from '../../ContextAPI/Components/notify'
import { addProductVariant, deleteProductVariant, getAllVariationBasisOnVariantName, GetCategories, getSingleProduct, getSingleVariant, updateProduct, updateProductVariant } from '../../ContextAPI/APIs/api'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RichTextEditor } from '../../components/richTextEditor';
import { ClientAPI_URL, File_URL } from '../../config'
import { DeleteOutlined } from '@ant-design/icons'
import MyModal from '../../components/Modal'
import VariantModal from '../../components/setting_components/VariantModal'
import VariationModal from './VariationModal'
import AddProductVariation from './AddProductVariation'
import ImageModal from './ImageModal'


// import e from 'express'

function ProductDetail() {

    const { slug } = useParams()
    const [_, forceUpdate] = useState();
    const [form] = Form.useForm();
    const [newForm] = Form.useForm()
    const [productVariationData, setProductVariationData] = useState([])
    const [id, setId] = useState("")
    const [variantId, setVariantId] = useState("")
    const hasChanges = useRef(false);
    const navigate = useNavigate()

    const redirect = () => {
        window.open(`${ClientAPI_URL}/product/${slug}`)
    }
    const [variationData, setVariationData] = useState({
        color: null,
        size: null,
        material: null,
        price: "",
        stock_quantity: ""

    })
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState([])


    const [categories, setCategories] = useState([])

    const [variationOption, setVariationOption] = useState({
        Color: [],
        Size: [],
        Material: [],
    });


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [variationName, setVariationName] = useState([])
    const [VarName, setVarName] = useState("")
    console.log('iiiii', id)
    const [initialData, setInitialData] = useState({
        product_id: id,
        size: null,
        color: null,
        material: null,
        stock_quantity: null,
        price: "",
    });

    let stock
    let status
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
                stock = form.getFieldValue('stock_management')
                status = form.getFieldValue('status')
                console.log('stock', stock)
                set_st_m(stock)
                setProductVariationData(productData.productConfig);
                setId(productData._id)

                setInitialData(prev => ({
                    ...prev,
                    product_id: productData._id, // Update the product_id in initialData
                }));

            }
        } catch (error) {
            console.log('ee', error)
            Alert(error.message, false)
        }
    }

    function labelStyle(params) {
        console.log("status");
        console.log("status");
        console.log("status");
        console.log("status");
        console.log(form.getFieldValue("stock_management"));
        if (form.getFieldValue("status") == "active") {
            return { color: 'green', borderBottom: "2px solid green", padding: "5px 10px", borderRadius: "5px" }

        } else {
            return { color: 'red', borderBottom: "2px solid red", padding: "5px 10px", borderRadius: "5px" }

        }
    }

    // const labelStyle = status === " active" ?
    // { color: 'green', borderBottom: "2px solid green", padding: "5px 10px" , borderRadius:"5px" }
    // : 
    // { color: 'red', borderBottom: "2px solid red", padding: "5px 10px", borderRadius:"5px" } 


    useEffect(() => {
        if (id) {
            setInitialData(prev => ({
                ...prev,
                product_id: id,
            }));
        }
    }, [id]);

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


    const AddAnotherVariant = () => {
        newForm.resetFields();
        setInitialData({
            product_id: id,
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
            console.log('iffff', id, formData)

            const response = await addProductVariant(formData);
            console.log(response, "rrrrr")
            if (response.success) Alert(response.message, response.success);
            setInitialData({
                product_id: id,
                size: null,
                color: null,
                material: null,
                stock_quantity: "",
                price: "",
            });
            setFormData([]);
            getProductData()
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };


    const pushInitialData = async () => {

        console.log("innnn");
        console.log("innnn4", productVariationData[0].material);


        if (!initialData.size && !initialData.color && !initialData.material) {
            console.log("innnn2");
            return Alert("Please Select At Least One Variant", false);
        }
        if (!initialData.price) {
            console.log("innnn1");
            return Alert("Please Add Price and Quantity", false);
        }

        if (stock && !initialData.stock_quantity) {
            console.log("innnn3");
            return Alert("Please Add  Quantity", false);
        }
        if (((productVariationData[0].size !== null) && !initialData.size)) {
            return Alert("Please dd material", false)
        }
        if (((productVariationData[0].color !== null) && !initialData.color)) {
            return Alert("Please dd material", false)
        }
        if (((productVariationData[0].material !== null) && !initialData.material)) {
            return Alert("Please dd material", false)
        }



        console.log("formdataaaaaaaaaaaaa", formData)

        setFormData([...formData, { ...initialData }]);
        console.log('forii', initialData)
        console.log('iffffff', id)

        newForm.resetFields();
        setInitialData({
            product_id: id,
            size: null,
            color: null,
            material: null,
            stock_quantity: "",
            price: "",
        });
    };

    console.log('formdata', formData)
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


    const deleteVariant = async (id) => {
        try {
            const response = await deleteProductVariant(id)
            if (response.success) {
                Alert(response.message, response.success)
                getProductData()

            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }








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

    const sortedImages = (img) => {
        console.log('??????????????', form.getFieldValue("images"))
        console.log('Sorted images:', img);
        form.setFieldValue("images", img); // Specify "images" directly
        // productUpdate();
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

    console.log('variationData', productVariationData)

    const dataSource = productVariationData.map(item => {
        return {
            key: item._id, // Use the product's ID as the key
            size: item.size ? item.size.name : '--', // Extract size name
            color: item.color ? item.color.name : '--',
            material: item.material ? item.material.name : "--",// Extract color name
            price: item.price,
            stock_quantity: item.stock_quantity,
            edit: <VariantModal
                btnText={"Edit"}
                title={"Edit"}
                customClasses="w-full"
                onOpen={() => {
                    setVariationData({
                        size: item.size?._id || "",
                        color: item.color?._id || "",
                        material: item.material?._id || "",
                        price: item.price || "",
                        stock_quantity: item.stock_quantity || ""
                    });
                    singlevariant(item._id); // Fetch additional data if needed
                }}
                getProductData={getProductData}
            >
                <form>
                    <div>
                        {
                            item.size !== null ?
                                <>
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
                                </>

                                :
                                <></>
                        }
                    </div>

                    <div>

                        {
                            item.color !== null ?
                                <>
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


                                </>
                                :
                                <></>
                        }
                    </div>

                    <div>
                        {
                            item.material !== null ?
                                <>

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
                                </>
                                :
                                <></>
                        }
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
            </VariantModal>,
            delete: <Button type="primary" danger ghost>
                <Popconfirm
                    title="Delete This Variation"
                    description="Are you sure you want to delete this product variant?"
                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                    onConfirm={() => deleteVariant(item._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    Delete
                </Popconfirm>
            </Button>

        };
    });

    const column = productVariationData.map(config => {
        return Object.keys(config).filter(key => config[key] !== null && typeof config[key] === 'object');
    });

    // Use a Set to filter out duplicate keys
    const uniqueKeys = new Set(column.flat());

    // Dynamically create table headings based on the unique keys
    const tableHeading = Array.from(uniqueKeys).map(key => {
        return {
            title: key.charAt(0).toUpperCase() + key.slice(1),  // Capitalize the key for the title
            dataIndex: key,  // Access nested 'name' in object fields like size and color
            key: key,
        };
    });


    tableHeading.push(
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stock_quantity',
            key: 'stock_quantity',
        },
        {
            title: 'Action',
            dataIndex: 'edit',
            key: 'edit'
        },
        {
            title: "Delete",
            dataIndex: 'delete',
            key: 'delete'
        }
    );
    { console.log("////////////", variationData) }


    const [st_m, set_st_m] = useState(false)
    function st_m_Change(e) {
        console.log(document.getElementById("stock_management").value);
        if (document.getElementById("stock_management") == true) set_st_m(true)
        else set_st_m(false)
    }



    return (
        <section className='create_area'>
            <Card className='add_product_card'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>

                    <h2>Product Detail</h2>

                    <button className='create_btn' onClick={() => redirect()}>View Product</button>


                </div>


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
                                    id='name123'
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} className='col'>
                            <Form.Item
                                label={<span style={labelStyle()}>Status</span>}
                                name="status"
                            >
                                <Select>
                                    <Select.Option value={""} disabled >Select</Select.Option>
                                    <Select.Option value={"active"}>Active</Select.Option>
                                    <Select.Option value={"inactive"}>InActive</Select.Option>
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
                        <Col xs={24} sm={24} md={8} className='col'>
                            <Form.Item label="Stock Management" name="stock_management">
                                <Select
                                    onChange={(value) => {
                                        // st_m_Change(value); // Call your existing handler
                                        set_st_m(value); // Update state with the selected value
                                    }}
                                    id='stock_management'
                                >
                                    <Select.Option value={true}>Yes</Select.Option>
                                    <Select.Option value={false}>No</Select.Option>
                                </Select>
                            </Form.Item>
                            {console.log('sddddd',st_m)}
                        </Col>

                        <Col xs={24} sm={24} md={8} className='col'>
                            {st_m ?
                                <Form.Item
                                    label="Total Quantity"
                                    name="total_quantity"
                                // disabled={form.getFieldValue("stock_management") == false}
                                >
                                    <Input
                                        type='number'
                                        placeholder='Enter Total Quantity of Product'
                                        className='form_input'
                                    // disabled
                                    />
                                </Form.Item>
                                :
                               <></>
                            }

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
                                rules={[{ required: false, message: 'Please input the long description!' }]}
                            >
                                <RichTextEditor value={form.getFieldValue('long_description')} handleTextEditor={handleTextEditor} />
                            </Form.Item>
                            {/* <RichTextEditor value={form.getFieldValue('long_description')} handleTextEditor={handleTextEditor} /> */}
                        </Col>
                    </Row>

                    <h3>Images</h3>
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
                    <div className='d-flex'>
                        <Row>

                            <Col lg={18} sm={18} md={18}>

                                <div>

                                    <Form.Item
                                        // label="Images"
                                        name="images"
                                    >
                                        <MyModal handleImageSelect={handleImageSelect} />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col lg={6} sm={6} md={6}>
                                <div>
                                    {console.log('imageeeeee', form.getFieldValue('images'))}
                                    <ImageModal photos={form.getFieldValue("images")} btn={"Sort Images"} sortedImages={sortedImages} productUpdate={productUpdate}></ImageModal>
                                </div>
                            </Col>

                        </Row>
                    </div>
                    <button className='btn' htmlType="submit" style={{ width: "100%" }}>
                        Update
                    </button>
                </Form>
                <div className='div' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>

                    <h2>Product Variations</h2>
                    {/* <h3>Add more variants</h3> */}
                    <Button
                        // customClasses="w-full"
                        className={`btn create_btn my-4`}
                        type="danger"
                        onClick={() => setShowForm(true)}
                    // style={{ width: "150px" }}
                    >
                        Add more variants
                    </Button>
                </div>
                {/* <div>
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

                </div> */}


                <div className='my-5'>
                    {
                        productVariationData.length > 0 ?
                            <>
                                {

                                    showForm == true ?

                                        <Form
                                            form={newForm}
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
                                                    productVariationData[0]?.color !== null ?
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
                                                    productVariationData[0]?.size !== null ?
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
                                                    productVariationData[0]?.material !== null ?
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
                                                        <>
                                                        </>
                                                }

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
                                            {console.log('vvvvv', form)}

                                            {
                                                formData.length > 0 ? (
                                                    <>
                                                        {formData.map((e, i) => (
                                                            <div key={i}>
                                                                size: {e?.size}, color: {e?.color}, material: {e?.material || null}, price: {e?.price}, stockQuantity: {e?.stock_quantity}
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
                                                            ADD VARIANT
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </Form>
                                        :
                                        <></>
                                }
                            </>
                            :
                            <>
                                <AddProductVariation productId={id} stock={stock} getProductData={getProductData} />
                            </>
                    }


                    <Table dataSource={dataSource} columns={tableHeading} />;

                </div>
            </Card>
        </section >
    );
}

export default ProductDetail;

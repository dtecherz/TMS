import React, { useEffect, useState } from 'react'
import MyModal1 from '../../components/MyModal1'
import PaymentModal from '../../components/PaymentModal'
import { useParams } from 'react-router-dom'
import { Button, Col, Flex, Form, Input, Popconfirm, Row, Select, Switch } from 'antd'

import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons"
import { RichTextEditor } from '../../components/richTextEditor'
import { addPaymentMethod, addVaraitionOption, GetPaymentMethods, getSinglePaymentMethod, UpdatePaymentMethod } from '../../ContextAPI/APIs/api'
import { Alert } from '../../ContextAPI/Components/notify'

function PaymentMethods() {

    const { id } = useParams()
    const [form] = Form.useForm();
    const [paymentMethodId, setPaymentMethodId] = useState(null);
    const [variationOption, setVariationOption] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [name, setName] = useState("")
    const [data, setData] = useState({
        payment_type: "",
        Title: "",
        Account_Details: "",
        status: "active"
    })


    // add paytmet method 

    const addPaymentMethods = async () => {
        try {
            const response = await addPaymentMethod(data)
            if (response.success) Alert(response.message, response.success)
            getPyamentMathodsData()
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }



    // const paymentMethodUpdate = async () => {
    //     const values = form.getFieldValue()
    //     try {
    //         const response = await UpdatePaymentMethod(id, values)
    //         if (response.success) Alert(response.message, response.success)
    //     } catch (error) {
    //         console.log(error)
    //         Alert(error.message, false)
    //     }
    // }


    const paymentMethodUpdate = async () => {
        if (!paymentMethodId) {
            Alert("No payment method selected", false);
            return;
        }

        const values = form.getFieldsValue(); // Use getFieldsValue() to get all form values
        try {
            const response = await UpdatePaymentMethod(paymentMethodId, values); // Use paymentMethodId here
            if (response.success) Alert(response.message, response.success);
            getPaymentMethod(paymentMethodId)
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };





    // get single payment method 
    // const getPaymentMethod = async (id) => {
    //     console.log("Fetching payment method...");
    //     try {
    //         const response = await getSinglePaymentMethod(id);
    //         if (response.success) {
    //             const paymentData = response.paymentMethod;
    //             // Set form values here
    //             form.setFieldsValue({
    //                 Title: paymentData.Title,
    //                 payment_type: paymentData.payment_type,
    //                 Account_Details: paymentData.Account_Details,
    //             });
    //             // Set local state if needed
    //             setData(paymentData);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         Alert(error.message, false);
    //     }
    // };

    const getPaymentMethod = async (id) => {
        console.log("Fetching payment method...");
        try {
            const response = await getSinglePaymentMethod(id);
            if (response.success) {
                const paymentData = response.paymentMethod;
                // Set form values here
                form.setFieldsValue({
                    Title: paymentData.Title,
                    payment_type: paymentData.payment_type,
                    Account_Details: paymentData.Account_Details,
                });
                setData(paymentData);

                setPaymentMethodId(id); // Set the id for later use
            }

        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };


    const getPyamentMathodsData = async () => {
        try {
            const response = await GetPaymentMethods()
            if (response.success) setPaymentMethods(response.paymentMethodDetails)
            console.log('pay', paymentMethods)
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }
    const getVriationOption = async () => {
        try {
            const response = await getAllVariationBasisOnVariant(id)
            if (response.success) setVariationOption(response.variationOptions)
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    const VariationOption = async () => {
        try {
            const response = await addVaraitionOption({ name: name, variation_id: props.variation_id })
            if (response.success) Alert(response.message, response.success)
            props.getVriationOption()
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };


    const handleTextEditor = (e, ) => {
        console.log('eee', e)
        form.setFieldValue({ Account_Details: e })
        setData({ ...data, Account_Details: e })
    }


    const handleOpenModal = (id) => {
        setPaymentMethodId(id);
        getPaymentMethod(id);

    };

    useEffect(() => {
        getPyamentMathodsData()
    }, [])
    // useEffect(() => {
    //     if (paymentMethodId  && form.getFieldValue('Title')) {
    //         getPaymentMethod(paymentMethodId);
    //     }
    // }, [paymentMethodId]);
    console.log('dataaaa', data)

    // const [swS,setswS] = useState(false)
    const handleSwitch = async (id, status) => {
        console.log("status", status);

        let p = {}
        if (status == "active") {
            p.status = "inactive"
            // setswS(false)
        }
        else {
            p.status = "active"
            // setswS(true)
        }
        console.log("ppppp", p);
        // return 

        await paymentMethodUpdate(id, p)

        await getPyamentMathodsData()
    }


    return (
        <>
            <section className='addresses_area'>

                <div className='flex justify-between items-center mb-8'>
                    <h2 className='mb-0'>Payment Method</h2>
                    <PaymentModal btnText={"Create Payment"} title={"Create Payment"} variation_id={id} getVriationOption={getVriationOption}>

                        <Form
                            name="basic"
                            layout='horizontal'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: "100%" }}
                            initialValues={{ remember: true }}
                            onFinish={addPaymentMethods}
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
                                    placeholder='Enter Payment Method'
                                    className='form_input'
                                    value={data.Title}
                                    onChange={(e) => setData({ ...data, Title: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item label="Payment Type" name="payment_type">
                                <Select
                                    defaultValue={""}
                                    value={data.payment_type}
                                    onChange={(value) => setData({ ...data, payment_type: value })}
                                >
                                    <Select.Option value={""} disabled>Choose Payment Type</Select.Option>
                                    <Select.Option value={"COD"}>Cash On Delivery</Select.Option>
                                    <Select.Option value={"Digital-Wallet"}>Digital Wallet</Select.Option>
                                    <Select.Option value={"Direct-Bank-Transfer"}>Bank Transfer</Select.Option>
                                    <Select.Option value={"Payment-Gateway"}>Payment Gateway</Select.Option>
                                </Select>
                            </Form.Item>


                            <Form.Item label="Description" name="description">
                                <RichTextEditor value={data.Account_Details} handleTextEditor={handleTextEditor} />
                            </Form.Item>




                            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                Create
                            </Button>
                        </Form>


                    </PaymentModal>
                </div>

                <Row>
                    {paymentMethods?.map((p, i) => {
                        return <>
                            <Col xs={24} sm={12} md={12} lg={12} xl={8} className='col px-2'>
                                <div className="payment_card">
                                    <div className='flex justify-between items-center mb-4'>
                                        <h3 className='text-[1.2rem] font-bold'>{p.Title}</h3>
                                        <div className='flex gap-4'>
                                            <Switch
                                                checkedChildren={<CheckOutlined />}
                                                unCheckedChildren={<CloseOutlined />}
                                                // defaultChecked
                                                // onClick(()=>{

                                                // })
                                                checked={p.status == "active" ? true : false}
                                                // checked={swS}
                                                onChange={() => handleSwitch(p._id, p.status)}
                                            />
                                            <Popconfirm
                                                title="Delete the Payment"
                                                description="Are you sure to delete this Payment?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteOutlined className='text-[1rem] text-red-600 cursor-pointer' />
                                            </Popconfirm>
                                        </div>
                                    </div>

                                    <div className='mb-4'>
                                        <h4 className='text-[1rem] font-bold mb-1'>Payment Type</h4>
                                        <p>{p.payment_type}</p>
                                    </div>

                                    <div className='mb-4'>
                                        <h4 className='text-[1rem] font-bold'>Acount Detail </h4>
                                        <p>{p.Account_Details}</p>
                                    </div>

                                    <div>

                                        {console.log('dddd', data)}

                                        <PaymentModal
                                            btnText={"Edit"}
                                            title={"Edit"}
                                            customClasses="w-full"
                                            onOpen={() => handleOpenModal(p._id)}
                                        >
                                            <Form
                                                form={form}
                                                name="basic"
                                                layout='horizontal'
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                style={{ maxWidth: "100%" }}
                                                initialValues={{
                                                    Title: data.Title,
                                                    payment_type: data.payment_type,
                                                    Account_Details: data.Account_Details,
                                                }}
                                                onFinish={paymentMethodUpdate}
                                                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                                                autoComplete="off"
                                            >
                                                <Form.Item
                                                    label="Name"
                                                    name="Title"
                                                    rules={[{ required: true, message: 'Please input your payment method name!' }]}
                                                >
                                                    <Input
                                                        type='text'
                                                        placeholder='Enter Payment Method'
                                                    />
                                                </Form.Item>

                                                <Form.Item label="Payment Type" name="payment_type">
                                                    <Select>
                                                        <Select.Option value={"COD"}>Cash On Delivery</Select.Option>
                                                        <Select.Option value={"Digital-Wallet"}>Digital Wallet</Select.Option>
                                                        <Select.Option value={"Direct-Bank-Transfer"}>Bank Transfer</Select.Option>
                                                        <Select.Option value={"Payment-Gateway"}>Payment Gateway</Select.Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item
                                                    label="Account Details"
                                                    name="Account_Details"
                                                    rules={[{ required: true, message: 'Please input the account details!' }]}
                                                >
                                                    <RichTextEditor value={form.getFieldValue('Account_Details')} handleTextEditor={handleTextEditor} />
                                                </Form.Item>

                                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                                    Update
                                                </Button>
                                            </Form>
                                        </PaymentModal>

                                    </div>
                                </div>
                            </Col>
                        </>
                    })}



                    {/* <Col xs={24} sm={12} md={12} lg={12} xl={8} className='col px-2'>
                        <div className="payment_card">
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className='text-[1.2rem] font-bold'>Easypaisa</h3>
                                <div className='flex gap-4 relative'>
                                    <Switch
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                        defaultChecked
                                    />
                                    <Popconfirm
                                        title="Delete the Payment"
                                        description="Are you sure to delete this Payment?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined className='text-[1rem] text-red-600 cursor-pointer' />
                                    </Popconfirm>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <h4 className='text-[1rem] font-bold mb-1'>Payment Type</h4>
                                <p>Digital Wallet</p>
                            </div>

                            <div className='mb-4'>
                                <h4 className='text-[1rem] font-bold'>Description</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis cupiditate, facere delectus sint pariatur ab illo suscipit consequatur cumque hic adipisci iure autem quasi ullam ex molestias dignissimos nam. Provident!</p>
                            </div>

                            <div>
                                <PaymentModal btnText={"Update"} title={"Update Payment"} customClasses="w-full" variation_id={id} getVriationOption={getVriationOption}>

                                    <Form
                                        name="basic"
                                        layout='horizontal'
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        style={{ maxWidth: "100%" }}
                                        initialValues={{ remember: true }}
                                        onFinish={VariationOption}
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
                                                placeholder='Enter Payment Method'
                                                className='form_input'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </Form.Item>

                                        <Form.Item label="Payment Type" name="payment_type">
                                            <Select
                                                defaultValue={false}
                                            // value={formData.stock_management}
                                            // onChange={(value) => setFormData({ ...formData, stock_management: value })}
                                            >
                                                <Select.Option value={true}>Cash On Delivery</Select.Option>
                                                <Select.Option value={true}>Digital Wallet</Select.Option>
                                                <Select.Option value={true}>Bank Transfer</Select.Option>
                                                <Select.Option value={true}>Payment Gateway</Select.Option>
                                            </Select>
                                        </Form.Item>


                                        <Form.Item label="Description" name="description">
                                            <RichTextEditor />
                                        </Form.Item>

                                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                            Update
                                        </Button>
                                    </Form>


                                </PaymentModal>
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </section>
        </>
    )
}

export default PaymentMethods

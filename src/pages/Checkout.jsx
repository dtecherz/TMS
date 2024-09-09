import React, { useEffect, useState } from 'react'
import { Col, Collapse, Flex, Image, Radio, Row, Select, Space } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd';
import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb'
import My_Button from '../components/Button';


import cart_image from "../assets/shop-img-2.jpg"
import { useCart } from '../ContextAPI/Components/CartContext';
import { addSubscriber, GetPaymentMethods, GetShippingMethod, orderPlace, placeOrder } from '../ContextAPI/APIs/api';
import { File_URL } from '../config';
import { Alert } from '../ContextAPI/Components/notify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../ContextAPI/Components/auth';
import { Cookies, useCookies } from 'react-cookie';
import formatter from '../helpers/formatter';


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Checkout() {
    const { user } = useAuth()
    const { carts, getUserCartsData, Total, subTotal } = useCart()
    const [cookies, setCookie, removeCookie] = useCookies(['pk2']);
    console.log('carts', carts)

    const [subscriberCheck, setSubscriberCheck] = useState(false)
    console.log("userrr", user, user != null)
    console.log('user', user?.role !== "guest" ? user?.email : "")
    const navigate = useNavigate()
    const [paymentMethodData, setPaymentMethodData] = useState([])
    const [paymentMethods, setPaymentMethods] = useState([])
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [shippingMethods, setShipingMethods] = useState([])
    const [shippingCharges, setShippingCharges] = useState(0)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        // email: "",
        email: "",
        address: "",
        city: "",
        postal_code: "",
        region: "",
        state: "",
        invoice_recipt: "",
        Biling_addres_select: false,
        billing_region: null,
        billing_address: null,
        billing_city: null,
        billing_postal_code: null,
        billing_phone: null,
        payment_method: "",
        shiping_method: "",

    })
    console.log('aaaa', shippingMethods)
    const handleCheckboxChange = (e) => {
        setFormData({ subscriberCheck: e.target.checked });
        if (e.target.checked) {
            subscriberAdd(); // Call your API function when checkbox is checked
        }
    };

    // const handleEmailChange = (e) => {
    //     setFormData({ ...formData, email: e.target.value });
    // };

    // get shipping methods 
    console.log('selectedMethod', shippingCharges)
    const shippingMethodsData = async () => {
        try {
            const resonse = await GetShippingMethod()
            if (resonse.success) setShipingMethods(resonse.shippingMethods)
            setFormData({ ...formData, shiping_method: resonse?.shippingMethods[0]?._id })
            console.log(resonse?.shippingMethods[0]?._id, "sssssssssssssssss")
            if (formData.shiping_method != undefined || formData.shiping_method != "" || formData.shiping_method != null) {
                const selectedMethod = resonse?.shippingMethods?.find(
                    (e) => e._id === resonse?.shippingMethods[0]?._id)
                console.log('selectedMethodddd', selectedMethod)
                if (selectedMethod)
                    setShippingCharges(selectedMethod?.charges)

            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }



    // const OrderPlace = async () => {
    //     const token = cookies?.pk2


    //     try {

    //         const thisForm = new FormData()
    //         thisForm.append("images", formData.invoice_recipt)
    //         thisForm.append("first_name", formData.first_name)
    //         thisForm.append("last_name", formData.last_name)
    //         thisForm.append("email", formData.email)
    //         thisForm.append("phone", formData.phone)
    //         thisForm.append("address", formData.address)
    //         thisForm.append("city", formData.city)
    //         thisForm.append("postal_code", formData.postal_code)
    //         thisForm.append("region", formData.region)
    //         thisForm.append("state", formData.state)
    //         thisForm.append("billing_address", formData.billing_address)
    //         thisForm.append("billing_city", formData.billing_city)
    //         thisForm.append("billing_phone", formData.billing_phone)
    //         thisForm.append("billing_postal_code", formData.billing_postal_code)
    //         thisForm.append("Biling_addres_select", formData.Biling_addres_select)
    //         thisForm.append("payment_method", formData.payment_method)
    //         thisForm.append("shiping_method", formData.shiping_method)

    //         if (token) {

    //             console.log('thisss',thisForm)
    //             const response = await placeOrder(thisForm)
    //             if (response.success) navigate('/thankyou')
    //             return Alert(response.message, response.success)
    //         } else {
    //             console.log('thisss',thisForm)
    //             const response = await orderPlace(thisForm)
    //             if (response.success) navigate('/thankyou')
    //             return Alert(response.message, response.success)
    //         }



    //     } catch (error) {
    //         console.log(error)
    //         Alert(error.message, false)
    //     }


    // }

    const OrderPlace = async () => {
        const token = cookies?.pk2;

        try {
            const thisForm = new FormData();

            thisForm.append("images", formData.invoice_recipt);
            thisForm.append("first_name", formData.first_name);
            thisForm.append("last_name", formData.last_name);
            thisForm.append("email", formData.email);
            thisForm.append("phone", formData.phone);
            thisForm.append("address", formData.address);
            thisForm.append("city", formData.city);
            thisForm.append("postal_code", formData.postal_code);
            thisForm.append("region", formData.region);
            thisForm.append("state", formData.state);
            thisForm.append("billing_address", formData.billing_address);
            thisForm.append("billing_city", formData.billing_city);
            thisForm.append("billing_phone", formData.billing_phone);
            thisForm.append("billing_postal_code", formData.billing_postal_code);
            thisForm.append("Biling_addres_select", formData.Biling_addres_select ? "true" : "false");
            thisForm.append("payment_method", formData.payment_method);
            thisForm.append("shiping_method", formData.shiping_method);


            let response;

            console.log("token", token);

            if (token) {
                response = await placeOrder(thisForm);

            } else {
                console.log("runnnn");
                console.log("runnnn", thisForm);
                thisForm.append("sub_total", subTotal);
                console.log('cttt', carts)
                // Append cartItems as a JSON string
                thisForm.append("cartItems", JSON.stringify(carts));
                response = await orderPlace(thisForm);

                console.log("Response:", response); // Log the response to inspect it
            }
            const guestEmail = localStorage.setItem('email', JSON.stringify(formData.email))
            localStorage.removeItem('cart')
            if (response.success) navigate('/thankyou');
            else Alert(response.message, response.success);

        } catch (error) {
            console.log("Error:", error); // Log any errors encountered
            Alert(error.message, false);
        }
    };



    const subscriberAdd = async () => {
        try {
            const response = await addSubscriber({ email: formData.email })
            if (response.success) return Alert(response.message, response.success)
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [value, setValue] = useState(1);
    const [paymentValue, setPaymentValue] = useState(0)

    const onChangeShippingMethod = (e) => {

        setFormData({
            ...formData,

            shiping_method: e.target.value,
        });
        const selectedMethod = shippingMethods.find((s) => s._id === e.target.value)
        if (selectedMethod) {
            setShippingCharges(selectedMethod.charges)
        }
    };

    const onPaymentMethod = (e) => {

        setPaymentValue(e.target.value)
        console.log('ee', e.target.value)
    }
    const onChange = (e) => {
        setValue(e.target.value);
        console.log('eee', e.target.value)
        // setFormData({
        //     ...formData,

        //     shiping_method: e.target.value,
        // });
        // const selectedMethod = shippingMethods.find((s)=>s._id === e.target.value )
        // if(selectedMethod){
        //     setShippingCharges(selectedMethod.charges)
        // }


        if (e.target.value === 5) {
            setFormData({
                ...formData,
                Biling_addres_select: true
            });
        }
        if (e.target.value === 4) {
            setFormData({
                ...formData,
                Biling_addres_select: false
            });
        }
    };
    const [paymentMethod, setPaymentMethod] = useState("");


    const getpaymentmethods = async () => {
        try {
            const response = await GetPaymentMethods()
            setPaymentMethods(response.paymentMethods)
           // Set default payment method
        if (response.paymentMethods.length > 0) {
            setPaymentMethod(response.paymentMethods[0]);
            console.log(">>>>>>>>>>>>>>>>>>>>>MMMMMMMMMMMMMMMMMMMMMMMMMMM",paymentMethod)
          
        }
        
            setPaymentMethodData(response.paymentMethodDetails.filter(e => e.status == "active"))

        } catch (error) {
            console.log(error)
            Alert(reponse.message, false)
        }
    }   
    useEffect(() => {
        if (paymentMethod && paymentMethod === "COD") {
            const CODPaymentMethod = paymentMethodData.find(method => method.payment_type === "COD");
    
            if (CODPaymentMethod) {
                setFormData((prevData) => ({
                    ...prevData,
                    payment_method: CODPaymentMethod._id
                }));
            }
        } else if (paymentMethod) {
            // If paymentMethod is not "COD", you can also set the payment method ID accordingly.
            setFormData((prevData) => ({
                ...prevData,
                payment_method: paymentMethod._id
            }));
        }
    }, [paymentMethod, paymentMethodData]);

    const onChangePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
        console.log('radiochecked', e.target.value);
        if (e.target.value === "COD") {
            const CODPaymentMethod = paymentMethodData.find(method => method.payment_type === "COD");
            setFormData({ ...formData, payment_method: CODPaymentMethod._id })
            console.log("CODPaymentMethod", CODPaymentMethod)
        }
    };


    const handleFileUpload = (e, id) => {
        const file = e.target.files[0];
    
        if (file) {
            // Combine all updates into one setFormData call
            setFormData((prevData) => ({
                ...prevData,
                invoice_recipt: file,
                payment_method: id
            }));
            
            // Update payment value as well
            setPaymentValue(id);
    
            console.log("File uploaded: ", file);
            console.log("Payment method selected: ", id);
        } else {
            console.log("No file selected");
        }
    };



    const DigtalWalletsData = paymentMethodData
        .filter((e) => e.payment_type === "Digital-Wallet")
        .map((p, i) => ({
            key: i,
            label: (
                <div>
                    <Radio.Group onChange={onPaymentMethod} value={paymentValue} className='radio_group'>
                        {/* <Radio.Group onChange={onChange} value={value} className='radio_group'> */}
                        <Space direction="vertical">
                            <Radio value={p._id} onClick={() => { setFormData({ ...formData, payment_method: p._id }) }} >{p.Title}</Radio>
                        </Space>
                    </Radio.Group>

                    <input
                        type="file"
                        placeholder="images"
                        name="images"
                        className="form_input"
                        // onChange={(e) => {
                        //     setFormData({ ...formData, invoice_recipt: e.target.files[0] });
                        //     // Auto-select the payment method when a file is uploaded
                        //     if (paymentValue !== p._id) {
                        //         setPaymentValue(p._id);
                        //         setFormData({ ...formData, payment_method: p._id });
                        //     }
                        // }}
                        onChange={(e)=>handleFileUpload(e,p._id)}
                    />
                </div>
            ),
            children: (
                <div>
                    <pre>{p.Account_Details}</pre>
                </div>
            ),
        }));

    const DirectBankTransfer = paymentMethodData
        .filter((e) => e.payment_type === "Direct-Bank-Transfer")
        .map((p, i) => ({
            key: i,
            label: (
                <div>
                    <Radio.Group onChange={onChange} value={value} className='radio_group'>
                        <Space direction="vertical">
                            <Radio value={p._id} onClick={() => { setFormData({ ...formData, payment_method: p._id }) }}>{p.Title}</Radio>
                        </Space>
                    </Radio.Group>
                    {console.log('iiiii', formData.invoice_recipt)}
                    <input
                        type="file"
                        placeholder="images"
                        name="images"
                        className="form_input"
                        onChange={(e)=>handleFileUpload(e,p._id)}
                    />

                </div>
            ),
            children: (
                <div>
                    <pre>{p.Account_Details}</pre>
                </div>
            ),
        }));

    console.log(DigtalWalletsData, DirectBankTransfer); // Verify data structure


    const stopPropagationClick = (e) => {
        e.stopPropagation();
    };

    const payment = [
        {
            key: '1',
            label: <div>
                <Radio.Group onChange={onChange} value={value} className='radio_group'>
                    <Space direction="vertical">
                        <Radio value={1} onClick={stopPropagationClick}>HBL</Radio>
                    </Space>
                </Radio.Group>
            </div>,
            children: <div>
                <p>HBL</p>
                <p>Send screenshot of receipt after payment</p>
                <p>Bank Name: Habib Bank Limited</p>
                <p>Account no: 01197992026103</p>
                <p>Account Title : (Qainaat Shoukat)</p>
                <p>IBAN : PK78HABB0001197992026103</p>
                <p>Beneficiary : Qainaat AA</p>
                <p>You will have to Jazz-Cash /Easy-Paisa/Bank Transfer us the total amount. As soon as we receive the payment, we will start working on your product and deliver it to you within 2 weeks.</p>
            </div>,
        },
        {
            key: '2',
            label: <div>
                <Radio.Group onChange={onChange} value={value} className='radio_group'>
                    <Space direction="vertical">
                        <Radio value={2} onClick={stopPropagationClick}>Jazzcash</Radio>
                    </Space>
                </Radio.Group>
            </div>,
            children: <div>
                <p>Account Number : 03254534247</p>
                <p>Account Title : Kainat Shaukat</p>
            </div>,
        },
        {
            key: '3',
            label: <div>
                <Radio.Group onChange={onChange} value={value} className='radio_group'>
                    <Space direction="vertical">
                        <Radio value={3} onClick={stopPropagationClick}>Easypaisa</Radio>
                    </Space>
                </Radio.Group>
            </div>,
            children: <div>
                <p>Account Number : 03189409976</p>
                <p>Account Title : Kainat Shaukat</p>
            </div>,
        },
    ];

    const billing_address_1 = [
        {
            key: '1',
            label: (
                <div>
                    <Radio.Group onChange={onChange} value={value} className='radio_group'>
                        <Space direction="vertical">
                            <Radio value={4}>Same as shipping address</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            ),
            children: "",
        },
    ];

    const billing_address_2 = [
        {
            key: '1',
            label:
                <Radio.Group onChange={onChange} value={value} className='radio_group'>
                    <Space direction="vertical">
                        <Radio value={5} onClick={stopPropagationClick}>
                            Use a different billing address
                        </Radio>
                    </Space>
                </Radio.Group>
            ,
            children: <div>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                            label=""
                            name="country"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select your country!',
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a country / region"
                                allowClear
                                className='form_select'
                                value={formData.billing_region} onChange={(value) => setFormData({ ...formData, billing_region: value })}
                            >
                                <Option value="pakistan">Pakistan</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className='md:pr-2'>
                        <Form.Item
                            label=""
                            name="firstname"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your first name!',
                                },
                            ]}
                        >
                            <Input placeholder='First Name (optional)' className='form_input' value={formData.name} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label=""
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input placeholder='Last Name' className='form_input' value={formData.last_name} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                            label=""
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                        >
                            <Input placeholder='Address' className='form_input' value={Form.billing_address} onChange={(e) => setFormData({ ...formData, billing_address: e.target.value })} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                            label=""
                            name="apartment"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your apartment!',
                                },
                            ]}
                        >
                            <Input placeholder='Apartment, suite, etc. (optional)' className='form_input' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className='md:pr-2'>
                        <Form.Item
                            label=""
                            name="city"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your city!',
                                },
                            ]}
                        >
                            <Input placeholder='City' className='form_input' value={Form.billing_city} onChange={(e) => setFormData({ ...formData, billing_city: e.target.value })} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label=""
                            name="postalcode"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your postalcode!',
                                },
                            ]}
                        >
                            <Input placeholder='Postal code (optional)' className='form_input' value={Form.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item
                            label=""
                            name="phone"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            <Input placeholder='Phone (optional)' className='form_input' value={Form.billing_phone} onChange={(e) => setFormData({ ...formData, billing_phone: e.target.value })} />
                        </Form.Item>
                    </Col>
                </Row>
            </div>,
        },
    ];




   

    console.log('payyyy', paymentMethodData)
    const getCartData = async () => {
        const res = await getUserCartsData()

        if (res?.length === 0) {
            return navigate('/')
        }
        // if(!user || user === null){
        //         return navigate('/403')

        // }

    }


    useEffect(() => {
        getpaymentmethods()
        getCartData()
    }, [])
    useEffect(() => {
        shippingMethodsData()

    }, [])



    return (
        <>
            <section>

                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Checkout" />


                <div className="container">

                    <div className="checkout_area">

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                <div className='py-14 pr-14 max-[1200px]:pr-0'>
                                    <Form
                                        name="basic"
                                        layout='vertical'
                                        labelCol={{
                                            span: 24,
                                        }}
                                        wrapperCol={{
                                            span: 24,
                                        }}
                                        style={{
                                            maxWidth: "100%",
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={OrderPlace}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >

                                        <div className='hide'>
                                            <p>Express checkout</p>

                                            <div className='flex gap-3 justify-center my-3 max-[450px]:flex-wrap'>
                                                <button className='btn_pay w-full bg-blue-700 text-white'>Shop Pay</button>
                                                <button className='btn_pay w-full bg-yellow-400'>Pay Pal</button>
                                                <button className='btn_pay w-full bg-black text-white'>G Pay</button>
                                            </div>

                                            <div className='checkout_seperator'>
                                                <p>OR</p>
                                            </div>
                                        </div>

                                        <div className='mt-8'>
                                            <h3>Contact</h3>
                                            {
                                                user == null &&
                                                <Form.Item
                                                    label=""
                                                    name="email"
                                                    rules={[{ required: true, message: 'Please input your email!', },]}
                                                    className='form_item'
                                                >


                                                    {console.log(formData.email, "bbbb")}

                                                    <Input type='email' placeholder='Email' className='form_input' value={formData?.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                                    {/* <p className='note'>Make sure that email is correct!!</p> */}


                                                </Form.Item>
                                            }


                                            {/* <Form.Item
                                                name="remember"
                                                valuePropName="unchecked"
                                                wrapperCol={{ offset: 0, span: 24 }}
                                                className='form_item'
                                            >
                                                <Checkbox onChange={handleCheckboxChange} >Email me the latest deals!</Checkbox>
                                            </Form.Item> */}
                                        </div>


                                        <div className='mt-8'>
                                            <h3>Delivery</h3>

                                            <Row>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item
                                                        label=""
                                                        name="country"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please select your country!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            placeholder="Select a country / region"
                                                            allowClear
                                                            className='form_select'
                                                            value={formData.region} onChange={(value) => setFormData({ ...formData, region: value })}
                                                        >
                                                            <Option value="pakistan">Pakistan</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} className='md:pr-2'>
                                                    <Form.Item
                                                        label=""
                                                        name="firstname"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your first name!',
                                                            },
                                                        ]}
                                                    >
                                                        {console.log('ff', formData.first_name)}
                                                        <Input placeholder='First Name' className='form_input' value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                    <Form.Item
                                                        label=""
                                                        name="lastname"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your last name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Last Name' className='form_input' value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item
                                                        label=""
                                                        name="company"
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please input your company!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Company (optional)' className='form_input' />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item
                                                        label=""
                                                        name="address"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your address!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Address' className='form_input' value={Form.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item
                                                        label=""
                                                        name="apartment"
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please input your apartment!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Apartment, suite, etc. (optional)' className='form_input' />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className='md:pr-2'>
                                                    <Form.Item
                                                        label=""
                                                        name="city"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your city!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='City' className='form_input' value={Form.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className='md:pr-2'>
                                                    <Form.Item
                                                        label=""
                                                        name="state"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your state!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='State' className='form_input' value={Form.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                                                    </Form.Item>
                                                </Col>
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                    <Form.Item
                                                        label=""
                                                        name="zipcode"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your zipcode!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='ZIP code' className='form_input' value={Form.postal_code} onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })} />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item
                                                        label=""
                                                        name="phone"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your phone!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder='Phone' className='form_input' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className='mt-8'>
                                            <h3>Shipping method</h3>

                                            <Flex align='center' gap={200}>

                                                <div style={{ width: "100%" }}>
                                                    {console.log('shppingMethod', shippingMethods)}
                                                    {console.log('shpping', formData.shiping_method)}
                                                    {shippingMethods?.map((s, i) => {

                                                        return <Radio.Group onChange={onChangeShippingMethod} value={formData.shiping_method} className='radio_group mb-4'>
                                                            <Space direction="vertical">
                                                                <Radio value={s._id}>{s.name}</Radio>

                                                            </Space>
                                                        </Radio.Group>
                                                    })}

                                                    {/* <Collapse accordion ghost items={items} className='hide' /> */}
                                                </div>
                                            </Flex>

                                            <Form.Item
                                                label=""
                                                // name="shippingaddress"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'Please input your shipping address!',
                                                    },
                                                ]}
                                                className='form_item hide'
                                            >
                                                <Input type='text' placeholder='Enter your shipping address to view available shipping methods.' className='form_input' />
                                            </Form.Item>
                                        </div>

                                        <div className='mt-8'>

                                            <h3>Payment Method</h3>
                                            {console.log('paymentMethods', paymentMethods)}
                                            <Radio.Group onChange={onChangePaymentMethod} value={paymentMethod} className='radio_group'>
                                                {
                                                    paymentMethods.length > 0 && paymentMethods?.map((e, i) => {
                                                        return <Space key={i} direction="vertical">
                                                            <Radio value={e}>{e}</Radio>
                                                        </Space>
                                                    })
                                                }
                                            </Radio.Group>
                                        </div>


                                        {/* Conditional rendering based on paymentMethod */}
                                        {(paymentMethod === "COD" || paymentMethod === "") ?
                                            <></>

                                            :

                                            <div className='mt-8'>
                                                <h3>Payment</h3>
                                                {paymentMethod === "Digital-Wallet" ? (
                                                    <Collapse items={DigtalWalletsData} defaultActiveKey={['1']} />
                                                ) : paymentMethod === "Direct-Bank-Transfer" ? (
                                                    <Collapse items={DirectBankTransfer} defaultActiveKey={['1']} />
                                                ) : (
                                                    <div>No payment method selected.</div>
                                                )}
                                            </div>
                                        }

                                        <div className='mt-8'>

                                            <h3>Billing address</h3>

                                            <Collapse collapsible='disabled' items={billing_address_1} />
                                            <Collapse collapsible={"header"} items={billing_address_2} />
                                        </div>


                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                            className='mt-12'
                                        >

                                            <My_Button text={"Place Order"} htmlType="submit" />

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>


                            <Col xs={24} sm={24} md={24} lg={24} xl={12} className='checkout_product_desc_col'>
                                <div className='checkout_product_desc pt-14 pb-14 pl-14 max-[1200px]:pl-0 max-[1200px]:pt-0'>

                                    <h3>Order Summary</h3>
                                    {
                                        carts.map((e, i) => {
                                            const imageUrls = e.product_id.images.map(image => image.image_url)
                                            return <div className='flex items-center justify-between mb-4'>

                                                <div className='flex items-center'>
                                                    <div className='relative'>
                                                        <Image src={`${File_URL}/${imageUrls[0]}`} alt="product image" className='cart_image' />
                                                        <div className="product_qty absolute -top-1 -right-2 bg-[#973e12] rounded-xl w-6 h-6 flex items-center justify-center">
                                                            <p className='!text-white'>{e.quantity}</p>
                                                        </div>
                                                    </div>

                                                    <div className='ml-4'>
                                                        <p>{e.product_id.name || "Organic Raw"}</p>
                                                        {/* <small>16oz</small> */}
                                                    </div>
                                                </div>

                                                <p>${formatter.format(e.singleItemPrice)}</p>
                                            </div>
                                        })

                                    }

                                    <div className='flex items-center justify-between my-4'>
                                        <p>Subtotal</p>
                                        <p>{formatter.format(subTotal)}</p>
                                    </div>
                                    <div className='flex items-center justify-between my-4'>
                                        <p>Delivery Charges</p>
                                        <p>${formatter.format(shippingCharges) || 0}</p>
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <p className='total'>Total</p>
                                        <p className='total_price'>${formatter.format(subTotal + shippingCharges)}</p>
                                    </div>
                                </div>
                            </Col>

                        </Row>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Checkout

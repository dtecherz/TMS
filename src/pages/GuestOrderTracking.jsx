import React from 'react'
import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'
import { Button, Form, Input } from 'antd'

function GuestOrderTracking() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <section>
                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Guest Tracking ID" />

                <div className="container">
                    <div className="my_orders">
                        <div className="guest_tracking_card">
                            <Form
                                name="basic"
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
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Tracking ID"
                                    name="trackingID"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Tracking ID!',
                                        },
                                    ]}
                                >
                                    <Input type='text' placeholder='Tarcking ID' className='form_input' />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 0,
                                        span: 24,
                                    }}
                                    className='mb-0'
                                >
                                    <button className='btn w-full search_btn' type="primary" htmlType="submit">
                                        Search
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>

                <Footer />
            </section>
        </>
    )
}

export default GuestOrderTracking

import { Button, Checkbox, Form, Input, Rate } from 'antd'
import React from 'react'
import My_Button from '../Button';

function Reviews({ data = [] }) {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 24, }}
                wrapperCol={{ span: 24, }}
                style={{ maxWidth: "100%", marginTop: "10px" }}
                initialValues={{ remember: true, }}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {
                    data.length > 0 ||
                    <>
                        <h2>These are dummy reviews</h2>
                        <Form.Item
                            className='form_item'
                            label="Your rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <Rate allowHalf defaultValue={0} className='rating_star' />
                        </Form.Item>

                        <Form.Item
                            className='form_item'
                            label="Your review"
                            name="review"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your review!',
                                },
                            ]}
                        >
                            <Input.TextArea className='form_input' rows={10} />
                        </Form.Item>

                        <Form.Item
                            className='form_item'
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input className='form_input' />
                        </Form.Item>

                        <Form.Item
                            className='form_item'
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input type='email' className='form_input' />
                        </Form.Item>

                        <Form.Item
                            className='form_item'
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Checkbox>Save my name, email, and website in this browser for the next time I comment.</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            {/* <Button type="primary" htmlType="submit">
                        Submit
                    </Button> */}

                            <My_Button text={"Submit"} htmlType="submit" />

                        </Form.Item>
                    </>
                }
            </Form>
        </>
    )
}

export default Reviews

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Checkbox, Flex, Form, Input, Layout } from 'antd'
import { signin } from '../ContextAPI/APIs/api';
import { useAuth } from '../ContextAPI/Components/auth';


function Signin() {
    const { Login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log("Email", email);
        console.log("Password", password);
        console.log('Success:', values);

        Login({ email, password })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



    return (
        <>
            <section className='signin_area'>

                <Layout className='main_layout'>
                    <Card className='authentication_card'>

                        <h2>Sign in</h2>

                        <Form
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 25,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email Address"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email address!',
                                    },
                                ]}
                            >
                                <Input type='email' placeholder='Enter here' className='form_input' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Enter here' className='form_input' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 0, span: 25, }}  >
                                <Flex gap="middle" align="center" justify='center' vertical>
                                    <Button type="primary" htmlType="submit" className='submit_btn'>Sign In</Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Card>
                </Layout>

            </section>
        </>
    )
}

export default Signin

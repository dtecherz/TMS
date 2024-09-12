import { Checkbox, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import My_Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../ContextAPI/Components/notify';
import { useAuth } from '../ContextAPI/Components/auth';

function Signin() {

    const navigate = useNavigate()
    const { Login, GetLoginUSer, user } = useAuth();

    const [formData, setFormData] = useState({

        email: "",
        password: "",
        guestUserId: ""

    });


    useEffect(() => {
        if (user != undefined) {
            console.log("ffffffffffffff", user);
            setFormData({ ...formData, guestUserId: user?.id })

        }
    }, [user])

    const handleSubmit = async () => {
        const updatedFormData = { ...formData, guestUserId: user?._id || "" };
        setFormData(updatedFormData);
        Login(updatedFormData);
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <section className='authentication_area'>
                <div className="container">
                    <div className="login_card">

                        <h2>Sign In</h2>

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
                            onFinish={handleSubmit}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label=""
                                name="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input className='form_input' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                label=""
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password className='form_input' placeholder='Password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 0,
                                    span: 24,
                                }}
                                className='hide'
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <My_Button text={"Sign in"} htmlType="submit" customClass="login_btn" />
                        </Form>

                        <small>New Here? &nbsp; <Link to="/sign-up" className='Link'> Create your Account </Link></small>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Signin

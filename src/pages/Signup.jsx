import { Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react'
import My_Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../ContextAPI/Components/notify';
import { signUp } from '../ContextAPI/APIs/api';

function Signup() {

    const navigate = useNavigate()


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        confirmPassword:"",
    });

    const handleSubmit = async ()=>{
        console.log('thisss')
       
        try {
            if(formData.password !== formData.confirmPassword) return Alert("password must be matched",false)
                const response = await signUp(formData)
            if(response.success){
                Alert(response.message,response.success)
                return navigate('/sign-in')
            }
        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
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

                        <h2>Create Account</h2>

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
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input className='form_input' placeholder='Name' value={formData.name}   onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
                            </Form.Item>

                            <Form.Item
                                label=""
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input className='form_input' placeholder='Email' value={formData.email}  onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
                            </Form.Item>

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
                                <Input type='number' className='form_input' placeholder='Phone'  value={formData.phone } onChange={(e)=>setFormData({...formData,phone:e.target.value})} />
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
                                <Input.Password className='form_input' placeholder='Password'  value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} />
                            </Form.Item>

                            <Form.Item
                                label=""
                                name="c_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your confirm password!',
                                    },
                                ]}
                            >
                                <Input.Password className='form_input' placeholder='Confirm Password'  value={formData.confirmPassword} onChange={(e)=>setFormData({...formData,confirmPassword:e.target.value})} />
                            </Form.Item>

                            <My_Button text={"Create"} htmlType="submit" customClass="login_btn" />
                        </Form>

                        <small>Already have an account? &nbsp; <Link to="/sign-in" className='Link'> Sign In </Link></small>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup

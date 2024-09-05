import { Button, Card, Flex, Form, Input } from 'antd'
import React from 'react'



function General() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>

            <Card className=''>

                <h3>API keys</h3>

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
                        label="Key"
                        name="password"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" className='refresh_btn'>
                            Refresh Keys
                        </Button>
                    </Form.Item>
                </Form>

            </Card>

        </>
    )
}


export default General
import React, { useEffect, useRef, useState } from 'react';
import Navbar_2 from '../components/Navbar_2';
import Footer from '../components/Footer';
import { Form, Input, Table } from 'antd';
import { getGuestUserOrders, getOrders } from '../ContextAPI/APIs/api';
import { Alert } from '../ContextAPI/Components/notify';
import { Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import BreadCrumb from '../components/BreadCrumb';
import { useCookies } from 'react-cookie';
import My_Button from '../components/Button';

const MyOrders = () => {

    // const [email,setEmail] = useState("")
    const emailRef = useRef()

    const [myOrders, setMyOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [cookies, setCookie, removeCookie] = useCookies(['pk2']);
    let Localemail = JSON.parse(localStorage.getItem('email'))


    const dataSource = myOrders.map((data, i) => {
        return {
            id: i + page * 5,
            name: data.first_name,
            email: data.email,
            amount: data.total,
            status: data.Order_status,
            date: data.createdAt,
            detail: <Link to={`/order-tracking/${data._id}`} className='btn-detail'>Detail</Link>,
        };
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
        },
    ];

    const getUserOrders = async () => {
        const token = cookies.pk2

        try {
            let response;
            if (token) {

                response = await getOrders(page + 1);
            } else {
                console.log('lllllll',Localemail)
                if(Localemail ){
                    emailRef.current = Localemail
                }

                // console.log('emailll',email)
                response = await getGuestUserOrders((page + 1), emailRef.current);

            }
            console.log('pageeee', page)
            setMyOrders(response.orders);
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };

    const handlePrevious = () => {
        if (page > 1) setPage(prevPage => prevPage - 1);
    };

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        getUserOrders();
    }, [page]);

    return (
        <>

            <section>
                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="My Orders" />

                <div className="container">
                    {
                        !Localemail ?
                    <div className="login_card">

                        <h2>Find Your Orders By Email</h2>

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
                            onFinish={getUserOrders}
                            // onFinishFailed={onFinishFailed}
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
                                <Input className='form_input' placeholder='Email' value={emailRef} onChange={(e) => emailRef.current = e.target.value} />
                            </Form.Item>

                            

                            

                            <My_Button text={"Find"} htmlType="submit" customClass="login_btn" />
                        </Form>


                    </div>
                    :
                    <></>

                            }
                    <div className="my_orders">

                        <Table dataSource={dataSource} columns={columns} pagination={true} scroll={{ x: 'max-content' }} className='table' />

                        {/* <div className='paginate'>
                        <LeftOutlined onClick={handlePrevious} className='paginate-icon' />
                        <p>{page + 1}</p>
                        <RightOutlined onClick={handleNext} className='paginate-icon' />
                    </div> */}

                    </div>

                </div>

                <Footer />

            </section>
        </>
    );
};

export default MyOrders;

import {  Button, Dropdown, Menu, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '../../ContextAPI/APIs/api';
    import {HolderOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { Alert } from '../../ContextAPI/Components/notify';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState("");
    const [orderLimitperPage, setOrderLimitPerPage] = useState("");
    const [page, setPage] = useState(1);

    
    const GetAllOrdersData = async () => {
        console.log('123445555555555555')
        try {
            const response = await getAllOrders(page);
            setOrders(response.orders);
            setOrderLimitPerPage(response.OrdersLimitPerPage);
            setTotalOrders(response.totalOrders);
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };
    
    const orderStatusUpdate = async (id, Order_status) => {
        console.log('id',id,'status',Order_status)
        const body = { Order_status: Order_status };
        try {
            const response = await updateOrderStatus(id, body);
            if (response.success)
                { 
                    Alert(response.message, response.success);
            GetAllOrdersData()
        }
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };


    useEffect(() => {
        GetAllOrdersData();
    }, [page]);

    const onChange = (page) => {
        setPage(page);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'City', dataIndex: 'city', key: 'city' },
        { title: 'Total', dataIndex: 'total', key: 'total' },
        { title: 'Shipping Method', dataIndex: 'shipping_method', key: 'shipping_method' },
        {
            title: 'Order Status', key: 'order_status', dataIndex: 'order_status',
            render: (_, { order_status }) => (
                <>
                    {order_status.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') color = 'volcano';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        { title: 'Action', key: 'action', dataIndex: 'action' },
        { title: 'Detail', key: 'detail', dataIndex: 'detail' },
    ];

    const data = orders?.map((o, i) => {
        return {
            key: i + 1,
            name: o.first_name,
            email: o.email,
            phone: o.phone,
            city: o.city,
            total: o.total,
            order_status: [o.Order_status],
            action: (
                <Dropdown
                    overlay={(
                        <Menu>
                            <Menu.Item key="order-placed" disabled={o.Order_status === 'order-placed'} >
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to pending?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'order-placed')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Order Placed
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="accepted"   disabled={o.Order_status === 'accepted'}>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to processing?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'processing')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Accepted
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="dispatch"   disabled={o.Order_status === 'dispatch'}>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to dispatch?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'dispatch')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Dispatch
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="delivered"   disabled={o.Order_status === 'delivered'}>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to delivered?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'delivered')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Delivered
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="completed"  disabled={o.Order_status === 'completed'}>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to completed?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'completed')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Completed
                                </Popconfirm>
                            </Menu.Item>

                            <Menu.Item key="rejected"  disabled={o.Order_status === 'rejected'}>
                                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to set the status to rejected?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => orderStatusUpdate(o._id, 'rejected')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Rejected
                                </Popconfirm>
                            </Menu.Item>
                            <Menu.Item key="cancelled"  disabled={o.Order_status === 'cancelled'}>
                                <Popconfirm
                                    title="Cancel the order"
                                    description="Are you sure you want to cancel this order?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}

                                    onConfirm={() => orderStatusUpdate(o._id, 'cancelled')}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Cancelled
                                </Popconfirm>
                            </Menu.Item>
                        </Menu>
                    )}
                    trigger={['click']}
                >
                    <Button icon={<HolderOutlined />} />
                </Dropdown>
            ),
            detail: <Link to={`/order-tracking/${o.order_id}`}> Order Details</Link>
        };
    });

    return (
        <section className='addresses_area'>
            <h2>Orders</h2>
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ x: 'max-content' }}
                pagination={{
                    current: page,
                    pageSize: orderLimitperPage,
                    total: totalOrders,
                    onChange: onChange,
                }}
            />
        </section>
    );
};

export default Orders;
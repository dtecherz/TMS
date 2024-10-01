import React, { useEffect, useState } from 'react';
import { getCollections } from '../../ContextAPI/APIs/api';
import { Button, Table, Tag, Popconfirm } from 'antd';
import { HolderOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CollectionList = () => {
    const [collection, setCollections] = useState([]);

    const CollectionsData = async () => {
        try {
            const response = await getCollections();
            setCollections(response.collections); // Correct the property name
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Products',
            dataIndex: 'products',
            key: 'products',
            render: (products) => products ? products.length : '---', // Show the number of products
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color = status === 'inactive' ? 'volcano' : 'green'; // Based on status
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'View',
            dataIndex: 'edit',
            key: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        }
    ];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format date as needed
    };

    const catgoryDelete = async (id) => {
        // Your delete logic here
    };

    const data = collection?.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,
            products: e.products ? e.products : "---", // Display the products field
            status: e.status,
            createdAt: formatDate(e.createdAt),
            edit: <Link to={`/edit-collection/${e.slug}`}><button className='detail_btn'>View</button></Link>,
            delete: (
                <Button type="primary" danger ghost>
                    <Popconfirm
                        title="Delete the collection"
                        description="Are you sure you want to delete this Category?"
                        icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                        onConfirm={() => catgoryDelete(e._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        Delete
                    </Popconfirm>
                </Button>
            ),
        };
    });

    useEffect(() => {
        CollectionsData();
    }, []);

    return (
        <>
            <section className='addresses_area'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0rem" }}>Collection List</h2>
                    <Link to={"/create-collection"}>
                        <button className='create_btn'>Create</button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} />
            </section>
        </>
    );
};

export default CollectionList;

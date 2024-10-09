import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../ContextAPI/Components/notify';
import { deleteCategory, GetCategories } from '../../ContextAPI/APIs/api';
import formatDate from '../../helpers/dateFormater';
import { Link } from 'react-router-dom';
import {HolderOutlined,QuestionCircleOutlined} from '@ant-design/icons'


function CategoryList() {



    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {
        try {
            const response = await GetCategories()
            if (response.success) {
                setCategories(response.categories)
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }


    const catgoryDelete = async (id)=>{
        try {
            const response = await deleteCategory(id)
            if(response.success) 
                 Alert(response.message,response.success)
           return  getAllCategories()
        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Parent Category',
            dataIndex: 'parentcategory',
            key: 'parentcategory',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'inactive') {
                            color = 'volcano';
                        }
                        else {
                            color = 'green';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '#Product',
            dataIndex: 'pcount',
            key: 'pcount',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
        }
    ];



    const data = categories.map((e, i) => {
        return {
            key: i + 1,
            name: e.category_name,
            parentcategory: e.parent_category_id ? e.parent_category_id.category_name : "---",
            status: [e.status],
            createdAt: formatDate(e.createdAt),
            pcount:e.pCount ,
            edit:<Link to={`/edit-category/${e._id}`}><button className='detail_btn'>Edit</button></Link>,
            delete: <Button  type="primary"  danger ghost>
            <Popconfirm
                                title="Update the order status"
                                description="Are you sure you want to delete this Category?"
                                icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                onConfirm={() => catgoryDelete(e._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                Delete
                            </Popconfirm>
        </Button>,

            
        }
    })

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <>
            <section className='addresses_area'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0rem" }}>Category List</h2>
                    <Link to={"/create-category"}>
                        <button className='create_btn'>Create</button>
                    </Link>
                </div>

                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} pagination={true} />
            </section>
        </>
    )
}

export default CategoryList

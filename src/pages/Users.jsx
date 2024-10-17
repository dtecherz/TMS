import { Pagination, Space, Table, Tag } from 'antd';
import Alert from 'antd/es/alert/Alert';
import Password from 'antd/es/input/Password';
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../ContextAPI/APIs/api';
import formatDate from '../helpers/dateFormater';

function Users() {



    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0);
    const [userLimitPerPage, setUserLimitPerPage] = useState(10); // Default to 10 per page
    const getUsers = async () => {
        
        try {
            console.log("arga h")
            const response = await getAllUsers(page)
            if (response.success) {
                setUserLimitPerPage(response.UsersPerPage)
                setUsers(response.result)
                setTotalUsers(response.totalUsers)
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    const columns = [
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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
        },
    ];

    const data = users?.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,
            email: e.email,
            phone: e.phone,
            createdat: formatDate(e.createdAt),
        }
    })

    const onChange = (page) => {
        console.log("page", page)
        setPage(page);
    };

    useEffect(() => {
        getUsers()
    }, [page])


    return (
        <>
            <section className='addresses_area users'>
                <h2>Users</h2>

                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }}
                    pagination={{
                        current: page,
                        pageSize: userLimitPerPage,
                        total: totalUsers,
                        onChange: onChange,
                    }}

                />

            </section>
        </>
    )
}

export default Users

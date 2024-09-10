import { Button, Popconfirm, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { deleteShippingMethod, GetCategories, GetShippingMethod } from '../../ContextAPI/APIs/api'
import { Link } from 'react-router-dom'
import formatDate from '../../helpers/dateFormater'
import {HolderOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import { Alert } from '../../ContextAPI/Components/notify'


const ShippingMethods = () => {


  const [ shippingMethods,setShippingMethods] = useState([])
  const getAllShippingMethods = async () => {
    try {
      const response = await GetShippingMethod()
      if (response.success) {
        setShippingMethods(response.shippingMethods)
      }
    } catch (error) {
      console.log(error)
      Alert(error.message, false)
    }
  }


  // deleet shipping method 

  const shippingMethodDelete = async (id) =>{
    try {
      const response = await deleteShippingMethod(id)
      if(response.success) Alert(response.message,response.success)
        getAllShippingMethods()
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
      title: 'Charges',
      dataIndex: 'charges',
      key: 'charges',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status?.map((tag) => {
            let color = tag?.length > 5 ? 'geekblue' : 'green';
            if (tag === 'inactive') {
              color = 'volcano';
            }
            else {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title:"Edit",
      dataIndex:"edit",
      key:"edit"
    },
    {
      title:"Delete",
      dataIndex:"delete",
      key:"delete"
    }
   
   
  ];



  const data = shippingMethods.map((e, i) => {
    return {
      key: i + 1,
      name: e.name,
      charges: e.charges ,
      status: [e.status],
      edit:<Link to={`/edit-shipping-method/${e._id}`}><button className='detail_btn'>Edit</button></Link>,
      delete: <Button  type="primary"  danger ghost>
            <Popconfirm
                                title="Update the order status"
                                description="Are you sure you want to delete this Category?"
                                icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                onConfirm={() => shippingMethodDelete(e._id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                Delete
                            </Popconfirm>
        </Button>,
    
     

    }
  })

  useEffect(() => {
    getAllShippingMethods()
  }, [])


  return (
    <>
      <section className='addresses_area'>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "0rem" }}>Shipping Methods List</h2>
          <Link to={"/add-shipping-method"}>


            <button className='create_btn'>Add Shipping Method</button>
          </Link>
        </div>

        <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} pagination={true} />
      </section>
    </>
  )
}

export default ShippingMethods

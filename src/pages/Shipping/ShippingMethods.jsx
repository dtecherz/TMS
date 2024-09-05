import { Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { GetCategories, GetShippingMethod } from '../../ContextAPI/APIs/api'
import { Link } from 'react-router-dom'
import formatDate from '../../helpers/dateFormater'

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
   
   
  ];



  const data = shippingMethods.map((e, i) => {
    return {
      key: i + 1,
      name: e.name,
      charges: e.charges ,
      status: [e.status],
    
     

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

import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { deleteProduct, getProducts } from '../../ContextAPI/APIs/api';
import {HolderOutlined,QuestionCircleOutlined} from '@ant-design/icons'
import { Alert } from '../../ContextAPI/Components/notify';

function ProductList() {
    const location = useLocation();
    const { category } = useParams();
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [productLimitPerPage, setProductLimitPerPage] = useState(10); // Default to 10 per page

    const GetProducts = async () => {
        const res = await getProducts(location.search, page);
        if (res.success) {
            setProducts(res.products);
            setTotalProducts(res.totalProducts);
            setProductLimitPerPage(res.ProductLimitPerPage);
        }
    };


    const productDelete = async (id) =>{
        console.log('idddd',id)
        try {
            const response = await deleteProduct(id)
            if(response.success)  Alert(response.message,response.success)
                GetProducts()

        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
    }

    useEffect(() => {
        GetProducts();
    }, [location.search, page]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Stock Management',
            dataIndex: 'stockManagement',
            key: 'stockManagement',
        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalQty',
            key: 'totalQty',
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
        },
    ];

    const data = products.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,
            category: e.category_id?.category_name,
            price: e.price,
            stockManagement: e.stock_management ? "Yes" : "No",
            totalQty: e.total_quantity,
            edit: <Link to={`/product-detail/${e._id}`} className=''><button className='detail_btn'>Edit</button></Link>,
            delete: <Button  type="primary"  danger ghost>
                <Popconfirm
                                    title="Update the order status"
                                    description="Are you sure you want to delete this product?"
                                    icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
                                    onConfirm={() => productDelete(e._id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Delete
                                </Popconfirm>
            </Button>,
        };
    });

    const onChange = (page) => {
        console.log("page", page)
        setPage(page);
    };

    return (
        <>
            <section className='addresses_area'>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                    <h2 style={{ marginBottom: "0rem" }}>Product List</h2>
                    <Link to={"/create-product"}>
                        <button className='create_btn'>Create</button>
                    </Link>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: page,
                        pageSize: productLimitPerPage,
                        total: totalProducts,
                        onChange: onChange,
                    }}
                />
            </section>
        </>
    );
}

export default ProductList;

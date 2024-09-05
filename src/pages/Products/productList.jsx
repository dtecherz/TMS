import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProducts } from '../../ContextAPI/APIs/api';

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
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
        },
    ];

    const data = products.map((e, i) => {
        return {
            key: i + 1,
            name: e.name,
            category: e.category_id.category_name,
            price: e.price,
            stockManagement: e.stock_management ? "Yes" : "No",
            totalQty: e.total_quantity,
            detail: <Link to={`/product-detail/${e._id}`} className=''><button className='detail_btn'>Detail</button></Link>,
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

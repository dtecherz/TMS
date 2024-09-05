import { Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../ContextAPI/Components/notify';
import { getProductVariations } from '../../ContextAPI/APIs/api';

function ProductVariationList() {


    const [page, setPage] = useState(1)
    const [productVariations, setProductVariations] = useState([])
    const [totalProducts, setTotalProducts] = useState(0);
    const [productLimitPerPage, setProductLimitPerPage] = useState(10); // Default to 10 per page

    
    const productVariationsData = async () => {
        try {
            const response = await getProductVariations(page)
            if (response.success) {
                setProductVariations(response.productVariants)
                setTotalProducts(response.totalProducts);
                setProductLimitPerPage(response.ProductLimitPerPage);
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productID',
            key: 'productID',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Material',
            dataIndex: 'material',
            key: 'material',
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stockQty',
            key: 'stockQty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    const data = productVariations.map((e, i) => {
        return {
            key: i + 1,
            productID: i + 1,
            size: e.size.name,
            color: e.color.name,
            material: e.material ? e.material.name : "null",
            stockQty: e.stock_quantity,
            price: e.price,
        }
    })


    useEffect(() => {
        productVariationsData()
    }, [page])


    const onChange = (page) => {
        console.log("page",page)
        setPage(page);
    };

    return (
        <>
            <section className='addresses_area'>
                <h2>Product Variation List</h2>

                <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }}
                
                pagination={{
                    current: page,
                    pageSize: productLimitPerPage,
                    total: totalProducts,
                    onChange: onChange,
                }}

                />
            </section>
        </>
    )
}

export default ProductVariationList

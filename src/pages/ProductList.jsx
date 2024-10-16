import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Image, Row, Select, Space } from 'antd'

import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb';
import My_Button from '../components/Button';
import Footer from '../components/Footer';

import product_1 from "../assets/shop-img-2.jpg"
import Filter from '../components/Filter';
import FilterSidebar from '../components/FilterSidebar';

import { useMediaQuery } from 'react-responsive';

import ProductCard from '../components/ProductCard';
import Product_Pagination from '../components/Pagination';
import { getProducts } from '../ContextAPI/APIs/api';



function ProductList() {

    const items = [
        {
            key: '1',
            label: 'Item 1',
        },
        {
            key: '2',
            label: 'Item 2',
        },
        {
            key: '3',
            label: 'Item 3',
        },
    ];

    const location = useLocation();
    const { category } = useParams();
    const [totalProducts, setTotalProducts] = useState("")
    const [page, setPage] = useState("")
    const [products, setProducts] = useState([])
    const [productLimitPerPage, setProductLImitPerPage] = useState()
    const [sortOrder, setSortOrder] = useState(1);
    console.log('order', sortOrder)
    const GetProducts = async () => {
        console.log("locationnn",location.search)
        let res 
        if(location.search){
            console.log("11111111111111111111")
            res= await getProducts(location.search, 1,sortOrder)
        }
        else{
            
            console.log("22222222222222222")
           res =await getProducts(location.search, page,sortOrder)
        } 
        if (res.success) setProducts(res.products)
        setTotalProducts(res.totalProducts)
        setProductLImitPerPage(res.ProductLimitPerPage)
    }


    useEffect(() => {
        GetProducts();
    }, [location.search, page, sortOrder]);

    console.log('pppp', products)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })




    return (
        <>
            <section>

                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Product List" />

                <div className="container">
                    <div className="products_area">

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={19} xl={19}>
                                <Row>

                                    <Col xs={24} sm={24} md={24} lg={21} xl={21}>
                                        <div className='min-[576px]:flex justify-between items-center mb-6'>

                                            <div className='mb-4 min-[576px]:mb-0'>
                                                {
                                                    isTabletOrMobile ?
                                                        <FilterSidebar />
                                                        :
                                                        // <p>Showing 1–12 of 73 results</p>
                                                        <></>
                                                }
                                            </div>

                                            <Select
                                                defaultValue="sort"
                                                style={{ width: 310 }}
                                                options={[
                                                    { value: 'sort', label: 'Sort', disabled: true },
                                                    { value: '1', label: 'Low to High' },
                                                    { value: '-1', label: 'High to Low' },
                                                    // { value: 'most-viewed', label: 'Most Viewed' },
                                                ]}
                                                onChange={(value) => setSortOrder(value)}
                                            />
                                        </div>
                                    </Col>


                                    {
                                        products.map((item, i) => {
                                            return <Col key={i} xs={24} sm={12} md={12} lg={7} xl={7}> <ProductCard data={item} /> </Col>
                                        })
                                    }


                                </Row>
                            </Col>


                            {
                                !isTabletOrMobile &&
                                <Col xs={24} sm={24} md={24} lg={5} xl={5}>
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Filter />
                                        </Col>
                                    </Row>
                                </Col>
                            }

                        </Row>
                    </div>
                </div>
                <Product_Pagination total={totalProducts} active={page} setPage={setPage} pagLimit={productLimitPerPage} />
            </section>


            <Footer />
        </>
    )
}


export default ProductList
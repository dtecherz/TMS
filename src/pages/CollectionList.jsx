import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneColection } from '../ContextAPI/APIs/api'
import { Alert } from '../ContextAPI/Components/notify'
import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard'
import { Col, Row } from 'antd'

const CollectionList = () => {


    const { slug } = useParams()
    const [collectionProduct, setCollectionProduct] = useState([])


    const getActiveColllectionsProduct = async () => {
        try {
            const response = await getOneColection(slug)
            if (response.success) {
                setCollectionProduct(response.collection.products)
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)

        }
    }

    console.log('collectionProduct',collectionProduct)

    useEffect(() => {
        getActiveColllectionsProduct()
    }, [slug])
    return (
        <>
            <section>


                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Collection Product List" />

                <div className="container">
                    <div className="products_area">
                    <Row>
                        {
                            collectionProduct.map((item, i) => {
                                return <Col key={i} xs={24} sm={12} md={12} lg={6} xl={6}> <ProductCard data={item} /> </Col>
                            })
                        }
                    </Row>

                    </div>
                </div>
            </section>
        </>
    )
}

export default CollectionList

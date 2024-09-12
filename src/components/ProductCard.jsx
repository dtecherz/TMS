import React from 'react'
import { Card, Image } from 'antd'
import My_Button from './Button'

import product_1 from "../assets/shop-img-2.jpg"
import { Link } from 'react-router-dom'
import formatter from '../helpers/formatter'
import { handleImageError } from '../helpers/imgHandler'
import { File_URL } from '../config'


function ProductCard({ data }) {
    // console.log('dataaa',data?.images)

    return (
        <>
            <Link to={`/product/${data?.slug}`}>
                <Card className='product_card h-full' >
                    <Image alt="example" src={`${File_URL}/${data?.images[0]?.image_url}` || product_1} preview={false} onError={handleImageError} className='product_image' />
                    <h4 className='product_name'>{data?.name || "Europe Street beat"}</h4>
                    <p className='product_desc'>{data?.category_id?.category_name || "Organic food"}</p>
                    <p className='product_price'>{formatter.format(data?.price || 11.99)}</p>

                    <div className='add_to_cart_btn'>
                        <My_Button text={"Add To Cart"} />
                    </div>
                </Card>
            </Link>
        </>
    )
}

export default ProductCard

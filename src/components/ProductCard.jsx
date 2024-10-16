import React from 'react'
import { Card, Image } from 'antd'
import My_Button from './Button'

import product_1 from "../assets/shop-img-2.jpg"
import { Link } from 'react-router-dom'
import formatter, { formatterWithoutSymbol } from '../helpers/formatter'
import { handleImageError } from '../helpers/imgHandler'
import { File_URL } from '../config'


function ProductCard({ data }) {

    // Define the truncateDescription function
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };
    // console.log('dataaa',data?.images)

    return (
        <>
            <Link to={`/product/${data?.slug}`}>
                <Card className='product_card h-full' >
                    <Image alt="example" src={`${File_URL}/${data?.images[0]?.image_url}` || product_1} preview={false} onError={handleImageError} className='product_image' />
                    <h4 className='product_name'>{truncateDescription(data?.name,12)}</h4>
                    <p className='product_desc'>{data?.category_id?.category_name }</p>
                    {
                        (data.discount == 0 || !data.discount || data.discount == undefined) ?
                            <></>
                            :
                            <p className='product_desc'>Discount: {data?.discount}%</p>
                    }
                    {
                        (!data.discount || data.discount == 0 || data.discount === undefined) ?
                            <p className='product_price'>{formatter.format(data.price || 0)}</p>
                            :
                            <p className='product_price'>
                                <s>{formatter.format(data.price || 0)}</s>
                                &nbsp; {formatterWithoutSymbol.format(data.price - ((data.discount / 100) * data.price) || 0)}
                            </p>
                    }

                    {/* <p className='product_price'>{formatter.format(data?.price || 11.99)}</p> */}

                    <div className='add_to_cart_btn'>
                        <My_Button text={"View"} />
                    </div>
                </Card>
            </Link>
        </>
    )
}

export default ProductCard

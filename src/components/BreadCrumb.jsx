import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

function BreadCrumb(props) {

    const items = [
        {
            title: <Link to={"/"}>Home</Link>,
        },
        {
            title: props.pageTitle,
        },
    ]

    return (
        <>
            <div className='page_breadcrumb'>
                <div className="container">
                    <div className='md:flex justify-between items-center'>
                        <h2 className='page_title'>{props.pageTitle}</h2>

                        <Breadcrumb
                            separator=">"
                            items={items}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default BreadCrumb

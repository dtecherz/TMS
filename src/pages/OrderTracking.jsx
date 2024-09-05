import React, { useEffect, useState } from 'react'
import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb'
import Footer from '../components/Footer'
import { Alert } from '../ContextAPI/Components/notify'
import { getOrderWithProducts, updateOrderStatus } from '../ContextAPI/APIs/api'
import { useParams } from 'react-router-dom'
import { File_URL } from '../config'
import { Image } from 'antd'
import { handleImageError } from '../helpers/imgHandler'
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import formatter from '../helpers/formatter'

function OrderTracking() {

    const [orderDetail, setOrderDetail] = useState([])
    const [order_total, setOrder_Total] = useState("")
    const [Order_status, setOrder_statue] = useState("")
    const [orderId,setOrderId] = useState("")
    const { id } = useParams()

    const orderDetailsWithProduct = async () => {
        try {
            const response = await getOrderWithProducts(id)
            console.log('res', response)
            if (response.success) {
                setOrderDetail(response.orderDetail)
                setOrder_Total(response.orderInfo.total)
                setOrder_statue(response.orderInfo.Order_status)
                setOrderId(response.orderDetail[0]?.order_id?.order_id)
            }
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    // update order status 

    const orderStatusUpdate = async (id, Order_status) => {

        const body = {
            Order_status: Order_status
        };
        try {
            const response = await updateOrderStatus(id, body);
            if (response.success) {
                Alert(response.message, response.success);
                orderDetailsWithProduct()
            } else {
                Alert("Failed to update order status", false);
            }
        } catch (error) {
            console.log(error);
            Alert(error.message, false);
        }
    };

    console.log('orderdetail', orderId)

    useEffect(() => {
        orderDetailsWithProduct()
    }, [])

    return (
        <>


            <Navbar_2 customClass={"py-6"} />
            <BreadCrumb pageTitle="Order Tracking" />


            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Track the delivery of order #{orderId || 0}</h2>

                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                            {orderDetail?.map((o, i) => {
                                return <div className="space-y-4 p-6" key={i}>
                                    <div className="flex items-center gap-6">
                                        <a href="#" className="h-14 w-14 shrink-0">
                                            {console.log('productidimage', o.product_id?.images[0])}
                                            {console.log('Product Config:', o.product_config_id)}
                                            <Image className="h-full w-full dark:hidde" src={`${File_URL}/${o.product_id?.images[0]?.image_url}`} alt="imac image" onError={handleImageError} />
                                        </a>

                                        <div className="aa flex justify-between w-full">

                                            <div>
                                                <a href="#" className=" flex-1 font-medium font-[Alegreya] text-gray-900 hover:text-[#a55e3f] dark:text-white">
                                                    {o?.product_id.short_description}
                                                </a>
                                                <div className="config" style={{ color: "white" }}>
                                                    {o.product_config_id?.color && (
                                                        <div className="config-item">
                                                            <span className="config-key">Color:</span>
                                                            <span className="config-value">{o.product_config_id.color.name}</span>
                                                        </div>
                                                    )}
                                                    {o.product_config_id?.size && (
                                                        <div className="config-item">
                                                            <span className="config-key">Size:</span>
                                                            <span className="config-value">{o.product_config_id.size.name}</span>
                                                        </div>
                                                    )}
                                                    {o.product_config_id?.material && (
                                                        <div className="config-item">
                                                            <span className="config-key">Material:</span>
                                                            <span className="config-value">{o.product_config_id.material.name}</span>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>

                                            <div className="flex items-center justify-end w-full gap-4">
                                                <p className="text-base font-normal text-gray-900 dark:text-white">x{o.quantity}</p>
                                                <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{formatter.format(o.price) || 0}</p>
                                            </div>


                                        </div>


                                    </div>


                                    <div className="flex items-center justify-between gap-4">

                                        {/* <p className="text-sm font-normal text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900 dark:text-white">Product ID:</span> {o?.product_id._id}</p> */}

                                        {/* <div className="flex items-center justify-end w-full gap-4">
                                            <p className="text-base font-normal text-gray-900 dark:text-white">x{o.quantity}</p>
                                            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">{formatter.format(o.price) || 0}</p>
                                        </div> */}
                                    </div>
                                </div>
                            })}


                            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
                                <div className="space-y-2">


                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-500 dark:text-gray-400">Shipping  Charges</dt>
                                        <dd className="font-medium text-gray-900 dark:text-white">200</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-[23px] font-bold text-[#a55e3f] font-[Alegreya] dark:text-white">Total</dt>
                                    <dd className="text-[23px] font-bold text-[#a55e3f] font-[Alegreya] dark:text-white">{formatter.format(order_total) || 0}</dd>
                                </dl>
                            </div>
                        </div>

                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                        </span>
                                        <h4 className="!mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Estimated delivery in 24 Nov 2023</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
                                    </li>

                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                            </svg>
                                        </span>
                                        <h4 className="!mb-0.5 text-base font-semibold text-gray-900 dark:text-white">Today</h4>
                                        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products being delivered</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#dbeafe] ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-[#a55e3f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="!mb-0.5 font-semibold">23 Nov 2023, 15:15</h4>
                                        <p className="text-sm">Products in the courier's warehouse</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#dbeafe] ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-[#a55e3f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="!mb-0.5 text-base font-semibold">22 Nov 2023, 12:27</h4>
                                        <p className="text-sm">Products delivered to the courier - DHL Express</p>
                                    </li>

                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#dbeafe] ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-[#a55e3f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="!mb-0.5 font-semibold">19 Nov 2023, 10:47</h4>
                                        <p className="text-sm">Payment accepted - VISA Credit Card</p>
                                    </li>

                                    <li className="ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#dbeafe] ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-[#a55e3f]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h4 className="!mb-0.5 font-semibold">19 Nov 2023, 10:45</h4>
                                            <a href="#" className="text-sm font-medium hover:underline">Order placed - Receipt #647563</a>
                                        </div>
                                    </li>
                                </ol>

                                <div className="gap-4 sm:flex sm:items-center ">
                                    {console.log('orderstatus', Order_status)}
                                    {Order_status === "pending" ? (
                                        <Popconfirm
                                            className='pop_up'
                                            title="Cancel the order"
                                            description="Are you sure you want to cancel this order?"
                                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                            onConfirm={() => orderStatusUpdate(id, "cancelled")}
                                            okText="Yes"
                                            cancelText="No"

                                        >
                                            <button
                                                type="button"
                                                className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                            >
                                                Cancel the order
                                            </button>
                                        </Popconfirm>
                                    ) : (
                                        <button
                                            type="button"
                                            className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                            disabled block
                                        >
                                            {Order_status}
                                        </button>
                                    )}
                                    ;


                                    {/* <a href="#" className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium bg-blue-900 text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default OrderTracking

import React, { useEffect, useState } from 'react'
import Navbar_2 from '../components/Navbar_2'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom';
import { Button, Collapse, Flex, Form, Image, Input, Radio, Select, Space, Table, Tag } from 'antd';
import { CloseOutlined } from "@ant-design/icons"
import Quantity_Counter from '../components/Quantity_Counter';

import cart_image from "../assets/shop-img-2.jpg"
import My_Button from '../components/Button';
import Footer from '../components/Footer';
import { useCart } from '../ContextAPI/Components/CartContext';
import { File_URL } from '../config';
import { Alert } from '../ContextAPI/Components/notify';
import { addToCart, DeleteCartItem } from '../ContextAPI/APIs/api';
import formatter, { formatterWithoutSymbol } from '../helpers/formatter';
import { handleImageError } from '../helpers/imgHandler';
import { Cookies, useCookies } from 'react-cookie';

const { Option } = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function Cart() {
    const [cookies] = useCookies(['pk2'])

    const { carts, getUserCartsData, setCarts, subTotal, Total } = useCart()


    console.log("cartsss", carts)


    const updateQuantity = async (product_id, product_config_id, qty, index) => {
        try {

            const token = cookies.pk2
            if (token) {
                const body = {
                    product_id: product_id,
                    product_config_id: product_config_id || null,
                    quantity: qty
                }

                const response = await addToCart(product_id, body)
                if (response.success) {
                    // Update cart state after successful API call
                    const updatedCarts = [...carts]
                    console.log('upppp', updatedCarts[index])
                    updatedCarts[index].quantity += qty

                    setCarts(updatedCarts)
                    getUserCartsData()
                    return Alert(response.message, response.success)
                }
            }

            else {
                // **Guest User: Update Cart via localStorage**
                const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
                console.log("storedCart----", storedCart);
                console.log("carts----", carts);
                // return
                const cartItemIndex = storedCart.findIndex(
                    (item) =>
                    // console.log('ity',item)
                    (item.product_id === product_id &&
                        (item.product_config_id || null) === (product_config_id || null))
                );
                console.log('storedCart', product_config_id)
                const findSortedCartItem = storedCart.find((item) => {
                    // console.log('yyyyyyyyyyyyy',product_config_id,product_id,item)
                    console.log('yyyyyyyyyyyyy', item.product_id === product_id && item.product_config_id === product_config_id)
                    return item.product_id === product_id && item.product_config_id === product_config_id

                })
                console.log('findSortedCartItem', findSortedCartItem)
                const findCartItem = carts.find((item) => {
                    console.log('yyyyyyyyyy11', findSortedCartItem.product_id, item.product_id?._id, item.product_id.stock_management)
                    console.log('yyyyyyyyyy11', item.product_config_id?._id, findSortedCartItem?.product_config_id)
                    console.log('yyyyyyyyyyyyy', item.product_id?._id === findSortedCartItem?.product_id && item.product_config_id?._id === findSortedCartItem.product_config_id)

                    return item.product_id?._id === findSortedCartItem.product_id && (item.product_config_id?._id || null === findSortedCartItem.product_config_id || null)
                })
                console.log('findSortedCartItemid', findSortedCartItem?.product_config_id)
                let newQty
                if (findSortedCartItem.product_config_id === null && findCartItem.product_id.stock_management) {
                    console.log('mmmm',findCartItem.product_config_id?._id || null)
                    console.log("matched",findSortedCartItem?.product_id == findCartItem.product_id?._id, (findSortedCartItem?.product_config_id  ? findSortedCartItem?.product_config_id : null )=== (findCartItem.product_config_id ? findCartItem.product_config_id?._id  : null))
                    
                        newQty= findSortedCartItem.quantity + qty
                        console.log('newqty',newQty)
                        if (newQty > findCartItem.product_id.total_quantity) {
                            console.log("greater");
                            return Alert(`This product is out of stock only ${findCartItem.product_id.total_quantity} are left`,false)

                        }

                    
                }
                if(findSortedCartItem.product_config_id !== null && findCartItem.product_id.stock_management){
                  
                        newQty= findSortedCartItem.quantity + qty
                        if(newQty > findCartItem.product_config_id.stock_quantity){
                            return Alert(`This variant of product is out of stock only ${findCartItem.product_config_id.stock_quantity} are left`,false)
                        }
                    
                }

                

                    
                    if (cartItemIndex !== -1) {
                        console.log('-111111111111')
                    // Item exists in cart, update quantity
                    storedCart[cartItemIndex].quantity += qty;

                    // Ensure quantity doesn't drop below 1
                    if (storedCart[cartItemIndex].quantity < 1) {
                        storedCart[cartItemIndex].quantity = 1;
                    }

                    // Save updated cart to localStorage
                    localStorage.setItem('cart', JSON.stringify(storedCart));
                    
                    // Update context/state
                    // setCarts(storedCart);
                    getUserCartsData();
                    Alert("Cart updated successfully.", true);
                } else {
                    // Item does not exist in cart, optionally add it
                    Alert("Item not found in cart.", false);
                }
            
            }
        } catch (error) {
            console.log('bodyyyyyyyyyyyyyyyyyyyyy')
            console.log(error)
            Alert(error.message, false)
        }

    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const invalidToast = () => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        return Alert("Invalid Coupen", false)
    }

    const columns = [
        {
            title: '',
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => <CloseOutlined className='dlt_icon' onClick={(e) => deleteItemsOfCart(record.cartItemId)} />,
        },
        {
            title: '',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <Image src={`${File_URL}/${img}`} alt={img} className='cart_image' onError={handleImageError} />,
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (text) => <Link to={"/product"}>{text}</Link>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
        },
    ];


    // delete cart items 

    const deleteItemsOfCart = async (cartItemId) => {
        try {

            console.log('cartItemId', cartItemId)
            const token = cookies.pk2
            if (token) {

                // const confirmation = window.location.confirm("are yu ure you want to remove")
                const response = await DeleteCartItem({ cartItemId: cartItemId })
                if (response.success) {
                    Alert(response.message, response.success);
                    getUserCartsData()

                    // Update cart state after successful deletion
                    const updatedCarts = carts.filter(cart => cart._id !== cartItemId);
                    setCarts(updatedCarts);
                }
            } else {
                // **Guest User: Remove Cart Item from LocalStorage**
                const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
                const updatedCart = carts.filter(item => item._id !== cartItemId);

                // Update localStorage with the modified cart
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log('mmmmmmmmmmmmmm', updatedCart)
                Alert("Item removed successfully", true);

                // Refresh the cart display after deletion
                getUserCartsData();
                setCarts(updatedCart);
            }

        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    console.log('cttttrrrrrr', carts)
    const data = carts.map((e, i) => {
        console.log('ttttttttttttttt', typeof e.subTotalPrice)
        const imageUrls = e.product_id?.images?.map(image => image.image_url);
        return {
            key: i,
            cartItemId: e._id,
            image: imageUrls[0],
            product: (
                <div>
                    <Link to={`/product/${e.product_id.slug}`}>{e.product_id.name}</Link>
                    <div className="config">
                        {e.product_config_id?.color && (
                            <div className="config-item">
                                <span className="config-key text-black">Color:</span>
                                <span className="config-value">{e.product_config_id.color.name}</span>
                            </div>
                        )}
                        {e.product_config_id?.size && (
                            <div className="config-item ">
                                <span className="config-key text-black">Size:</span>
                                <span className="config-value">{e.product_config_id.size.name}</span>
                            </div>
                        )}
                        {e.product_config_id?.material && (
                            <div className="config-item">
                                <span className="config-key text-black">Material:</span>
                                <span className="config-value">{e.product_config_id.material.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            ),
            price: (
                (!e.product_id.discount || e.product_id.discount === 0 || e.product_id.discount === undefined) ?
                    <p className='price'>
                        {formatter.format(e.product_id.price + (e.product_config_id ? e.product_config_id.price : 0))}
                    </p>
                    :
                    <p className='price'>
                        {/* <s>{formatter.format(e.product_id.price + (e.product_config_id ? e.product_config_id.price : 0))}</s>
                        &nbsp;  */}
                        {formatter.format((e.product_id.price - ((e.product_id.discount / 100) * e.product_id.price) + (e.product_config_id ? (e.product_config_id.price - ((e.product_id.discount / 100) * e.product_config_id.price)) : 0)) || 0)}
                    </p>
            ),

            // price: formatter.format(e.product_id.price + (e.product_config_id ? e.product_config_id.price : 0)) || 0,
            quantity: <Quantity_Counter qty={e.quantity} updateQuantity={updateQuantity} product_id={e.product_id._id} product_config_id={e.product_config_id ? e.product_config_id._id : null} index={i} />,
            subtotal: formatter.format(e.singleItemPrice ?? e.subTotalPrice ?? 0),

        }
    });


    const city = [1]

    const items = [
        {
            key: '1',
            label: 'Change address',
            children: <div>
                <Form
                    name="basic"
                    layout='vertical'
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: "100%",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        className='form_item'
                        label=""
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your country / region!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a country / region"
                            allowClear
                            className='form_select'
                        >
                            {
                                city.map((c, i) => {
                                    return <Option value="pakistan">Pakistan</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className='form_item'
                        label=""
                        name="state"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your state / county!',
                            },
                        ]}
                    >
                        <Input placeholder='State / County' className='form_input' />
                    </Form.Item>

                    <Form.Item
                        className='form_item'
                        label=""
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your city!',
                            },
                        ]}
                    >
                        <Input placeholder='City' className='form_input' />
                    </Form.Item>

                    <Form.Item
                        className='form_item'
                        label=""
                        name="postcode"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your postcode!',
                            },
                        ]}
                    >
                        <Input placeholder='Postcode / ZIP' className='form_input' />
                    </Form.Item>

                    <Form.Item
                        className='form_item'
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >

                        <My_Button text={"Update"} htmlType={"submit"} />

                    </Form.Item>
                </Form>

            </div>,
        },
    ];


    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    useEffect(() => {
        getUserCartsData()
    }, [])

    return (
        <>
            <section>

                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Cart" />


                <div className="container">

                    <div className="cart_area">


                        <Table columns={columns} dataSource={data} rowHoverable={false} scroll={{ x: 'max-content' }} pagination={false} className='table' />


                        <Flex justify='end' wrap="wrap" gap={20} style={{ marginTop: "3rem" }}>
                            <Form className='hide'>
                                <Flex gap={20} wrap="wrap">
                                    <Form.Item
                                        className='coupon_code_form_item'
                                        label=""
                                        name="coupon"
                                        layout='vertical'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your coupon code!',
                                            },
                                        ]}
                                    >
                                        <Input className='coupon_code_input' placeholder='Coupon Code' />
                                    </Form.Item>

                                    <My_Button text={"Apply Coupon"} htmlType={"submit"} invalidToast={invalidToast} />
                                </Flex>
                            </Form>

                            {/* <My_Button text={"Update Cart"} /> */}
                        </Flex>


                        <div className='cart_total'>
                            <h2>Cart Totals</h2>

                            <div className='cart_total_table'>
                                <Flex align='center' gap={200} className='cart_total_table_border hide'>
                                    <h4 className='text-9xl'>Subtotal</h4>

                                    <p>{formatter.format(subTotal) || 0}</p>
                                </Flex>
                                <Flex align='center' gap={200} className='cart_total_table_border hide'>
                                    <h4>Shippings</h4>

                                    <div style={{ width: "100%" }}>
                                        <Radio.Group onChange={onChange} value={value} className='radio_group mb-4'>
                                            <Space direction="vertical">
                                                <Radio value={1}>Flat rate</Radio>
                                                <Radio value={2}>Free shipping</Radio>
                                                <Radio value={3}>Local pickup</Radio>
                                            </Space>
                                        </Radio.Group>

                                        <p className='mb-4'>Shipping to <strong>Pakistan</strong></p>

                                        <Collapse accordion ghost items={items} />
                                    </div>
                                </Flex>
                                <Flex align='center' gap={245} className='cart_total_table_border'>
                                    <h4>Total</h4>
                                    <h6 className='total_price'>{formatter.format(isNaN(Total) ? 0 : Total)}</h6>
                                </Flex>
                            </div>

                            <div style={{ marginTop: "3rem" }}>
                                <Link to={"/checkout"}>
                                    <My_Button InvalidToast={invalidToast} text={"Proceed To Checkout"} customClass={"proceed_to_checkout_btn"} />
                                </Link>
                            </div>


                        </div>


                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default Cart

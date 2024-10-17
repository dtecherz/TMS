import React, { useEffect, useState } from 'react'
import { Card, Col, Flex, Image, Rate, Row, Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'
import Navbar_2 from '../components/Navbar_2'
import single_product from "../assets/single-product.jpg"
import My_Button from '../components/Button'
import Footer from '../components/Footer'
import Description from '../components/Product_Desc_Components/Description'
import Addtional_Info from '../components/Product_Desc_Components/Addtional_Info'
import Reviews from '../components/Product_Desc_Components/Reviews'

import product_1 from "../assets/shop-img-2.jpg"
import Quantity_Counter from '../components/Quantity_Counter'
import BreadCrumb from '../components/BreadCrumb'
import { Alert } from '../ContextAPI/Components/notify'
import { addToCart, getSingleProduct } from '../ContextAPI/APIs/api'
import { File_URL } from '../config'
import Colors from '../components/Colors'
import Sizes from '../components/Sizes'
import Material from '../components/Material'
import SingleProductSlider from '../components/SingleProductSlider'
import formatter, { formatterWithoutSymbol } from '../helpers/formatter'
import { handleImageError } from '../helpers/imgHandler'
import { useCart } from '../ContextAPI/Components/CartContext'
import { useCookies } from 'react-cookie'

function SingleProduct() {


    const { slug } = useParams()
    const [cookies] = useCookies(['pk2'])
    console.log('pppp', cookies.pk2)
    //   alert(cookies.pk2)
    const { getUserCartsData, carts } = useCart()
    const [selectedSize, setselectedSize] = useState('')
    const [selectedColor, setselectedColor] = useState('')

    const [selectedmaterial, setselectedMaterial] = useState('')
    const [matchingVariant, setMatchingVariant] = useState('')


    const [productData, setProductData] = useState({})
    const [productConfigId, setProductConfigId] = useState("")
    const [relatedProducts, setRelatedProducts] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [material, setMaterials] = useState([])
    const [price, setPrcie] = useState("")
    const [checkConfig,setCheckConfig] = useState(false)
    const [matchingConfigQty,setMatchingConfigQty] = useState({})
    const [formData, setFormData] = useState({
        product_id: "",
        product_config_id: "",
        quantity: 1
    })


    console.log('formdata', formData)
    const getSingleProductData = async () => {

        try {
            const response = await getSingleProduct(slug)
            if (response.success) setProductData(response.productData)
            setRelatedProducts(response.relatedProducts.slice(0, 4))
            setFormData({ ...formData, product_id: response.productData._id })
            if(response.productData.productConfig.length > 0 ){
                setCheckConfig(true)
            }
            console.log('ddddddddddddddddddddddddddddddddd',checkConfig)
            console.log('bbbbb',response.productData.productConfig.length > 0 ||  response.productData.productConfig !== null)
        } catch (error) {
            console.log(error)
            Alert(response.message, false)
        }
    }

    console.log('productData', productData)
    console.log('formddd', matchingConfigQty)

    // const addItemInCart = async () => {
    //     const token = cookies.pk2;
    //     if (token) {
    //         try {
    //             const response = await addToCart(formData.product_id, formData);
    //             if (response.success) {
    //                 getUserCartsData();
    //             }
    //             return Alert(response.message, response.success);
    //         } catch (error) {
    //             console.log(error);
    //             Alert(error.message, false);
    //         }
    //     } else {
    //         const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    //         let itemExists = false;

    //         let updatedCart = storedCart;
    //         console.log('fffffffff',formData)
    //         if (storedCart) {

    //             updatedCart = storedCart.map(item => {
    //                 console.log('itemssss',item)
    //                 // if(checkConfig && formData.product_config_id === null){
    //                 //     return Alert("this prouct has variant so you need to select one variant first",false)
    //                 // }
    //                 if (item?.product_id === formData.product_id && item?.product_config_id === formData.product_config_id) {
    //                     itemExists = true;
    //                     let checkQtyInLocal = item.quantity + formData.quantity
                        
    //                     if(item.product_config_id === null ){

                            
    //                         if(productData.stock_management && (productData.total_quantity <checkQtyInLocal)){
    //                             return Alert(`This product is out of stock only ${productData.total_quantity} are left`)
    //                         }
    //                     }else{
    //                         if(productData.stock_management && (matchingConfigQty <checkQtyInLocal)){
    //                             return Alert(`This product  variant is out of stock only ${matchingConfigQty} are left`)
    //                         }
    //                     }
    //                         console.log('items',items)
    //                     return {
    //                         ...item,
    //                         quantity: item.quantity + formData.quantity,
    //                     };
    //                 }
    //                 return item;
    //             });
    //         }

    //         if (!itemExists) {
    //             console.log('formddd', formData.quantity)
    //             if(checkConfig && formData.product_config_id === null){
    //                 return Alert("this prouct has variant so you need to select one variant first",false)
    //             }
    //             if(productData.stock_management  && formData.quantity > productData.total_quantity){
    //                 return Alert(`only ${productData.total_quantity} items are left`,false)
    //             }
    //             if(productData.stock_management  && (formData.quantity > matchingConfigQty.stock_quantity)){

    //                 return Alert(`This variant of product is out of stock only ${matchingConfigQty.stock_quantity} are left`,false)
    //             }
    //             else{

    //                 updatedCart.push(formData);
    //                 Alert("Item added to cart successfully");
    //             }
    //         } else {
    //             Alert("Item quantity updated successfully");
    //         }

    //         console.log('updddd', updatedCart)
    //         localStorage.setItem('cart', JSON.stringify(updatedCart));
    //         getUserCartsData()
    //     }
    // };

    const addItemInCart = async () => {
        const token = cookies.pk2;
        if (token) {
            try {
                const response = await addToCart(formData.product_id, formData);
                if (response.success) {
                    getUserCartsData();
                }
                return Alert(response.message, response.success);
            } catch (error) {
                console.log(error);
                Alert(error.message, false);
            }
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            let itemExists = false;
            let stockCheckFailed = false;
            let updatedCart = storedCart;
    
            if (storedCart) {
                updatedCart = storedCart.map(item => {
                    if (item?.product_id === formData.product_id && item?.product_config_id === formData.product_config_id) {
                        itemExists = true;
                        const checkQtyInLocal = item.quantity + formData.quantity;
    
                        if (item.product_config_id === null) {
                            if (productData.stock_management && checkQtyInLocal > productData.total_quantity) {
                                Alert(`This product is out of stock. Only ${productData.total_quantity} are left.`,false);
                                stockCheckFailed = true;
                                return item;
                            }
                        } else {
                            if (productData.stock_management && checkQtyInLocal > matchingConfigQty.stock_quantity) {
                                Alert(`This product variant is out of stock. Only ${matchingConfigQty.stock_quantity} are left.`,false);
                                stockCheckFailed = true;
                                return item;
                            }
                        }
    
                        return {
                            ...item,
                            quantity: checkQtyInLocal,
                        };
                    }
                    return item;
                });
            }
    
            if (stockCheckFailed) return;
    
            if (!itemExists) {
                if (checkConfig && formData.product_config_id === null) {
                    return Alert("Please select a variant for this product.", false);
                }
                if (productData.stock_management && formData.quantity > productData.total_quantity) {
                    return Alert(`Only ${productData.total_quantity} items are left in stock.`, false);
                }
                if (productData?.stock_management && formData.quantity > matchingConfigQty?.stock_quantity) {
                    return Alert(`This variant of product is out of stock. Only ${matchingConfigQty.stock_quantity} are left.`, false);
                }
    
                updatedCart.push(formData);
                Alert("Item added to cart successfully");
            } else {
                Alert("Item quantity updated successfully");
            }
    
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            getUserCartsData();
        }
    };
    
    

    


    function newIncrement(val) {
        console.log('value', val)

        setFormData({ ...formData, quantity: val })
    }

    function findMatchingProductConfig(color, size, material) {
        console.log('Finding matching config with Color:', color, ', Size:', size, ', Material:', material);

        // Check if productData and productConfig are available
        if (!productData || !productData.productConfig) {
            console.log("No product data or product configurations available.");
            return;
        }

        const matchedConfig = productData.productConfig.find(config => {
            console.log("Checking config:", config);

            // Ensure that each condition is checked correctly
            // return (
            //     (((!color || config.color?.name === color) &&(!size || config.size?.name === size)) && ((!color || config.color?.name === color) && (!material || config.material?.name === material)))
            // );


            const colorMatches = color ? config.color?.name === color : config.color == null;
            const sizeMatches = size ? config.size?.name === size : config.size == null;
            const materialMatches = material ? config.material?.name === material : config.material == null;
    
            // Return true if all conditions are met based on provided values
            return colorMatches && sizeMatches && materialMatches;
        });

        console.log('Matched Config:', matchedConfig);
        setMatchingConfigQty(matchedConfig)

        // Update price only if matchedConfig is found
        if (matchedConfig) {
            setPrcie(productData?.price + matchedConfig?.price);
            console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',price)
            setFormData({ ...formData, product_config_id: matchedConfig?._id || null });
        } else {
            setPrcie(productData?.price); // Fallback price if no matching config
            setFormData({ ...formData, product_config_id: null });
        }

        console.log('Price:', price);
    }


    // function findMatchingProductConfig(color, size, material) {
    //     console.log('Finding matching config with Color:', color, ', Size:', size, ', Material:', material);
    
    //     // Check if productData and productConfig are available
    //     if (!productData || !productData.productConfig) {
    //         console.log("No product data or product configurations available.");
    //         return;
    //     }
    
    //     const matchedConfig = productData.productConfig.find(config => {
    //         console.log("Checking config:", config);
    
    //         // Updated logic to ensure that material must match if it exists
    //         // const colorMatch = !color || config.color?.name === color;
    //         // const sizeMatch = !size || config.size?.name === size;
    //         const materialMatch = material === undefined || material === null || config.material?.name === material;
    //         const sizeMatch = size === undefined || size === null || config.size?.name === size;
    //         const colorMatch = color === undefined || color === null || config.color?.name === color;
    
    //         return colorMatch && sizeMatch && materialMatch;
    //     });
    
    //     console.log('Matched Config:', matchedConfig);
    
    //     // Update price only if matchedConfig is found
    //     if (matchedConfig) {
    //         setPrcie(productData?.price + matchedConfig?.price);
    //         setFormData({ ...formData, product_config_id: matchedConfig?._id || null });
    //     } else {
    //         setPrcie(productData?.price); // Fallback price if no matching config
    //         setFormData({ ...formData, product_config_id: null });
    //     }
    
    //     console.log('Price:', price);
    // }
    


    console.log('ccccccccccccccccccccccccccc', sizes)
    function findMatchingVariants(color) {
        const findMatchingVariant = productData?.productConfig?.filter(variant =>
            (!color || variant?.color?.name === color)
        );
        console.log('findMatchingVariant', findMatchingVariant)
        //  setFormData({ ...formData, product_config_id: findMatchingVariant?._id || null })

        return setMatchingVariant(findMatchingVariant)
    }


    useEffect(() => {
        getSingleProductData();
    }, [slug]);
    useEffect(() => {
        findMatchingVariants(selectedColor)
    }, [selectedColor, selectedSize, selectedmaterial]);

    console.log('plplplpl',productData.discount)
    useEffect(() => {
        console.log('selectedColor4545', selectedColor)
        findMatchingProductConfig(selectedColor, selectedSize, selectedmaterial);
    }, [selectedColor, selectedSize, selectedmaterial, productConfigId, productData])

    useEffect(() => {
        console.log('Product Config ID:', productConfigId);
    }, [productData]);


    const items = [
        // {
        //     key: '1',
        //     label: 'Description',
        //     children: <Description data={productData?.short_description} />,
        // },
        // {
        //     key: '2',
        //     label: 'Additional Information',
        //     children: <Addtional_Info data={productData?.long_description} />,
        // },
    ];
    if (productData?.long_description) {
        items.push({
            key: 1,
            label: 'Additional Information',
            children: <Addtional_Info data={productData?.long_description} />,
        })
    }




    // Define the truncateDescription function
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.substring(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <>
            <section>

                <Navbar_2 customClass={"py-6"} />
                <BreadCrumb pageTitle="Product List" />

                <div className="container">

                    <div className="single_products_area">

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <div className='single_product_slider'>
                                    <SingleProductSlider images={productData?.images || []} />
                                </div>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                <div>
                                    <h1 className='product_name'>{productData?.name}</h1>
                                    <Flex align='center' gap={10} className='hide'>
                                        <Rate allowHalf defaultValue={2.5} />
                                        <p>(1 customer review)</p>
                                    </Flex>


                                    {   
                                        (!productData.discount || productData.discount == 0  || productData.discount === undefined) ?
                                            <p className='price'>{formatter.format(price || 0)}</p>
                                            :
                                            <p className='price'>
                                                <s>{formatter.format(price || 0)}</s>
                                                &nbsp; {formatterWithoutSymbol.format(price - ((productData.discount / 100) * price) || 0)}
                                            </p>
                                    }


                                    {/* <p className='price'>{productData?.stock_management}</p> */}

                                    <p className='product_desc'>{productData?.short_description}</p>
                                        {/* {console.log('length',productData.short_description.length)} */}
                                    {
                                        (productData?.productConfig)?.length > 0 &&
                                        <>
                                            <Colors data={productData} selectedColor={selectedColor} setselectedColor={setselectedColor} matchingVariant={matchingVariant} colors={colors} setColors={setColors} />
                                            <Sizes data={productData} selectedSize={selectedSize} setselectedSize={setselectedSize} matchingVariant={matchingVariant} selectedColor={selectedColor} sizes={sizes} setSizes={setSizes} colors={colors} />
                                            <Material data={productData} selectedmaterial={selectedmaterial} setselectedMaterial={setselectedMaterial} matchingVariant={matchingVariant} setselectedSize={setselectedSize} sizes={sizes} />
                                        </>
                                    }

                                    <Flex gap={20} wrap="wrap" className='quantity_cart_btn'>

                                        <Quantity_Counter newIncrement={newIncrement} />

                                        <My_Button text={"Add To Cart"} onClick={addItemInCart} />
                                    </Flex>

                                    <div className='product_meta'>
                                        {
                                            productData?.SKU &&
                                            <h5>Sku: <span className='span'>{productData?.SKU}</span></h5>
                                        }
                                        <h5>Category: <span className='span'><Link to={`/shop?bestFor=${productData?.category_id?.slug}`}>{productData?.category_id?.category_name}</Link></span></h5>

                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <div className="product_desc_area">
                                <Tabs defaultActiveKey="1" items={items}
                                />
                        </div>


                        {
                            relatedProducts.length > 0 &&
                            <div className="related_products_area">
                                <h2>Related Products</h2>


                                <Row>
                                    {

                                        relatedProducts?.map((e, i) => {

                                            return < Col xs={24} sm={12} md={12} lg={6} xl={6} key={i}>

                                                <Link to={`/product/${e?.slug}`}>
                                                    <Card className='product_card' >
                                                        <Image alt="example" src={`${File_URL}/${e.images[0]?.image_url}`} preview={false} onError={handleImageError} />

                                                        <h4 className='product_name'>{e.name}</h4>
                                                        <p className='product_desc'>{truncateDescription(e.short_description, 30)}</p>
                                                        <p className='product_price'>{formatter.format(e.price)}</p>

                                                        <div className='add_to_cart_btn'>
                                                            <My_Button text={"Add To Cart"} />
                                                        </div>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        })

                                    }

                                </Row>
                            </div>
                        }

                    </div>
                </div>
            </section >

            <Footer />
        </>
    )
}


export default SingleProduct
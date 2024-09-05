
const { deliver_charges } = require('../config/config');
const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const CartItem = require('../models/cartItemModel')
const OrderLine = require('../models/orderLineModel')
const Payment = require('../models/paymentModel')
const Shipping = require('../models/shippingModel')


const orderController = {

    // place order 

    async shopOrder(req, res) {
        try {
            console.log(req.files);
            const {
                first_name,
                last_name,
                phone,

                address,
                city,
                postal_code,
                region,
                state,
                Biling_addres_select,
                billing_region,
                billing_address,
                billing_city,
                billing_postal_code,
                billing_phone,
                shiping_method,
                // for payment method 
                payment_method,
            } = req.body;
            // const imagesData = req.files.images.map(image => ({
            //     invoice_recipt: `${req.userId}/${image.filename}`
            // }));
            console.log("SSASS", req.body);

            const imagesData = [];
            let img
            const user_id = req.user.userId
            console.log('req.user',req.user)
            const email = req.user.email
            const delivery_charges = deliver_charges
            console.log("deliver_charges", delivery_charges)
            if (!first_name) return res.status(400).send({ success: false, message: "first name is required" })
            if (!last_name) return res.status(400).send({ success: false, message: "last_name is required" })
            if (!phone) return res.status(400).send({ success: false, message: "phone is required" })
            if (phone.length < 11 || phone.length > 13) return res.status(400).send({ success: false, message: "invalid phone number" })
            if (!email) return res.status(400).send({ success: false, message: "email is required" })
            if (!address) return res.status(400).send({ success: false, message: "address is required" })
            if (!city) return res.status(400).send({ success: false, message: "city is required" })
            if (!postal_code) return res.status(400).send({ success: false, message: "postal code is required" })
            if (!region) return res.status(400).send({ success: false, message: "region is required" })
            if (!state) return res.status(400).send({ success: false, message: "state is required" })
            if (!payment_method || payment_method === null || payment_method === undefined) return res.status(400).send({ success: false, message: "payment method is required" })
            if (!shiping_method || shiping_method === null) return res.status(400).send({ success: false, message: "shipping method is required" })


            if (Biling_addres_select === true) {
                if (!billing_address) return res.status(400).send({ success: false, message: "billing_address  is required" })
                if (!billing_region) return res.status(400).send({ success: false, message: "billing_region  is required" })
                if (!billing_city) return res.status(400).send({ success: false, message: "billing_city  is required" })
                if (!billing_postal_code) return res.status(400).send({ success: false, message: "billing_postal_code  is required" })
            }





            // get cart of user from cart model 

            const cart = await Cart.findOne({ user_id: user_id })
            if (cart.length == 0) {
                throw "no user cart found"
            }

            //  getting cart id of user 

            const cart_id = cart._id


            // now check cart items of user based on cart id which we have foud above 

            // const cartItems = await CartItem.find({cart_id:cart_id}).populate('product_id').populate('product_config_id')

            const cartItems = await CartItem.find({ cart_id })
                .populate({
                    path: 'product_id',
                    select: 'name price category short_description images'
                })
                .populate({
                    path: "product_config_id",
                    select: "stock_quantity price"
                });

            if (cartItems.length == 0 || cartItems.length < 0) {
                throw "no item found in cart"
            }

            // get shippiong method 

            const shippingMethod = await Shipping.findOne({ _id: shiping_method })
            if (!shippingMethod) return res.status(400).send({ success: false, message: "invalid shipping method " })

            let shipping_charges = shippingMethod.charges
            console.log('shiping-charges', shipping_charges)

            let subTotalPrice = 0;
            cartItems.forEach((item) => {
                const basePrice = item.product_id.price;
                const configPrice = item.product_config_id ? item.product_config_id.price : 0;
                const itemPrice = (basePrice + configPrice) * item.quantity;

                subTotalPrice += itemPrice;
            });


            console.log('cartItems', cartItems)
            console.log('total', subTotalPrice)
            const totalPrice = subTotalPrice + shipping_charges

            const paymentMethod = await Payment.findOne({ _id: payment_method })
            console.log("paymentMethod", paymentMethod)
            console.log("paymentMethod", paymentMethod.payment_type)

            if (paymentMethod.payment_type !== "COD" && !req.files.images) {
                return res.status(400).send({ success: false, message: "payment invoice receipt is required" })

            } else if (paymentMethod.payment_type !== "COD" && req.files.images) {
                req.files.images.forEach(image => {
                    imagesData.push([`${req.userId}/${image.filename}`]);
                });
                console.log('imagesdata', imagesData)
                img = imagesData.join(',')

            }


            const orders = await Order.countDocuments()
            console.log('ordersss',orders)
            const newOrder = new Order({
                order_id:1000 +orders + 1,
                user_id: user_id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                city: city,
                address: address,
                postal_code: postal_code,
                region: region,
                state: state,
                sub_total: subTotalPrice,
                invoice_recipt: img,
                delivery_charges: delivery_charges,
                payment_method: payment_method,
                shiping_method: shiping_method,
                Biling_addres_select: Biling_addres_select,
                billing_region: billing_region,
                billing_address: billing_address,
                billing_city: billing_city,
                billing_postal_code: billing_postal_code,
                billing_phone: billing_phone,
                total: totalPrice

            })

            await newOrder.save()
            console.log('neworder', newOrder)


            // insert data in order line to get the detail of ebery single product 
            const orderId = newOrder._id

            let orderLIneData = []

            cartItems.forEach((item) => {

                const basePrice = item.product_id.price;
                const configPrice = item.product_config_id ? item.product_config_id.price : 0;
                const itemPrice = (basePrice + configPrice);


                let singleOrderLine = {
                    order_id: orderId,
                    product_id: item.product_id._id,
                    product_config_id: item.product_config_id ? item.product_config_id._id : null,
                    quantity: item.quantity,
                    price: itemPrice
                };
                console.log('singleorderline', singleOrderLine)
                orderLIneData.push(singleOrderLine)
            })

            console.log('orderline data', orderLIneData)
            // Save order lines
            const newOrderLines = await OrderLine.insertMany(orderLIneData);

            // Delete cart items
            const deleteCartItems = await CartItem.deleteMany({ cart_id: cart_id });
            console.log('Deleted cart items:', deleteCartItems);

            return res.status(200).send({
                success: true,
                message: "order placed sucesfully",
                orderData: newOrder
            })


        }



        catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while placing order",
                error: error.message
            })
        }
    },




    // guest shop oder place 

    async GuestshopOrder(req, res) {
        // try {
        //     console.log("function invoked");

        //     console.log(req.files);
        //     const {
        //         first_name,
        //         last_name,
        //         phone,
        //         email,
        //         address,
        //         city,
        //         postal_code,
        //         region,
        //         state,
        //         Biling_addres_select,
        //         billing_region,
        //         billing_address,
        //         billing_city,
        //         billing_postal_code,
        //         billing_phone,
        //         shiping_method,
        //         // for payment method 
        //         payment_method,
        //         sub_total,




        //         user_type,
        //         cartItems,
        //     } = req.body;
        //     console.log('dddddd',typeof cartItems)
        //     // const imagesData = req.files.images.map(image => ({
        //     //     invoice_recipt: `${req.userId}/${image.filename}`
        //     // }));
        //     console.log("req.body---->", req.body);
        //     console.log('cartItems', cartItems)

        //     const imagesData = [];
        //     let img
        //     console.log('ffff', first_name)
        //     // const user_id = req.user.userId
        //     // const email = req.user.email 
        //     const delivery_charges = deliver_charges
        //     console.log("deliver_charges", delivery_charges)
        //     if (!first_name) return res.status(400).send({ success: false, message: "first name is required" })
        //     if (!last_name) return res.status(400).send({ success: false, message: "last_name is required" })
        //     if (!phone) return res.status(400).send({ success: false, message: "phone is required" })
        //     if (phone.length < 11 || phone.length > 13) return res.status(400).send({ success: false, message: "invalid phone number" })
        //     if (!email) return res.status(400).send({ success: false, message: "email is required" })
        //     if (!address) return res.status(400).send({ success: false, message: "address is required" })
        //     if (!city) return res.status(400).send({ success: false, message: "city is required" })
        //     if (!postal_code) return res.status(400).send({ success: false, message: "postal code is required" })
        //     if (!region) return res.status(400).send({ success: false, message: "region is required" })
        //     if (!state) return res.status(400).send({ success: false, message: "state is required" })
        //     if (!payment_method || payment_method === null || payment_method === undefined) return res.status(400).send({ success: false, message: "payment method is required" })
        //     if (!shiping_method || shiping_method === null) return res.status(400).send({ success: false, message: "shipping method is required" })
        //     // if(!sub_total || sub_total === null)  return res.status(400).send({success:false,message:"sub total is required"}) 


        //     if (Biling_addres_select === true) {
        //         if (!billing_address) return res.status(400).send({ success: false, message: "billing_address  is required" })
        //         if (!billing_region) return res.status(400).send({ success: false, message: "billing_region  is required" })
        //         if (!billing_city) return res.status(400).send({ success: false, message: "billing_city  is required" })
        //         if (!billing_postal_code) return res.status(400).send({ success: false, message: "billing_postal_code  is required" })
        //     }






        //     // get shippiong method 

        //     const shippingMethod = await Shipping.findOne({ _id: shiping_method })
        //     if (!shippingMethod) return res.status(400).send({ success: false, message: "invalid shipping method " })

        //     let shipping_charges = shippingMethod.charges
        //     console.log('shiping-charges', shipping_charges)

        //     let subTotalPrice = 0;




        //     // console.log('cartItems', cartItems)
        //     console.log('total', subTotalPrice)
        //     const totalPrice = subTotalPrice + shipping_charges

        //     const paymentMethod = await Payment.findOne({ _id: payment_method })
        //     console.log("paymentMethod", paymentMethod)
        //     console.log("paymentMethod", paymentMethod.payment_type)

        //     if (paymentMethod.payment_type !== "COD" && !req.files.images) {
        //         return res.status(400).send({ success: false, message: "payment invoice receipt is required" })

        //     } else if (paymentMethod.payment_type !== "COD" && req.files.images) {
        //         req.files.images.forEach(image => {
        //             imagesData.push([`${req.userId}/${image.filename}`]);
        //         });
        //         console.log('imagesdata', imagesData)
        //         img = imagesData.join(',')

        //     }



        //     const newOrder = new Order({
        //         // user_id: user_id,
        //         first_name: first_name,
        //         last_name: last_name,
        //         email: email,
        //         phone: phone,
        //         city: city,
        //         user_type: "guest",
        //         address: address,
        //         postal_code: postal_code,
        //         region: region,
        //         state: state,
        //         sub_total: subTotalPrice,
        //         invoice_recipt: img,
        //         delivery_charges: delivery_charges,
        //         payment_method: payment_method,
        //         shiping_method: shiping_method,
        //         Biling_addres_select: Biling_addres_select,
        //         billing_region: billing_region,
        //         billing_address: billing_address,
        //         billing_city: billing_city,
        //         billing_postal_code: billing_postal_code,
        //         billing_phone: billing_phone,
        //         total: totalPrice

        //     })

        //     await newOrder.save()
        //     console.log('neworder', newOrder)


        //     // insert data in order line to get the detail of ebery single product 
        //     const orderId = newOrder._id

        //     let orderLIneData = []

        //     cartItems.forEach((item) => {

        //         const basePrice = item.product_id.price;
        //         const configPrice = item.product_config_id ? item.product_config_id.price : 0;
        //         const itemPrice = (basePrice + configPrice);


        //         let singleOrderLine = {
        //             order_id: orderId,
        //             product_id: item.product_id._id,
        //             product_config_id: item.product_config_id ? item.product_config_id._id : null,
        //             quantity: item.quantity,
        //             price: itemPrice
        //         };
        //         console.log('singleorderline', singleOrderLine)
        //         orderLIneData.push(singleOrderLine)
        //     })

        //     console.log('orderline data', orderLIneData)
        //     // Save order lines
        //     const newOrderLines = await OrderLine.insertMany(orderLIneData);
        //     console.log('newOrdwrline', newOrderLines)


        //     return res.status(200).send({
        //         success: true,
        //         message: "order placed sucesfully",
        //         orderData: newOrder
        //     })


        // }

        try {
            console.log("function invoked");
        
            // Parse cartItems if it's a string
            let cartItems = req.body.cartItems;
            if (typeof cartItems === "string") {
                cartItems = JSON.parse(cartItems);
            }
        
            // Ensure cartItems is an array
            if (!Array.isArray(cartItems)) {
                return res.status(400).send({ success: false, message: "cartItems must be an array" });
            }
        
            console.log("req.body---->", req.body);
            console.log('cartItems', cartItems);
        
            const imagesData = [];
            let img;
        
            // Validate required fields
            const {
                first_name,
                last_name,
                phone,
                email,
                address,
                city,
                postal_code,
                region,
                state,
                Biling_addres_select,
                billing_region,
                billing_address,
                billing_city,
                billing_postal_code,
                billing_phone,
                shiping_method,
                payment_method,
                sub_total
            } = req.body;
        
            if (!first_name) return res.status(400).send({ success: false, message: "first name is required" });
            if (!last_name) return res.status(400).send({ success: false, message: "last_name is required" });
            if (!phone) return res.status(400).send({ success: false, message: "phone is required" });
            if (phone.length < 11 || phone.length > 13) return res.status(400).send({ success: false, message: "invalid phone number" });
            if (!email) return res.status(400).send({ success: false, message: "email is required" });
            if (!address) return res.status(400).send({ success: false, message: "address is required" });
            if (!city) return res.status(400).send({ success: false, message: "city is required" });
            if (!postal_code) return res.status(400).send({ success: false, message: "postal code is required" });
            if (!region) return res.status(400).send({ success: false, message: "region is required" });
            if (!state) return res.status(400).send({ success: false, message: "state is required" });
            if (!payment_method) return res.status(400).send({ success: false, message: "payment method is required" });
            if (!shiping_method) return res.status(400).send({ success: false, message: "shipping method is required" });
        
            if (Biling_addres_select === true) {
                if (!billing_address) return res.status(400).send({ success: false, message: "billing_address  is required" });
                if (!billing_region) return res.status(400).send({ success: false, message: "billing_region  is required" });
                if (!billing_city) return res.status(400).send({ success: false, message: "billing_city  is required" });
                if (!billing_postal_code) return res.status(400).send({ success: false, message: "billing_postal_code  is required" });
            }
        
            const shippingMethod = await Shipping.findOne({ _id: shiping_method });
            if (!shippingMethod) return res.status(400).send({ success: false, message: "invalid shipping method " });
        
            let shipping_charges = shippingMethod.charges;
            let subTotalPrice = sub_total; // Assuming `sub_total` is sent as part of the request body
            const totalPrice = subTotalPrice + shipping_charges;
        
            const paymentMethod = await Payment.findOne({ _id: payment_method });
            if (paymentMethod.payment_type !== "COD" && !req.files.images) {
                return res.status(400).send({ success: false, message: "payment invoice receipt is required" });
            } else if (paymentMethod.payment_type !== "COD" && req.files.images) {
                req.files.images.forEach(image => {
                    imagesData.push(`${req.userId}/${image.filename}`);
                });
                img = imagesData.join(',');
            }
        
            const orders = await Order.countDocuments()

            const newOrder = new Order({
                order_id:1000+orders + 1,
                first_name,
                last_name,
                email,
                phone,
                city,
                user_type: "guest",
                address,
                postal_code,
                region,
                state,
                sub_total: subTotalPrice,
                invoice_recipt: img,
                delivery_charges: shipping_charges,
                payment_method,
                shiping_method,
                Biling_addres_select,
                billing_region,
                billing_address,
                billing_city,
                billing_postal_code,
                billing_phone,
                total: totalPrice
            });
        
            await newOrder.save();
            console.log('neworder', newOrder);
        
            const orderId = newOrder._id;
            let orderLineData = [];
        
            cartItems.forEach((item) => {
                const basePrice = item.product_id.price;
                const configPrice = item.product_config_id ? item.product_config_id.price : 0;
                const itemPrice = basePrice + configPrice;
        
                let singleOrderLine = {
                    order_id: orderId,
                    product_id: item.product_id._id,
                    product_config_id: item.product_config_id ? item.product_config_id._id : null,
                    quantity: item.quantity,
                    price: itemPrice
                };
                orderLineData.push(singleOrderLine);
            });
        
            const newOrderLines = await OrderLine.insertMany(orderLineData);
            console.log('newOrderLines', newOrderLines);
        
            return res.status(200).send({
                success: true,
                message: "order placed successfully",
                orderData: newOrder
            });
        
        }



        catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while placing order",
                error: error.message
            })
        }
    },



    // get all orders for admin 

    async getAllOrders(req, res) {
        try {

            const limit = parseInt(process.env.OrdersLimitOerPage)
            const page = req.query.page ? req.query.page : 1;
            const orders = await Order.find().populate('shiping_method').skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
            const totalOrders = await Order.countDocuments()
            return res.status(200).send({
                success: true,
                message: "orders got succefully",
                orders: orders,
                totalOrders: totalOrders,
                OrdersLimitPerPage: limit
            }
            )
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something et wrong while getting orders",
                error: error.message
            })
        }
    },



    // get single orders for user 

    async getSingleOrders(req, res) {
        try {
            const orderId = req.params.id
            const order = await Order.findOne({ _id: orderId })
            if (!order) return res.status(400).send({ success: false, message: "invlaid order id" })

            return res.status(200).send({
                success: true,
                message: "order got sucesfully",
                order: order
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting order",
                error: error.message
            })
        }
    },



    // get single roder details with products 

    async getSingleOrderDetail(req, res) {
        try {
            const order_id = req.params.id;
            const orderDetail = await OrderLine.find({ order_id: order_id })
                .populate({
                    path: 'product_id',
                    select: "_id name price short_description images",
                    populate: [
                        {
                            path: 'images',
                            select: 'image_url'
                        }
                    ]
                })
                .populate({
                    path: 'order_id',
                    select: 'total Order_status order_id'
                }).populate({
                    path: 'product_config_id',
                    populate: [
                        { path: 'size', select: 'name' },
                        { path: 'color', select: 'name' },
                        { path: 'material', select: 'name' }
                    ]
                });
            ;

            // Assuming all order lines belong to the same order, we can take the total and Order_status from the first order line
            const orderInfo = orderDetail.length > 0 ? {
                total: orderDetail[0].order_id.total,
                Order_status: orderDetail[0].order_id.Order_status,
                _id: orderDetail[0].order_id._id
            } : null;

            return res.status(200).send({
                success: true,
                message: "Order details retrieved successfully",
                orderDetail: orderDetail,
                orderInfo: orderInfo
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting order detail",
                error: error.message
            })
        }
    },



    // get all orders of single users orders 

    async getUserOrders(req, res) {
        try {
            const email = req.user.email || req.query
            // const user_id = req.user.userId
            const limit = 5
            const page = req.query.page ? req.query.page : 1

            const orders = await Order.find({ email: email }).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })
            return res.status(200).send({
                success: true,
                message: "orders got succesfully",
                orders: orders
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "somethign went wrong while getting orders",
                error: error.message
            })
        }
    },


    // get guest user order based on email 

    async getGuestUserOrders(req, res) {
        try {
            const email = req.query.email
            // const user_id = req.user.userId
            const limit = 5
            const page = req.query.page ? req.query.page : 1

            const orders = await Order.find({ email: email }).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 })
            return res.status(200).send({
                success: true,
                message: "orders got succesfully",
                orders: orders
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "somethign went wrong while getting orders",
                error: error.message
            })
        }
    },

    // update order status 


    async updateOrderStatus(req, res) {
        try {
            const order_id = req.params.id;
            const Order_status = req.body.Order_status;
            const order = await Order.findOneAndUpdate(
                { _id: order_id },
                { Order_status: Order_status },
                { new: true } // This ensures the updated document is returned
            );
            if (!order) throw new Error('Order not found');
            return res.status(200).send({
                success: true,
                message: "Order status updated successfully",
                order: order
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while updating status",
                error: error.message
            });
        }
    }

}



module.exports = orderController
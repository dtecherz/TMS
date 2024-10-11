const Cart = require('../models/cartModel')
const CartItem = require('../models/cartItemModel')
const Product = require('../models/productModel')
const ProductConfig = require('../models/productConfigModel')
const { deliver_charges } = require('../config/config')
const cartController = {

    // create cart 

    async createCart(req, res) {
        // try {
        //     const user_id = req.user.userId
        //     const cart_id = req.body.cart_id
        //     const product_id = req.params.product_id
        //     const product_config_id = req.body.product_config_id || 0
        //     const quantity = req.body.quantity || 1

        //     // checking product id

        //     const product = await Product.findOne({ _id: product_id })

        //     if (product.length == 0 || product == null) {
        //         return res.status(400).send({ success: false, message: "invalid product id" })
        //     }

        //     // product total quantity in databse 
        //     const productQuantity = product.total_quantity


        //     // const chek product config 

        //     const productConfig = await ProductConfig.findOne({ _id: product_config_id })

        //     if (productConfig.length == 0 || productConfig == null) {
        //         return res.status(400).send({ success: false, message: "invalid product config id" })
        //     }

        //     // product variant quantity 

        //     const ProductVariantQuantity = productConfig.stock_quantity

        //     // checking user cart 
        //     const checkCart = await Cart.find({ user_id: user_id })
        //     // if user cart already exists 
        //     if (checkCart.length > 0) {

        //         // when cart already exists 

        //         const cartItems = await CartItem.findOne({ cart_id: cart_id, product_id: product_id, product_config_id: product_config_id })



        //         // if product has no variants 
        //         if (product_config_id == 0) {

        //             // now insert item in shopping cart 




        //             if (cartItems == null || cartItems.length == 0) {


        //                 if (quantity > productQuantity) {
        //                     return res.status(400).send({ success: false, message: `this product is out of stock only ${productQuantity} are left` })
        //                 }
        //                 // creating new cart 
        //                 // insert data in cartItems 

        //                 const newCartItems = new CartItem({
        //                     cart_id: cart_id,
        //                     product_id: product_id,
        //                     product_config_id: product_config_id,
        //                     quantity: quantity
        //                 })
        //                 await newCartItems.save()

        //                 return res.status(200).send({ success: true, message: "item added in cart succesfully", cart: newCartItems })
        //             }
        //             else {

        //                 // quantity of product in database in cart
        //                 const quantityInDatabase = cartItems.quantity;



        //                 const newQuantity = quantityInDatabase + quantity;

        //                 if (quantity > 0) {

        //                     if (newQuantity > productQuantity) {
        //                         return res.status(400).send({ success: false, message: `item is out of stock only ${productQuantity} are left` })
        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity updated", cartItems: cartItems })


        //                 } else if (quantity < 0) {

        //                     if (quantityInDatabase == 1) {
        //                         return res.status(400).send({ success: false, message: "cant remove item from cart anymore" })

        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity decreased in cart" })
        //                 }




        //             }
        //         } 
        //         else {

        //             //when  product config id not equal to 0 

        //             if (cartItems == null || cartItems.length == 0) {


        //                 if (quantity > ProductVariantQuantity) {
        //                     return res.status(400).send({ success: false, message: `This variant of  product is out of stock only ${ProductVariantQuantity} itesm are left` })
        //                 }
        //                 // creating new cart 
        //                 // insert data in cartItems 

        //                 const newCartItems = new CartItem({
        //                     cart_id: cart_id,
        //                     product_id: product_id,
        //                     product_config_id: product_config_id,
        //                     quantity: quantity
        //                 })
        //                 await newCartItems.save()

        //                 return res.status(200).send({ success: true, message: "item added in cart succesfully", cart: newCartItems })
        //             }else{

        //                 // quantity of product in database in cart
        //                 const quantityInDatabase = cartItems.quantity;



        //                 const newQuantity = quantityInDatabase + quantity;

        //                 if (quantity > 0) {

        //                     if (newQuantity > ProductVariantQuantity) {
        //                         return res.status(400).send({ success: false, message: `This product variant item is out of stock only ${ProductVariantQuantity} are left` })
        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity updated", cartItems: cartItems })


        //                 } else if (quantity < 0) {

        //                     if (quantityInDatabase == 1) {
        //                         return res.status(400).send({ success: false, message: "can't remove item from cart anymore" })

        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity decreased in cart" })
        //                 }

        //             }
        //         }
        //     }
        //     else {

        //         // if user cart does not exists 

        //         // create cart first 

        //         const newCart = new Cart({
        //             user_id: user_id
        //         })
        //         await newCart.save()

        //         const inseredCartId = newCart._id


        //         // check if that product already exist in the cart 

        //         const cartItems = await CartItem.findOne({ cart_id: cart_id, product_id: product_id, product_config_id: product_config_id })



        //         // if product has no variants 
        //         if (product_config_id == 0) {

        //             // now insert item in shopping cart 




        //             if (cartItems == null || cartItems.length == 0) {


        //                 if (quantity > productQuantity) {
        //                     return res.status(400).send({ success: false, message: `this product is out of stock only ${productQuantity} are left` })
        //                 }
        //                 // creating new cart 
        //                 // insert data in cartItems 

        //                 const newCartItems = new CartItem({
        //                     cart_id: inseredCartId,
        //                     product_id: product_id,
        //                     product_config_id: product_config_id,
        //                     quantity: quantity
        //                 })
        //                 await newCartItems.save()

        //                 return res.status(200).send({ success: true, message: "item added in cart succesfully", cart: newCartItems })
        //             }
        //             else {

        //                 // quantity of product in database in cart
        //                 const quantityInDatabase = cartItems.quantity;



        //                 const newQuantity = quantityInDatabase + quantity;

        //                 if (quantity > 0) {

        //                     if (newQuantity > productQuantity) {
        //                         return res.status(400).send({ success: false, message: `item is out of stock only ${productQuantity} are left` })
        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity updated", cartItems: cartItems })


        //                 } else if (quantity < 0) {

        //                     if (quantityInDatabase == 1) {
        //                         return res.status(400).send({ success: false, message: "cant remove item from cart anymore" })

        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity decreased in cart" })
        //                 }




        //             }
        //         } 
        //         else {

        //             //when  product config id not equal to 0 

        //             if (cartItems == null || cartItems.length == 0) {


        //                 if (quantity > ProductVariantQuantity) {
        //                     return res.status(400).send({ success: false, message: `This variant of  product is out of stock only ${ProductVariantQuantity} itesm are left` })
        //                 }
        //                 // creating new cart 
        //                 // insert data in cartItems 

        //                 const newCartItems = new CartItem({
        //                     cart_id: inseredCartId,
        //                     product_id: product_id,
        //                     product_config_id: product_config_id,
        //                     quantity: quantity
        //                 })
        //                 await newCartItems.save()

        //                 return res.status(200).send({ success: true, message: "item added in cart succesfully", cart: newCartItems })
        //             }else{

        //                 // quantity of product in database in cart
        //                 const quantityInDatabase = cartItems.quantity;



        //                 const newQuantity = quantityInDatabase + quantity;

        //                 if (quantity > 0) {

        //                     if (newQuantity > ProductVariantQuantity) {
        //                         return res.status(400).send({ success: false, message: `This product variant item is out of stock only ${ProductVariantQuantity} are left` })
        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity updated", cartItems: cartItems })


        //                 } else if (quantity < 0) {

        //                     if (quantityInDatabase == 1) {
        //                         return res.status(400).send({ success: false, message: "can't remove item from cart anymore" })

        //                     }
        //                     cartItems.quantity = newQuantity
        //                     return res.status(200).send({ success: true, message: "item quantity decreased in cart" })
        //                 }

        //             }
        //         }


        //     }




        // }

         try {
            const user_id = req.user.userId;
            const product_id = req.params.product_id;
            const product_config_id = req.body.product_config_id || null;
            const quantity = req.body.quantity || 1;
            let cart_id


            console.log("req.body", req.body)
            console.log('quantity', quantity)


            // Check for product existence
            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(400).send({ success: false, message: "Invalid product ID" });
            }

            // product stock managemnt 

            let productStockManagament = product.stock_management
            console.log('pppppppp',productStockManagament)

            // check product variant in product config table 
            const productVariant = await ProductConfig.find({ product_id: product_id })
            if (productVariant.length > 0 && product_config_id == null) {
                return res.status(400).send({ success: false, message: "This product has variant so you need to select one variant first" })
            }
            const productQuantity = product.total_quantity;

            // Check for product config existence if product_config_id is provided
            let productConfig = null;
            if (product_config_id) {
                productConfig = await ProductConfig.findById(product_config_id);
                if (!productConfig) {
                    return res.status(400).send({ success: false, message: "Invalid product config ID" });
                }
            }

            const variantQuantity = productConfig ? productConfig.stock_quantity : null;

            // Check if user cart exists
            let userCart = await Cart.findOne({ user_id });
            if (!userCart) {
                // Create a new cart for the user if it doesn't exist
                userCart = new Cart({ user_id: user_id });
                await userCart.save();

                cart_id = userCart._id

            }else {
                cart_id = userCart._id
            }

            const cartItems = await CartItem.findOne({ cart_id: userCart._id, product_id: product_id, product_config_id: product_config_id });

            console.log('cartItems', cartItems)
            if (!cartItems) {
                // New item to be added to cart
                if ((product_config_id && quantity > variantQuantity) && productStockManagament) {
                    return res.status(400).send({ success: false, message: `This variant of the product is out of stock. Only ${variantQuantity} items are left.` });
                }

                if (!product_config_id && (quantity > productQuantity) && productStockManagament) {
                    return res.status(400).send({ success: false, message: `This product is out of stock. Only ${productQuantity} items are left.` });
                }

                const newCartItem = new CartItem({
                    cart_id: cart_id,
                    product_id: product_id,
                    product_config_id: product_config_id,
                    quantity: quantity
                });
                await newCartItem.save();

                return res.status(200).send({ success: true, message: "Item added to cart successfully", cart: newCartItem });
            } else {
                // Existing item in cart
                const newQuantity = cartItems.quantity + quantity;
                console.log('newQuantity', newQuantity)
                if (quantity > 0) {
                    console.log(">>>>>>>>>>>>>>>>>>>")
                    if ((product_config_id && newQuantity > variantQuantity) && productStockManagament) {
                        return res.status(400).send({ success: false, message: `This product variant is out of stock. Only ${variantQuantity} items are left.` });
                    }

                    if (!product_config_id && (newQuantity > productQuantity ) && productStockManagament) {
                        return res.status(400).send({ success: false, message: `This product is out of stock. Only ${productQuantity} items are left.` });
                    }

                    console.log('cart quantity', cartItems.quantity)
                    cartItems.quantity = newQuantity;
                    await cartItems.save();
                    console.log('cartItems', cartItems)
                    return res.status(200).send({ success: true, message: "Item quantity updated", cartItems });
                } else if (quantity < 0) {
                    console.log("<><><>><><><")
                    if (cartItems.quantity === 1) {
                        return res.status(400).send({ success: false, message: "Cannot remove item from cart anymore" });
                    }

                    cartItems.quantity = newQuantity;
                    await cartItems.save();
                    return res.status(200).send({ success: true, message: "Item quantity decreased in cart", cartItems });
                }
            }

        }
        catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while adding item in cart ",
                error: error.message
            })
        }
    },


    async deleteCartItem(req, res) {
        try {
            const cartItemId = req.body.cartItemId;
            console.log('cartItemId',cartItemId)
            // Try to find and delete the cart item
            const cartItems = await CartItem.findOneAndDelete({ _id: cartItemId });
        
            // Check if the item was found and deleted
            if (!cartItems) {
                return res.status(404).send({
                    success: false,
                    message: "Cart item not found"
                });
            }
        
            // If the item was found and deleted, send a success response
            return res.status(200).send({
                success: true,
                message: "Cart item deleted successfully"
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while deleting item from cart",
                error: error.message
            })
        }
    },


    // get carts for user 


    async getUserCarts(req, res) {
        try {
            const user_id = req.user.userId;
            // const Delivery_Charges = parseInt(deliver_charges)
            const cart = await Cart.findOne({ user_id: user_id });

            if (!cart) return res.status(200).send({
                success: true,
                message: "No items found in cart",
                cartItems: []
            });


            const UserCartItems = await CartItem.find({ cart_id: cart._id })
                .populate({
                    path: "product_id",
                    select: "name price images",
                    populate: {
                        path: "images",
                        select: "image_url"
                    }
                })
                .populate({
                    path: 'product_config_id',
                    populate: [
                        { path: 'size', select: 'name' },
                        { path: 'color', select: 'name' },
                        { path: 'material', select: 'name' }
                    ]
                });

            if (UserCartItems.length > 0) {
                let subTotalPrice = 0;
                let Total = 0
                const updatedCartItems= UserCartItems.map(item => {
                    const basePrice = item.product_id.price;
                    const configPrice = item.product_config_id ? item.product_config_id.price : 0;
                    const singleItemPrice = (basePrice + configPrice) * item.quantity;
                    console.log('totalll',Total)
                    subTotalPrice += singleItemPrice;
                    Total = subTotalPrice 
                    console.log('totalll1',Total)
                    return {
                        ...item.toObject(), // Convert Mongoose document to plain JS object
                        singleItemPrice
                    };
                });

                return res.status(200).send({
                    success: true,
                    message: "Cart items retrieved successfully",
                    cartItems: updatedCartItems,
                    subTotalPrice: subTotalPrice,
                    Total: Total
                });
            }

            return res.status(200).send({
                success: true,
                message: "No items found in cart",
                cartItems: []
            });

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while getting user cart",
                error: error.message
            })
        }
    },

    // admin get carts 

    async getAllCarts(req, res) {
        try {
            const carts = await Cart.find()
            return res.status(200).send({
                success: true, message: "carts got succesfully", carts: carts

            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "something went wrong while get cart",
                error: error.message
            })
        }
    },





    // get carts from localstorage by productId productConfigid and quantity 



    async getCarts(req, res) {
        try {
            const data = req.body;
            console.log('data',data)
            async function getCartsData(items, index = 0, result = [], subTotalPrice = 0 ) {
                if (index >= items.length) {
                    return { result, totalPrice: subTotalPrice };
                }
    
                let productPrice = 0;
                let productConfigPrice = 0;
                let productConfigDetails = {};
                const { product_id, product_config_id, quantity } = items[index];
                const product = await Product.findOne({ _id: product_id }).populate({path: "images", select: ["image_url"]});
    
                if (product) productPrice = product.price;
    
                if (product_config_id) {
                    const productConfig = await ProductConfig.findOne({ _id: product_config_id })
                    .populate({ path: "size", select: "name" })
                    .populate({ path: "color", select: "name" })
                    .populate({ path: "material", select: "name" });

                    console.log('pppppppppppppppp',productConfig)

                    if (productConfig) {
                        console.log('cccccc',productConfig)
                        productConfigPrice = productConfig.price;
                        productConfigDetails = {
                            _id: productConfig._id,
                            size: productConfig.size ? { _id: productConfig.size._id, name: productConfig.size.name } : null,
                            color: productConfig.color ? { _id: productConfig.color._id, name: productConfig.color.name } : null,
                            material: productConfig.material ? { _id: productConfig.material._id, name: productConfig.material.name } : null,
                            product_id: productConfig.product_id,
                            price: productConfig.price,
                            stock_quantity: productConfig.stock_quantity,
                            __v: productConfig.__v,
                        }; 
                    }else{
                        productConfigDetails = null
                    }
                }
                else{
                    productConfigDetails=null
                }
    
                const itemSubTotalPrice = (productPrice + productConfigPrice) * quantity;
                console.log("itemm",itemSubTotalPrice)
                subTotalPrice += itemSubTotalPrice;
    
                result.push({
                    _id:index,
                    product_id: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        images: product.images,
                    },
                    product_config_id: productConfigDetails || null,
                    quantity,
                    subTotalPrice: itemSubTotalPrice,
                });
                console.log('rrrr',result)
    
                return await getCartsData(items, index + 1, result, subTotalPrice);
            }
    
            // Invoke recursive function
            const { result, totalPrice } = await getCartsData(data);
    
            // Respond with the cart data and total price
            return res.status(200).json({
                success: true,
                cartItems   : result,
                subTotalPrice:totalPrice,
                Total:totalPrice,
            });
    
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while getting carts",
                cart: []  // It's better to return an empty array or null if no carts data
            });
        }
    }
    


}


module.exports = cartController
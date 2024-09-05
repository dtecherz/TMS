
const Cart = require('../models/cartModel')
const CartItems = require('../models/cartItemModel')



// create cart function 

async function findCart(userId) {

    return new Promise((resolve, reject) => {
        if (!userId) reject({ sucesss: false, message: "userId is required" })

        // run query 

        const cart = Cart.findOne({ userId: userId })
        if (cart.length > 0) {
            reject({ success: false, message: "carts got succesfully", data: cart })
        } else {
            resolve({ success: true, message: "no cart found", data: [] })
        }
    })

}





async function createCart(user_id) {
    return new Promise(async (resolve, reject) => {
        if (!user_id) {
            return reject({ success: false, message: "userId is required" });
        }

        try {
            const newCart = new Cart({ user_id: user_id });
            await newCart.save();
            resolve(newCart); // Resolve with the created cart
        } catch (error) {
            reject({ success: false, message: "Error creating cart", error: error.message });
        }
    });
}




async function createCartItems(cart_id,product_id,quantity,product_config_id){
    return new Promise(async (resolve,reject)=>{
        if(!cart_id) reject({ success: false, message: "cartId is required" });
        if(!product_id) reject({ success: false, message: "product_id is required" });
        if(!quantity) reject({ success: false, message: "quantity is required" });
        if(!product_config_id) reject({ success: false, message: "product_config_id is required" });
        
        try {
            const newCartItems = new CartItems({cart_id:carts_id,product_id:product_id,quantity:quantity,product_config_id:product_config_id})
            await newCartItems.save()
        } catch (error) {
            reject({ success: false, message: "Error adding  cart items", error: error.message });
            
        }
        
    })
}



// find user items 


async function findCartItems(cart_id) {
    return new Promise(async (resolve, reject) => {
        if (!cart_id) {
            return reject({ success: false, message: "cartId is required" });
        }

        try {
            const cartItems = await CartItems.find({ cart_id: cart_id });
            
            if (cartItems.length > 0) {
                return resolve({ success: true, message: "Got cart items successfully", data: cartItems });
            } else {
                return resolve({ success: true, message: "No items found in cart", data: [] });
            }
        } catch (error) {
            return reject({ success: false, message: "Error finding cart items", error: error.message });
        }
    });
}



async function deleteCart(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject({ success: false, message: "id is required" });
        }

        try {
            const cart = await Cart.findOneAndDelete({ _id: id });
            if (!cart) {
                return reject({ success: false, message: "Cart not found" });
            }

            resolve({ success: true, message: "Cart deleted successfully" });
        } catch (error) {
            reject({ success: false, message: "Error deleting cart", error: error.message });
        }
    });
}



// delete cart items


async function deleteCartItems(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            return reject({ success: false, message: "id is required" });
        }

        try {
            const cart = await CartItems.findOneAndDelete({ _id: id });
            if (!cart) {
                return reject({ success: false, message: "Cart item not found" });
            }

            resolve({ success: true, message: "Cart item deleted successfully" });
        } catch (error) {
            reject({ success: false, message: "Error deleting cart", error: error.message });
        }
    });
}

import { createContext, useContext, useState, useEffect } from "react"
import { signin, getLoginUser, GuestLogin, getCarts } from "../APIs/api";





// Step 1
const CartContext = createContext()

// Step 2
export const useCart = () => {
    return useContext(CartContext);
}

// Step 3
export const CartProvider = ({ children }) => {

    const [carts, setCarts] = useState([])
    const [subTotal, setSubTotal] = useState(0);
    const [ Total,setTotal] = useState(0)
    const [quantityOfProducts, setQuantityOfProducts] = useState(0)


    const getUserCartsData = async () => {
        try {
        
            const resposne = await getCarts();
            if (resposne.success) {
                setCarts(resposne.cartItems);
              
                // setQuantityOfProducts(resposne.carts.reduce((acc, quantity) => { return acc + quantity.quantity_of_product }, 0))
                setSubTotal(resposne.subTotalPrice);
                setTotal(resposne.Total)
            }
            return resposne.cartItems
        } catch (error) {
            console.log(error);
            //   Alert(error.message);
        }
    };

    useEffect(()=>{
        // getUserCartsData()
    },[])



    


    return (
        <CartContext.Provider value={{ getUserCartsData, carts, setCarts, subTotal,quantityOfProducts,Total }}>
            {children}
        </CartContext.Provider>
    )
}


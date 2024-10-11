import { createContext, useContext, useState, useEffect } from "react"
import { signin, getLoginUser, GuestLogin, getCarts, cartsGet } from "../APIs/api";
import { useCookies } from "react-cookie";





// Step 1
const CartContext = createContext()

// Step 2
export const useCart = () => {
    return useContext(CartContext);
}

// Step 3
export const CartProvider = ({ children }) => {

    const [carts, setCarts] = useState([])
    const [localData,setLocalData]= useState([])

    const [cookies] = useCookies(['pk2'])
    console.log('pk222',cookies.pk2)
    const [subTotal, setSubTotal] = useState(0);
    const [ Total,setTotal] = useState(0)
    const [quantityOfProducts, setQuantityOfProducts] = useState(0)


    const getUserCartsData = async () => {
        const token = cookies?.pk2
        if(token){
            
            
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
        }else{
            console.log('haaan')
            const storedCart = JSON.parse(localStorage.getItem('cart'))
            console.log('crrt',storedCart)
            // console.log('crrt',localData)
            setLocalData(storedCart)
            try {
                const response = await cartsGet(storedCart)
                if(response.success) 
                    setSubTotal(response.subTotalPrice);
                setTotal(response.Total)
                setCarts(response.cartItems)
            } catch (error) {
               console.log(error)

            }
        }
    };
    console.log('acbccccccccccccccccccccccccccccc ',carts)
    console.log('crrt',localData)

    useEffect(()=>{
        getUserCartsData()
    },[])



    


    return (
        <CartContext.Provider value={{ getUserCartsData, carts, setCarts, subTotal,quantityOfProducts,Total }}>
            {children}
        </CartContext.Provider>
    )
}


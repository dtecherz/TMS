import { createContext, useContext, useState, useEffect } from "react"
import { signin, getLoginUser, GuestLogin } from "../APIs/api";
import { useCookies } from 'react-cookie';
import { Alert } from "./notify";
import { useNavigate } from "react-router-dom";



// Step 1
const AuthContext = createContext()

// Step 2
export const useAuth = () => {
    return useContext(AuthContext);
}

// Step 3
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        long_description: "",
        price: "",
        stock_management: "",
        total_quantity: "",
        SKU: "",
        category_id: "",
        images: [""],
        image_url: "",
        status: "",
        discount: ""

    });

    useEffect(()=>{
        // GuestLoginData();

    },[])

    async function Login(body) {
        try {
            console.log("-----------------------------");
            const response = await signin(body)
            console.log("RREESS", response);

            // if(response.user.status != "active") return Alert("Your account is Blocked", "error")            

            if (response.success) {
                Alert(response.message)
                setUser(response.user)
                setCookie('pk2', response.token, {
                    path: '/',
                    maxAge: 6000000,
                });

                return navigate("/")
            }

        } catch (error) {
            Alert(error.message, false)
        }



    }


    async function GuestLoginData(body) {
     
        try {
            // ---------------------
            // console.log("aya h", cookies);
            if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
                const response = await GuestLogin(body);
                console.log('rrrrrrrrrr', response);
                setUser(response.user);
                setCookie('pk2', response.token, {
                    path: '/',
                    maxAge: 6000000,
                });
            }
         
        } catch (error) {
            console.log(error)
            Alert(error.message, false)
        }
    }

    async function SignUp(body) {
        // const res = await signup_user(body)
        // console.log("res", res);
        // return res
    }

    async function GetLoginUSer() {
        try {
            const response = await getLoginUser()
            
            if (response.success) setUser(response?.user)

        } catch (error) {
           
            if (error.signout) SignOut()
            if (error.redirect) return navigate(error.redirect)
        }


    }






    // guest user login landing on homepage 
    // console.log("ccccccccccccccc", cookies);

    // async function GuestLoginData (body){
    //     try {
    //         // ---------------------
    //         if (Object.keys(cookies).length === 0 && cookies.constructor === Object) {
    //             const response = await GuestLogin(body);
    //             console.log('rrrrrrrrrr', response);
    //             setUser(response.user);
    //             setCookie('pk2', response.token, {
    //                 path: '/',
    //                 maxAge: 6000000,
    //             });
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         Alert(error.message,false)
    //     }
    // }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function SignOut() {
        removeCookie("pk2");
        // await delay(5000);  // Wait for 100ms to ensure the cookie is removed
        // setCookie('pk2',"")
        // navigate('/sign-in');

        window.location.href = "/sign-in"
        console.log("hiiii");
        console.log("hello");
    }


    return (
        <AuthContext.Provider value={{ GuestLoginData, user, setUser, Login, SignUp, GetLoginUSer, SignOut, setFormData, formData }}>
            {children}
        </AuthContext.Provider>
    )
}
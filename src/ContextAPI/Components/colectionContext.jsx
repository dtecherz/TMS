import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "./notify";
import { getAllColections } from "../APIs/api";


// step 1
const collectionContext = createContext( )


// step 2
export const useCollection = () =>{
    return useContext(collectionContext)
}



// step 3 


export const collectionProvider = ({children}) =>{

    const [collections,setcollections] = useState([])
    



    const getColletionData = async () =>{
        try {
            const response = await getAllColections()
            if(response.success) setcollections(response.collections.filter(e=> e.status === "active"))

                console.log('collections',collections)
        } catch (error) {
            console.log(error)
            Alert(error.message,false)
        }
    }



    useEffect(()=>{
        getColletionData()
    },[])



    return (
        <collectionContext.Provider value={{ getColletionData, collections, setcollections }}>
            {children}
        </collectionContext.Provider>
    )

}
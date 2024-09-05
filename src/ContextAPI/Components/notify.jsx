import { createContext, useContext, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';

/**
 * 
 * Reference Link
 * https://react-hot-toast.com/docs/toast
 * 
 */



// Step 1
const ToastContext = createContext()

// Step 2
export const useToast = () => {
    return useContext(ToastContext);
}

// Step 3
export const ToastProvider = ({ children }) => {

    
    
    return (
        <ToastContext.Provider value={{ Alert }}>
            {children}


            <div>
                <Toaster
                    position="top-right"
                />
            </div>


        </ToastContext.Provider>
    )
}

export const Alert = (msg, isSuccess=true) => {
    if(isSuccess == true && msg != undefined && msg != "") toast.success(msg);


    else if(isSuccess == false && msg != undefined && msg != "") toast.error(msg || 'Here is your toast.');
    else toast.error('An error occurred.');

}
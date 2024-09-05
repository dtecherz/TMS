import { CombineComponents } from "./CombineContext";
import { AuthProvider } from "./Components/auth";
import { CartProvider } from "./Components/CartContext";
import { ToastProvider } from "./Components/notify";
// import { LoaderProvider } from "./Components/loader";


const providers = [
    ToastProvider,
    AuthProvider,
    CartProvider,
]

// LoaderProvider,

export const AppContextProvider = CombineComponents(...providers)
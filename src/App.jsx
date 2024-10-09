import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuth } from './ContextAPI/Components/auth';
import axios from 'axios'; // Ensure axios is imported

import Signin from './pages/Signin';
import Addresses from './pages/Addresses';
import Settings from './pages/Settings';
import Dashboard_Layout from './components/Dashboard_Layout';
import Users from './pages/Users';
import CategoryList from './pages/Category/categotyList'; // Double-check the file name for typo
import VariationsList from './pages/Variations/variationsList';
import ProductList from './pages/Products/productList';
import ProductVariationList from './pages/ProductsVariations/productVariationList';
import VariationOptionList from './pages/Variations/VariationOptionList';
import CreateCategory from './pages/Category/CreateCategory';
import AddProductVariation from './pages/Products/AddProductVariation';
import AddProduct from './pages/Products/AddProduct';
import Orders from './pages/Order/Orders';
import CreateProduct from './pages/CreateProduct';
import Gallery from './pages/Gallery/gallery';
import UploadImages from './pages/Gallery/uploadImages';
import Addpayment from './pages/Payment/Addpayment';
import ProductDetail from './pages/Products/ProductDetail';
import PaymentMethods from './pages/Payment/PaymentMethods';
import OrderTracking from './pages/Order/OrderTracking';
import ShippingMethods from './pages/Shipping/ShippingMethods';
import AddShippingMethod from './pages/Shipping/AddShippingMethod';
import EditCategory from './pages/Category/EditCategory';
import EditShippingMethods from './pages/Shipping/EditShippingMethods';
import CollectionList from './components/Collection/CollectionList';
import CreateCollection from './components/Collection/CreateCollection';
import EditCollection from './components/Collection/EditCollection';



function App() {
  const {user,GetLoginUSer} = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['pk2']);

  axios.defaults.headers["authorization"] = `Bearer ${cookies.pk2 || null}`;
  axios.defaults.headers["ngrok-skip-browser-warning"] = `1211`;

  useEffect(() => {
    if (user == null && cookies.pk2 !== undefined) GetLoginUSer();
  }, [user]); // Added cookies.pk2 to the dependency array


  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />

      <Route element={<Dashboard_Layout />}>
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/variation-list" element={<VariationsList />} />
        <Route path="/variation-option-list/:id" element={<VariationOptionList />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product-detail/:slug" element={<ProductDetail />} />
        <Route path="/create-product-variant/:id" element={<AddProductVariation />} />
        <Route path="/product-variation-list" element={<ProductVariationList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/upload-images" element={<UploadImages />} />
        <Route path="/add-payment-method" element={<PaymentMethods />} />
        <Route path="/order-tracking/:id" element={<OrderTracking />} />
        <Route path="/shipping-methods" element={<ShippingMethods />} />
        <Route path="/add-shipping-method" element={<AddShippingMethod />} />
        <Route path="/edit-shipping-method/:id" element={<EditShippingMethods />} />
        <Route path="/collection-list" element={<CollectionList />} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/edit-collection/:id" element={<EditCollection />} />
      </Route>
    </Routes>
    </>
  );
}


export default App;
import axios from "axios";
import { API_URL } from "../../config";
import { Alert } from "../Components/notify";



/** --------------- AUTH --------------- **/
export const signUp = async (body) => {
  try {
    return await CallAPI("POST", "api/user/register/", body);
  } catch (error) {
    throw error;
  }
};

export const signin = async (body) => {
  try {
    return await CallAPI("POST", "api/user/login", body);
  } catch (error) {
    throw error;
  }
};


export const GuestLogin = async (body) => {
  try {
    return await CallAPI("POST", 'api/user/register-guest', body)
  } catch (error) {
    throw error
  }
}

export const forgetPassword = async (body) => {
  try {
    return await CallAPI("POST", "user/forget-password", body);
  } catch (error) {
    throw error;
  }
};

export const getLoginUser = async () => {
  try {
    return await CallAPI("GET", "api/user/get-login-user");
  } catch (error) {
    throw error;
  }
};

export const updateUserDetails = async (body) => {
  try {
    return await CallAPI('PUT', `api/user/update-password`, body)
  } catch (error) {
    throw error
  }
}


/** ---------------- PUBLIC APIs ---------------- **/

// product apis 

// export const getProducts = async (params,page) => {
//   console.log(params);
//   try {
//     return await CallAPI("GET", `api/products/get${params.toString()}`,page);
//   } catch (error) {
//     throw error;
//   }
// };

export const getProducts = async (params, page) => {
  const queryString = params.startsWith('?') ? params.slice(1) : params; // Remove leading '?'
  try {
    return await CallAPI("GET", `api/products/get?${queryString}&page=${page}`);
  } catch (error) {
    throw error;
  }
};


export const getlistPageData = async () => {
  try {
    return await CallAPI("GET", `api/platform/product-list?sub=true`);
  } catch (error) {
    throw error;
  }
};


export const getSearchProduct = async (name = "") => {
  try {
    return await CallAPI("GET", `api/platform/search?name=${name}`);
  } catch (error) {
    throw error;
  }
};


export const getSingleProduct = async (id) => {
  try {
    return await CallAPI("GET", `api/products/get-single/${id}`);
  } catch (error) {
    throw error;
  }
};


/**
 * Cart APIs Section
 */


// subscriber setion 

export const addSubscriber = async (body)=>{

  try {
    return await CallAPI('POST',`api/subscriber/subscribe`,body)
  } catch (error) {
    throw error
  }

}










/**
 * Dashboard APIs Section
 */

/** ----------------- CATEGORY ----------------- **/
export const addCategory = async (body) => {
  try {
    return await CallAPI("POST", "api/product-category/add-category", body);
  } catch (error) {
    throw error;
  }
};

export const singleCategory = async (id)=>{
  console.log('ooo',id)
  try {
    return await CallAPI("GET",`api/product-category/get-single/${id}`)
  } catch (error) {
    throw error
  }
}


export const deleteCategory = async (id) =>{
  try {
    return await CallAPI("DELETE", `api/product-category/delete-category/${id}`)
  } catch (error) {
    throw error
  }
}



export const updateCategory = async (id, body) => {
  try {
    return await CallAPI('PUT', `api/product-category/update-category/${id}`, body)
  } catch (error) {
    throw error;
  }
};






/** --------------- SUB-CATEGORY --------------- **/
export const addSubCategory = async (body) => {
  try {
    return await CallAPI("POST", "api/subcategory/create", body);
  } catch (error) {
    throw error;
  }
};


/** ------------------ COLORS ------------------ **/
export const addColors = async (body) => {
  try {
    return await CallAPI("POST", "api/color/add", body);
  } catch (error) {
    throw error;
  }
};

/** ------------------ PRODUCTS ------------------ **/
export const addProduct = async (body) => {
  try {
    return await CallAPI("POST", "api/products/add-product", body);
  } catch (error) {
    throw error;
  }
};

export const addProductVariant = async (body) => {
  try {
    return await CallAPI("POST", "api/product-config/add-product-config", body);
  } catch (error) {
    throw error;
  }
};





export const updateProduct = async (id, body) => {
  try {
    return await CallAPI('PUT', `api/products/update-product/${id}`, body)
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await CallAPI ('DELETE', `api/products/delete-product/${id}`)
  } catch (error) {
    throw error;
  }
};

// filter products

export const filterProduct = async (queryParams) => {
  try {
    return await CallAPI("GET", `api/product/filtered-products`, null, queryParams);

  } catch (error) {
    throw error;
  }
};

// search product

export const searchProduct = async (body) => {
  try {
    return await CallAPI("POST", `api/product/search-product`, body);

  } catch (error) {
    throw error;
  }
};



// add product image 

export const addProductImage = async (id, body) => {
  try {
    return await CallAPI("POST", `api/product/add-image/${id}`, body)
  } catch (error) {
    throw error
  }
}


export const deleteProductImage = async (body) => {
  try {
    return await CallAPI("POST", `api/product/delete-image`, body)
  } catch (error) {
    throw error
  }
}


//  get product by page 

export const getProductByPages = async (page) => {
  try {
    return await CallAPI('GET', `api/a/get-product/${page}`)
  } catch (error) {
    throw error
  }
}


// get related products 

export const getRelatedProducts = async (id) => {
  try {
    return await CallAPI('GET', `api/product/get-related-products/${id}`)
  } catch (error) {
    throw error
  }
}


export const getProductsByTag = async (tag) => {
  try {
    return await CallAPI('GET', `api/product/get-product-by-tag?tag_name=${tag}`)
  } catch (error) {
    throw error
  }
}

export const getAllColors = async () => {
  try {
    return await CallAPI("GET", `api/product/get`);
  } catch (error) {
    throw error;
  }
};

export const getAllVariants = async (page) => {
  try {
    return await CallAPI("GET", `api/variation/get?page=${page} `);
  } catch (error) {
    throw error;
  }
};

export const getAllVariationBasisOnVariant = async (id) => {
  try {
    return await CallAPI("GET", `api/variation-option/get/${id}`);
  } catch (error) {
    throw error;
  }
};

// add variant
export const addVariant = async (body) => {
  try {
    return await CallAPI("POST", "api/variation/add-variation/", body);
  } catch (error) {
    throw error;
  }
};

// add variation option
export const addVaraitionOption = async (body) => {
  try {
    return await CallAPI("POST", "api/variation-option/add-option", body);
  } catch (error) {
    throw error;
  }
};


// get product varainats
export const getProductVariants = async (id) => {
  try {
    return await CallAPI("GET", `api/product-config/get-single/${id}`);
  } catch (error) {
    throw error;
  }
};


// get all variations 
export const getAllVariation = async () => {
  try {
    return await CallAPI('GET', `api/variation-option/get-all-variations`)
  } catch (error) {
    throw error
  }
}

// get variation item
export const getOptionsByIds = async (ids) => {
  try {
    return await CallAPI(
      "GET",
      `api/variation-option/get-items-by-ids?list=${ids}`
    );
  } catch (error) {
    throw error;
  }
};

// get product variant options with name

export const getVariantOptions = async () => {
  try {
    return await CallAPI("GET", `api/cart/variation/get-variation`);
  } catch (error) {
    throw error;
  }
};



// get variant option based omn variant name 

export const getAllVariationBasisOnVariantName = async (name) => {
  try {
    return await CallAPI("GET", `api/variation-option/get-options/${name}`);
  } catch (error) {
    throw error;
  }
};


export const addToCart = async (id, body) => {
  try {
    return await CallAPI("POST", `api/cart/add-to-cart/${id}`, body);
  } catch (error) {
    throw error;
  }
};

// get carts of users
export const getCarts = async () => {
  try {
    return await CallAPI("GET", `api/cart/get-cart-items`);
  } catch (error) {
    throw error;
  }
};



// deleet cart item 

export const DeleteCartItem = async (body) => {
  try {
    return await CallAPI("POST", `api/cart/delete-item`, body);
  } catch (error) {
    throw error;
  }
};






// Add Images to Product
export const addImages = async (body) => {
  try {
    return await CallAPI("POST", `api/gallery/add-images`, body);
  } catch (error) {
    throw error;
  }
};



// get images 



export const getImages = async () => {
  try {
    return await CallAPI("GET", `api/gallery/get-images`)
  } catch (error) {
    throw error
  }
}


// get payment methids 
export const getPaymentMethods = async () => {
  try {
    return await CallAPI('GET', 'api/order/payment-type')
  } catch (error) {
    throw error
  }
};







// order place api 


export const placeOrder = async (body) => {
  try {
    return await CallAPI('POST', `api/order/place-order`, body)
  } catch (error) {
    throw error
  }
}


// get order of user 

export const getOrders = async (page) => {
  try {
    return await CallAPI('GET', `api/order/get-user-order/?page=${page}`)
  } catch (error) {
    throw error
  }
}


export const getOrderWithProducts = async (id) => {
  try {
    return await CallAPI('GET', `api/order/get-single-order-detail/${id}`);
  } catch (error) {
    throw error
  }
}



// admin get all orders 

export const getAllOrders = async (page) => {
  try {
    return await CallAPI("GET", `api/order/get-all-orders/?page=${page}`)
  } catch (error) {
    throw error
  }
}


export const getSingleOrder = async (id) => {
  try {
    return await CallAPI('GET', `api/order/get-single/${id}`)
  } catch (error) {
    throw error
  }
}



// update order status 


export const updateOrderStatus = async (id, body) => {
  try {
    return await CallAPI("PUT", `api/order/update-order-status/${id}`, body)
  } catch (error) {
    throw error
  }
}




// add addresses 



export const addAddress = async (body) => {
  try {
    return await CallAPI('POST', `api/address/add-address`, body)
  } catch (error) {
    throw error

  }

}

export const getAddreses = async () => {
  try {
    return await CallAPI('GET', `api/address/get`)
  } catch (error) {
    throw error
  }
}



// delete addresss 

export const deleteAddress = async (id) => {
  try {
    return await CallAPI("POST", `api/address/delete/${id}`)
  } catch (error) {
    throw error
  }
}




// add tags 


export const addTags = async (body) => {
  try {
    return await CallAPI("POST", `api/tags/add-tag`, body)
  } catch (error) {
    throw error
  }
}



// get tags 


export const getTags = async () => {
  try {
    return await CallAPI("GET", `api/tags/get-tags`)
  } catch (error) {
    throw error
  }
}



// add tag in product 

export const addProductTags = async (body) => {
  try {
    return await CallAPI("POST", `api/product-config/add-product-tag`, body)
  } catch (error) {
    throw error
  }
}



export const getProductTags = async (id) => {
  try {
    return await CallAPI("GET", `api/tags/get-product-tags/${id}`)
  } catch (error) {
    throw error
  }
}


export const deleteProductTags = async (body) => {
  try {
    return await CallAPI('POST', `api/tags/delete-tag`, body)
  } catch (error) {
    throw error
  }
}

export const deleteSingleTag = async (body) => {
  try {
    return await CallAPI('POST', `api/tags/tag-delete`, body)
  } catch (error) {
    throw error
  }
}


export const addPaymentMethod = async (body) => {
  try {
    return await CallAPI("POST", `api/payment/add-payment-method`, body)
  } catch (error) {
    throw error
  }
}


export const GetPaymentMethods = async () => {
  try {
    return await CallAPI("GET", `api/payment/get-payment-method`)
  } catch (error) {
    throw error
  }
}


export const UpdatePaymentMethod = async (id, body) => {
  try {
    return await CallAPI('PUT', `api/payment/update-payment-method/${id}`, body)
  } catch (error) {
    throw error

  }
}

export const getSinglePaymentMethod = async (id) =>{
  try {
    return await CallAPI('GET', `api/payment/get-single-payment-method/${id}`)
    
  } catch (error) {
    throw error
  }
}


export const deletePaymentMethod = async (id) => {
  try {
    return await CallAPI("POST", `api/payments/delete-payment-method/${id}`)
  } catch (error) {
    throw error
  }
}





// *****************admin dashboard ****************

// get catgeories 

export const GetCategories = async () => {
  try {
    return await CallAPI("GET", `api/product-category/get`)
  } catch (error) {
    throw error
  }
}






// get shipping methods 

export const GetShippingMethod = async () => {
  try {
    return await CallAPI("GET", `api/shipping/get-shiping-method`)
  } catch (error) {
    throw error
  }
}



// add shipping method 

export const addShippingMethods = async (body) => {
  try {
    return await CallAPI("POST", "api/shipping/add-shipping-method", body);
  } catch (error) {
    throw error;
  }
};

// deleete shipping method 

export const deleteShippingMethod = async (id) =>{
  try {
    return await CallAPI('DELETE',`api/shipping/delete-shipping-method/${id}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}


// update shipping mthod 


export const updateShippingMethod = async (id,body) =>{
  try {
    
    return await CallAPI('PUT',`api/shipping/update-shipping-method/${id}`,body)
  } catch (error) {
    console.log(error)
    throw error
  }
}



// get single shipping method 

export const getSingleShippingMethod = async (id) =>{
  try {
    return await CallAPI('GET',`api/shipping/get-single/${id}`)
  } catch (error) {
    throw error
  }
}





// get product variations 

export const getSingleProductVariations = async (id,page) => {
  try {
    return await CallAPI("GET", `api/product-config/get-product-config/${id}?page={page}`)
  } catch (error) {
    throw error
  }
}
export const getProductVariations = async (page) => {
  try {
    return await CallAPI("GET", `api/product-config/get?page=${page}`)
  } catch (error) {
    throw error
  }
}




// get all users 


export const getAllUsers = async (page) => {
  try {
    return await CallAPI("GET", `api/user/get?page=${page}`);
  } catch (error) {
    throw error;
  }
};










/**  ---------------------------------------------------------------------------------------------------------- **/

const CallAPI = async (method, endpoint, data = null, queryParams = null) => {
  try {
    let response;

    switch (method) {
      case "GET":

        response = await axios.get(`${API_URL}/${endpoint}`, { params: queryParams, });
        break;

      case "POST":
        response = await axios.post(`${API_URL}/${endpoint}`, data, { params: queryParams, });
        break;

      case "PUT":
        response = await axios.put(`${API_URL}/${endpoint}`, data, { params: queryParams, });
        break;

      case "PATCH":
        response = await axios.patch(`${API_URL}/${endpoint}`, data, { params: queryParams, });
        break;

      case "DELETE":
        response = await axios.delete(`${API_URL}/${endpoint}`, data);
        break;

      default:
        throw new Error("Invalid HTTP method");
    }

    
    if (typeof response.data == "undefined") Alert("Error in API call");
    return response.data;

  } catch (error) {
    console.error(error);
    if (typeof error.response == "undefined") Alert("Server not responding");
    throw error.response ? error.response.data : error;
  }
};

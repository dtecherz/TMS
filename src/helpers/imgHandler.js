import Img_not_found from "../assets/placeholder-product-img.jpg";



export const handleImageError = (event) => {
    event.target.src = Img_not_found;
    event.target.onerror = null;
    event.target.alt = "Not Found";
};

require("dotenv").config();

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const logger = require("morgan");
const cors = require("cors");

const { PORT, MODE } = require('./config/config');
const connectDb = require('../src/db/db')
connectDb()

app.use("/assets/files", express.static("./Tms_uploads"));


var whitelist = ['http://localhost:5173','http://localhost:3000'] 

if(process.env.MODE == "production") whitelist = ['https://themangosole.com','https://dashboard.themangosole.com'] 

app.use(cors({
    origin: function (origin, callback) {
        
        if (whitelist.includes(origin)) {
            callback(null, true)
            
        } else if(MODE != "production" && !origin) {
            callback(null, true)
            
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
}));


app.use(logger("dev"));
// app.use(bodyParser.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



const userRoutes = require('./routes/userRoutes')
const prodcutCategoryRoutes = require('./routes/categoryRoutes')
const imageRoutes = require('./routes/galleryRoutes')
const productRoutes = require('./routes/productRoutes')
const variationRoutes = require('./routes/variationRoutes')
const variationOptionRoutes = require('./routes/variationOptionRoutes')
const productConfigRoutes = require('./routes/productConfigRoutes');
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentMethodRoutes')
const platformRoutes = require('./routes/platformRoutes')
const subscriberRoutes = require('./routes/subscriberRoutes')
const shippingRoutes = require('./routes/shippingRoutes')


app.use('/api/user', userRoutes)
app.use('/api/product-category', prodcutCategoryRoutes)
app.use('/api/gallery', imageRoutes)
app.use('/api/products', productRoutes)
app.use('/api/variation', variationRoutes)
app.use('/api/variation-option', variationOptionRoutes)
app.use('/api/product-config', productConfigRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/platform', platformRoutes)
app.use('/api/subscriber', subscriberRoutes)
app.use('/api/shipping', shippingRoutes)


app.listen(PORT, () => {
    console.log(`server is runing  ${PORT}`)
})
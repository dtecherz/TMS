const Product = require('../models/productModel');
const categoryModel = require('../models/categoryModels');
const Category = require('../models/categoryModels')
const ViewsModel = require('../models/ViewsModel')

const productController = {

    async addProduct(req, res) {
        try {
            const productData = {
                name: req.body.name,
                short_description: req.body.short_description,
                category_id: req.body.category_id,
                long_description: req.body.long_description,
                status: req.body.status || "active",
                stock_management: req.body.stock_management,
                SKU: req.body.SKU,
                price: req.body.price,
                discount: req.body.discount,
                total_quantity: req.body.total_quantity || null,
                images: req.body.images // Assuming image ID is provided in the request body
            };

            if (!productData.name) return res.status(400).send({ success: false, message: "product name is required" })
            if (!productData.category_id) return res.status(400).send({ success: false, message: "category is required" })
            if (!productData.price) return res.status(400).send({ success: false, message: "product price is required" })

            // Check if the product already exists
            const existingProduct = await Product.findOne({ name: productData.name });
            if (existingProduct) {
                return res.status(400).send({
                    message: "This product already exists"
                });
            }


            // find proiducts in that category 

            const categoryCount = await Product.find({ category_id: productData.category_id }).countDocuments()
            console.log('category', categoryCount)

            const updateProuductCountInCategory = await Category.findByIdAndUpdate({ _id: productData.category_id }, { pCount: categoryCount + 1 })
            // Create a new product
            const newProduct = new Product(productData);
            const savedProduct = await newProduct.save();

            res.status(200).send({
                success: true,
                message: "Product added successfully",
                data: savedProduct
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding product",
                error: error.message
            });
        }
    },


    // update product 
    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            // const slug = req.params.slug

            let updateData = {};
            if (req.body.category_id) {
                updateData.category_id = req.body.category_id;
            }
            if (req.body.name) {
                updateData.name = req.body.name;
            }
            if (req.body.discount) {
                updateData.discount = req.body.discount;
            }
            if (req.body.short_description) {
                updateData.short_description = req.body.short_description;
            }
            if (req.body.long_description) {
                updateData.long_description = req.body.long_description;
            }
            if (req.body.stock_management) {
                updateData.stock_management = req.body.stock_management;
            }
            if (req.body.status) {
                updateData.status = req.body.status;
            }
            if (req.body.price) {
                updateData.price = Math.round(req.body.price);
            }
            if (req.body.SKU) {
                updateData.SKU = req.body.SKU
            }
            if (req.body.total_quantity) {
                updateData.total_quantity = req.body.total_quantity;
            }
            // Handle images
            if (req.body.images) {
                // Extract only the _id from each image object
                updateData.images = req.body.images.map(image => image._id);
                console.log("imggg", updateData.images)
            }

            console.log('up', updateData)
            if (Object.keys(updateData).length > 0) {
                const updatedProduct = await Product.findByIdAndUpdate(id, updateData);

                if (!updatedProduct) {
                    return res.status(404).send({
                        success: false,
                        message: "Product not found"
                    });
                }

                return res.status(200).send({
                    success: true,
                    message: "Updated successfully",
                    product: updatedProduct
                });
            } else {
                return res.status(400).send({
                    success: false,
                    message: "No valid fields to update"
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, message: "something went wrong while updating product", error: error.message })
        }
    },


    // get single product 
    async getSingleProduct(req, res) {
        try {
            // const product_id = req.params.id
            const slug = req.params.slug
            console.log(';;;;;;;;;;;;;;;;;;;;;')
            // .populate({ path: 'images', select: 'image_url' })

            const product = await Product.findOne({slug:slug})
                .populate({ path: 'category_id', select: ['category_name', 'slug'] })
                .populate({ path: 'images', select: ["image_url", "_id"] })
                .populate({
                    path: 'productConfig',
                    populate: [
                        { path: 'size', select: 'name' },
                        { path: 'color', select: 'name' },
                        { path: 'material', select: 'name' }
                    ]
                });
                
            if (!product) {
                return res.status(404).send({ success: false, message: "Product not found" });
            }
            const product_id = product._id
            // console.log('ppp',product)
            // const relatedProducts = await Product.find({ category_id: product.category_id._id }).populate({ path: 'images', select: ["image_url", "-_id"] })

            // Fetch related products, excluding the current product
            const relatedProducts = await Product.find({
                category_id: product.category_id?._id,
                slug: { $ne: slug } // Exclude the current product
            }).populate({ path: 'images', select: ["image_url", "-_id"] });
            const getViewdproduct = await ViewsModel.findOne({ product_id: product_id })

            if (getViewdproduct) {
                let ProduuctViews = getViewdproduct.views
                getViewdproduct.views = ProduuctViews + 1
            }
            const newView = new ViewsModel({
                product_id: product_id,
                views: 1
            })
            await newView.save()
            return res.status(200).send({ success: true, message: "product got succesfully", productData: product, relatedProducts: relatedProducts })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false, message: "something went wrong while getting product", error: error.message
            })
        }
    },


    // get all products 
    async getAllProducts(req, res) {
        try {

            const limit = parseInt(process.env.ProductLimitPerPage)
            // const limit = 2
            const page = parseInt(req.query.page) || 1;
            console.log("page", page)
            let query = { status: "active" }
            const queryParams = req.query
            console.log('queryParams', queryParams)
            if (typeof queryParams.bestFor != "undefined" && queryParams.bestFor != "" && queryParams.bestFor != null) {
                console.log(queryParams.bestFor);
                console.log('decodeURIComponent', decodeURIComponent(queryParams.bestFor).split(' & '))

                let categories = await categoryModel.find({ slug: { $in: (queryParams.bestFor) } }, { _id: 1, category_name: 1 })
                categories = categories.map((e) => e._id)

                query.category_id = { $in: categories }
            }

            if (typeof queryParams.min != "undefined" && queryParams.min != "" && queryParams.min != null && typeof queryParams.max != "undefined" && queryParams.max != "" && queryParams.max != null) {
                query = { ...query, $and: [{ "price": { "$gte": queryParams.min } }, { "price": { "$lte": queryParams.max } }] }
            }
            console.log('query', query)
            console.log('.......query', { ...query })

            let sortQuery = {};
            if (typeof queryParams.price != "undefined" && (queryParams.price == '1' || queryParams.price == '-1')) {
                sortQuery.price = parseInt(queryParams.price);
            }

            const products = await Product.find({ ...query }, { long_description: 0, SKU: 0, productConfig: 0, createdAt: 0, updatedAt: 0, __v: 0, status: 0 })
                .populate({ path: 'productConfig' })
                .populate({ path: 'category_id', select: ["category_name"] })
                .populate({ path: 'images', select: ["image_url"] }).skip((page - 1) * limit).limit(limit).sort(sortQuery)

            const totalProducts = await Product.countDocuments(query);

            return res.status(200).send({ success: true, message: "product got succesfully", products: products, totalProducts: totalProducts, ProductLimitPerPage: limit })

        }


        catch (error) {
            console.log(error);
            return res.status(400).send({ success: false, message: "Something went wrong while gettig prodiuct", error: error.message });
        }
    },


    // delete product 
    async deleteProduct(req, res) {
        try {
            const product_id = req.params.id

            const product = await Product.findByIdAndDelete(product_id)
            return res.status(200).send({
                success: true,
                message: "product deleted sucesfully",
                product: product
            })

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while deleting product",
                error: error.message
            });
        }
    },


    // sort product api 
    async sortProduct(req, res) {
        try {
            const { latest, alphabetically, price } = req.query;
            const priceRange = req.body || 100
            const sorting = {};
            if (latest) {
                sorting.createdAt = -1;
            }
            if (alphabetically) {
                sorting['product_id.name'] = 1;
            }
            if (price) {
                sorting.price = 1;
            }

            const products = await Product.find({ price: { $gte: priceRange } }).sort(sorting);

            return res.status(200).send({
                success: true,
                message: "Products fetched successfully",
                products: products
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success: false,
                message: "somethign went wrong while filtering",
                error: error.message
            })
        }
    }

}


module.exports = productController
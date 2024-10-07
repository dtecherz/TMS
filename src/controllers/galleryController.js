const Gallery = require('../models/GalleryModel')



const galleryControllers = {



    async addImges(req, res) {
        try {
            const imagesData = req.files.images.map(image => ({
                image_url: `${req.userId}/${image.filename}`
            }));

            const newImages = await Gallery.insertMany(imagesData);

            return res.status(200).send({
                success: true,
                message: "Images added successfully",
                images: newImages
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding images",
                error: error.message
            });
        }
    },


    async getAllImages(req, res) {
        try {
            const images = await Gallery.find()

            if (images.length > 0) {
                return res.status(200).send({
                    success: true,
                    message: "images got succesfully",
                    images: images

                })
            } else {
                return res.status(200).send({
                    success: true,
                    message: "no images found in gallery",
                    images: []
                })
            }

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: "Something went wrong while adding images",
                error: error.message
            });
        }
    },


    // upload / embed image or video


    async embedVideoImages(req,res){
        try {
            const {image_url,source} = req.body

            const file = new Gallery({
                type:"video",
                image_url,
                source
            })
            await file.save()

            return res.status(200).send({
                success:true,
                message:"file embeded succesfully",
                file:file
                
            })
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                success:false,
                message:"something went wrong while adding",
                error:error.message
            })
        }
    },

}


module.exports = galleryControllers
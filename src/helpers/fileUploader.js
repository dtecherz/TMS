const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const userDataModel = require("../models/user");

// addes to Add a raandom number at place of userid when the user is guest because guest user is not logged in and has no token so we need to manage it in this way 
let x = Math.floor((Math.random() * 10000));

// Define the absolute path for the uploads directory
// const absoluteUploadsDir = path.join(__dirname, '..', '..', 'uploads');
const absoluteUploadsDir = path.join(__dirname, '..', '..', 'Tms_uploads');

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(absoluteUploadsDir)) fs.mkdirSync(absoluteUploadsDir);


// Define storage for multer
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {

        /**
         * 1) agr req.user.username hay to userId main set hojai req.user.username
         * 
         * 2) agr req.user.username nahi hay to phir check kerre hain k "complete-profile" wali API hit ki hay? agr han to phir
         *    API k params say userID nikal k user find kia hay db main or agr user milta hay to set hoga username else error throw hoga
         * 
         * 3) agr API "complete-profile" wali nahi hay or req.user.username bhi nahi hay to phir req.params.user set hoga userId main
         */
        
        // Get the user's ID or any other unique identifier
        let userId;

        if (typeof req.user != "undefined") {
            userId = req.user.userId;

        // } else if ((req.originalUrl).includes("complete-profile")) {
        //     const userid = (req.originalUrl).split("/")[3]
        //     const user = await userDataModel.findOne({ _id: userid }, { username: 1 });
        //     userId = user.username;

        } else {
            userId = req.params.userId  ||  "guest" + x.toString();
        }

        req.userId = userId

        console.log(req.files);

        // Create a directory for the user's uploads inside the uploads directory
        const userUploadDir = path.join(absoluteUploadsDir, userId.toString());
        if (!fs.existsSync(userUploadDir)) {
            fs.mkdirSync(userUploadDir, { recursive: true });
        }

        // Set the destination to the user's directory
        cb(null, userUploadDir);
    },
    filename: function (req, file, cb) {
        // Set the file name to be originalname
    
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });
const multiFiles = upload.fields([{ name: 'images', maxCount: 10 }])



module.exports = multiFiles
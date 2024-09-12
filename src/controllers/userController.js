const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Adjust the path to your model
const Cart = require('../models/cartModel')
const CartItem = require('../models/cartItemModel')
const jwt = require('../middlware/jwt');
const { addLog } = require('../services/logQueries');

const userController = {
  async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const requiredFields = { name, email, password, phone };

      // Validate required fields
      for (let field in requiredFields) {
        if (!requiredFields[field]) {
          return res.status(400).send({
            success: false,
            message: `${field} is required`,
          });
        }
      }
      if(phone.length < 11 || phone.length >13){
        return res.status(400).send({success:false,message:"invalid phone number"})
      }
      const validEmail = email.toLowerCase()
      console.log('email',email)
      console.log('validEmail',validEmail)

      // Check if the email already exists
      const existingUser = await User.findOne({ email:validEmail });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: 'Email already exists',
          error: 'Email already exists',
        });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log('hashedPassword', hashedPassword);

      // Create a new user
      const user = new User({
        name,
        email:validEmail,
        password: hashedPassword,
        phone
      });

      // Save the user to the database
      const savedUser = await user.save();
      const user_id = savedUser._id 

      // add log 

      await addLog(user_id, "register", { name, email });



      return res.status(200).send({
        success: true,
        data: savedUser,
        message: 'User registered successfully',

      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: 'Something went wrong while signing up',
        error: error.message,
      });
    }
  },


  async login(req, res) {
  
    try {
      const { guestUserId, email, password } = req.body;  // Ensure email is destructured properly

      if (!guestUserId) {
          console.log("email", email);  // Access email directly from destructured req.body

          const user = await User.findOne({ email: email });
          if (!user) {
              return res.status(400).send({
                  success: false,
                  message: "Invalid email",
              });
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              return res.status(400).send({
                  success: false,
                  message: "Wrong password",
              });
          }

          // Sanitize user object (remove password and OTP)
          const sanitizedUser = {
              _id: user._id,
              name: user.name,
              email: user.email,
          };

          // Generate JWT token
          const token = jwt.sign(
              {
                  userId: user._id,
                  email: user.email,
              },
              process.env.JWT_SECRET_KEY, // Ensure you have a secret key
              { expiresIn: '1h' } // Token expiration
          );

          await addLog(user._id, "login", { name: user.name, email: user.email });

          return res.status(200).send({
              success: true,
              message: "Logged in successfully",
              token: token,
              user: sanitizedUser,  // Send sanitized user object
          });
      }
    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ message: "internal server error", error: error.message })
    }

  },

  async getSingleUser(req, res) {
    try {
      const email = req.user.email;

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).send({
          success: false,
          message: 'Email does not exist',
          redirect: '/sign-in',
        });
      }

      delete user.password
      return res.status(200).send({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: 'Error fetching user data',
        error: error.message,
      });
    }
  },


  async getAllUsers(req, res) {
    try {

      const limit = process.env.UsersPerPage
      const page = parseInt(req.query.page) || 1

      const users = await User.find().skip((page - 1) * limit).limit(limit)
      
      const totalUsers = await User.countDocuments();

      return res.status(200).send({
        success: true,
        message: 'Got users',
        result: users,
        totalUsers:totalUsers,
        UsersPerPage:limit

      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: 'Error fetching users',
        error: error.message,
      });
    }
  },


  async updateUserDetails(req, res) {
    try {
      const userId = req.user.userId;
      const { oldPassword, newPassword, name, phone } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(400).send({
          success: false,
          message: "User does not exist",
        });
      }

      // Prepare fields to update
      let updateFields = {};
      if (name) {
        updateFields.name = name;
      }
      if (phone) {
        updateFields.phone = phone;
      }
      if (newPassword) {
        // Compare the entered old password with the hashed password from the database
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({
            success: false,
            message: "Current password is incorrect",
          });
        }

        // Hash the new password
        const genSalt = 10;
        const newHashedPassword = await bcrypt.hash(newPassword, genSalt);
        updateFields.password = newHashedPassword;
      }

      // If there are no fields to update, return an error
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).send({
          success: false,
          message: "No fields to update",
        });
      }

      // Update the user details in the database
      await User.findByIdAndUpdate(userId, updateFields, { new: true });

      return res.status(200).send({
        success: true,
        message: "User details updated successfully",
      });
    } catch (error) {
      console.error("Unexpected Error:", error);
      return res.status(500).send({
        success: false,
        message: "An unexpected error occurred",
        error: error.message,
      });
    }
  },



  // add guest user 

  async addGuestUser(req, res) {
    try {
      const userType = req.body.userType;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let username = '';
      let email = '';

      // Generate random username
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters.charAt(randomIndex);
      }

      // Generate random email
      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        email += characters.charAt(randomIndex);
      }

      const user = new User({
        name: username,
        email: email + "@gmail.com",
        password: "1vgkuyg3783qyk", // Modify domain name as needed
        role: "guest",
      });

      const savedUser = await user.save();
      const token = jwt.sign({
        userId: savedUser._id,
        email: savedUser.email,
      }, { expiresIn: '1h' }); // Adjust expiration time as needed

      res.status(200).send({
        success: true,
        message: "Guest user created successfully",
        token: token,
        user: savedUser,
      });


    } catch (error) {
      console.log(error)
      return res.status(400).send({
        success: false,
        message: "something went wrong while creating guest user",
        error: error.message

      })
    }
  }
};



module.exports = userController;

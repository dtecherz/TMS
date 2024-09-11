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
    // try {
    //     const {email,password} = req.body;
    //     const user = await User.findOne({email})
    //     console.log("user",user)

    //     if(!user){
    //         return res.status(400).send({
    //             success:false,
    //             message: "email does not exist",
    //         })

    //     }
    //     // compare passwordd 
    // const isPassword = await bcrypt.compare(password, user.password);
    // if(!isPassword){
    //     return res.status(400).send({
    //         success:false,
    //         message:"wrong password"
    //     })
    // }
    //     const token = jwt.sign({userId: user._id , email: user.email})


    //     return res.status(200).send({
    //       success:true,
    //       message:"Login succesfully",
    //       user,
    //       token
    //     })
    // }
    try {
      const { guestUserId, email, password } = req.body;

      if (!guestUserId) {
        console.log("email", req.body.email);
        
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).send({
            success: false,
            message: "invalid email",
          });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).send({
            success: false,
            message: "Wrong password",
          });
        }

        delete user._doc.password;
        delete user._doc.OTP;

        const token = jwt.sign({
          userId: user._id,
          email: user.email,
        }, { expiresIn: '1h' });
        let name = user.name
        let email = user.email


      await addLog(user._id, "login", { name, email });


        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          token: token,
          user: user,
        });
      }




      // for guest user id if avialable 


      
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({
          success: false,
          message: "invalid email",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send({
          success: false,
          message: "Wrong password",
        });
      }

      const userId = user._id;
      const userEmail = user.email;
      delete user._doc.password;
      delete user._doc.OTP;

      const token = jwt.sign({
        userId: userId,
        email: userEmail,
      }, { expiresIn: '1h' });

      const guestUserCart = await Cart.findOne({ user_id: guestUserId });
      console.log('guest cart', guestUserCart)

      if (guestUserCart !== null || guestUserCart) {
        const guestUserCartId = guestUserCart._id;
        console.log('guestUserCartId', guestUserCartId)
        const guestUserCartItems = await CartItem.find({ cart_id: guestUserCartId });
        console.log('guestUserCartItems', guestUserCartItems)

        if (guestUserCartItems.length > 0) {

          const logingUserCart = await Cart.findOne({ user_id: userId });

          if (logingUserCart || logingUserCart !== null) {
            const logingUserCartId = logingUserCart._id;
            const logingUserCartItems = await CartItem.find({ cart_id: logingUserCartId });

            if (logingUserCartItems.length > 0  || logingUserCartItems.length !== 0) {
              for (let loginUserCartItem of logingUserCartItems) {
                const matchingLoginCartItem = guestUserCartItems.find(guestCartItem =>


                 ( (guestCartItem.product_id.toString() === loginUserCartItem.product_id.toString()) &&
               ( guestCartItem.product_config_id.toString() === loginUserCartItem.product_config_id.toString()))
                );
                  console.log("yahn arha h >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",matchingLoginCartItem)
                  if (matchingLoginCartItem) {
                  console.log("yahn arha h <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                  const updatedQty = loginUserCartItem.quantity + matchingLoginCartItem.quantity;
                  console.log('updatedqty',updatedQty)
                  await CartItem.findOneAndUpdate({ _id: loginUserCartItem._id }, { quantity: updatedQty });
                  console.log('cartItem',CartItem)
                }
                if(!matchingLoginCartItem || matchingLoginCartItem == null){
                  await CartItem.findOneAndUpdate({cart_id:guestUserCartId},{cart_id:loginUserCartItem})
                }
              }
                console.log("guestUserId",guestUserId, "guestUserCartId",guestUserCartId)
              await User.deleteOne({ _id: guestUserId });
              await Cart.deleteOne({ user_id: guestUserId })
              await CartItem.deleteMany({ cart_id: guestUserCartId })

              return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token: token,
                user: user,
              });
            } else {
              await CartItem.updateMany({ cart_id: guestUserCartId }, { cart_id: logingUserCartId });
              await User.deleteOne({ _id: guestUserId });
              await Cart.deleteOne({ user_id: guestUserId })
              await CartItem.deleteMany({ cart_id: guestUserCartId })
              return res.status(200).send({
                success: true,
                message: "Logged in successfully",
                token: token,
                user: user,
              });
            }
          } else {
            await Cart.findOneAndUpdate({ user_id: guestUserId }, { user_id: userId });
            await User.deleteOne({ _id: guestUserId });

            return res.status(200).send({
              success: true,
              message: "Logged in successfully",
              token: token,
              user: user,
            });
          }
        } else {
          await User.deleteOne({ _id: guestUserId });
          await Cart.deleteOne({ user_id: guestUserId })
          return res.status(200).send({
            success: true,
            message: "Logged in successfully",
            token: token,
            user: user,
          });
        }
      } else {
        await User.deleteOne({ _id: guestUserId });

        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          token: token,
          user: user,
        });
      }
    }
    catch (error) {
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

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const secretKey = 'hassan';

const jwtConfig = {

    sign(payload) {
        const token = jwt.sign(payload, secretKey)
        return token
    },

    verfiyToken(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]

            console.log('token', token)

            if (!token) {
                throw 'no token provided';

            } else {
                const decoded = jwt.verify(token, secretKey)
                console.log(decoded)
                console.log('agya', decoded.userId)
                // Add the decoded payload to the request object
                req.user = decoded;
                next();

            }

        } catch (error) {
            console.log(error)
            return res.status(401).send({ success: false, message: error, signout: true, redirect: "/sign-in" })
        }
    },



    async IsAdmin(req, res, next) {
        try {

            const user = await User.findById({ _id: req.user.userId })
            console.log('userrrrrrrrrrr',user)
            if (!user) return res.status(400).send({ success: false, message: "no user found" })
            if (user.role != "admin") return res.status(400).send({ success: false, mesage: "un authorized access" })

            next()

        } catch (error) {
            console.log(error)
            return res.status(400).send({ success: false, message: "error in admin middlware", error: error.message })
        }
    }
}



module.exports = jwtConfig
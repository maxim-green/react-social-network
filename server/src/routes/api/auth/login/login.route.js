const express = require('express')
const router = express.Router()
const User = require('../../../../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const {generateTokens} = require('../../../../utils')

// /coreApi/auth/login
router.post('/',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    message: 'Invalid login data',
                    errors: errors.array()
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(401).json({resultCode: 1, message: "Wrong e-mail or password"})
            }

            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                return res.status(401).json({resultCode: 1, message: "Wrong e-mail or password"})
            }

            const {accessToken, refreshToken} = await generateTokens(user)

            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Success"})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

module.exports = router
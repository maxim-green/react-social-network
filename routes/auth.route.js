const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const defineUserByRefreshToken = require('../middleware/defineUserByRefreshToken.middleware')
const auth = require('../middleware/auth.middleware')
const generateTokens = require('../utils/functions')

// /api/auth/register
router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
        check('username', 'Username length should be at least 6 characters').isLength({min: 6}),
        check('firstName', 'Invalid first name').exists({checkFalsy: true}).not().isNumeric(),
        check('lastName', 'Invalid last name').exists({checkFalsy: true}).not().isNumeric(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    resultCode: 1,
                    message: 'Invalid registration data',
                    errors: errors.array()
                })
            }

            const {email, password, username, firstName, lastName} = req.body

            let candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({resultCode: 1, message: "User with this email already exists"})
            }
            candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({resultCode: 1, message: "User with this user name already exists "})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                registrationDate: new Date(),
                email,
                password: hashedPassword,
                username,
                profileData: { firstName, lastName }
            })
            await newUser.save()
            res.status(200).json({resultCode: 0, message: "Registration successful"})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)



// /api/auth/refresh-tokens
router.post('/refresh-tokens', defineUserByRefreshToken,
    async (req, res) => {
        try {
            const {user} = req
            if (!user) return res.status(400).json({resultCode: 1, message: "Invalid refresh token"})

            const {accessToken, refreshToken} = await generateTokens(user)
            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Tokens succesfully refreshed"})
        } catch (e) {
            console.log(e)
            if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: "Token invalid"})
            if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 1, message: "Token expired"})
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

// /coreApi/auth/login
router.post('/login',
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
                return res.status(400).json({resultCode: 1, message: "Wrong e-mail or password."})
            }

            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                return res.status(400).json({resultCode: 1, message: "Wrong e-mail or password."})
            }

            const {accessToken, refreshToken} = await generateTokens(user)

            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Succesfully logged in"})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

// /coreApi/auth/logout
router.delete('/logout', auth, async (req, res) => {
    try {
        const { user } = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        user.refreshToken = ""
        res
            .clearCookie('accessToken')
            .clearCookie('refreshToken')
            .status(200)
            .json({resultCode: 0, message: "Successfully logged out"})
    } catch (e) {
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /coreApi/auth/me
router.get('/me', auth, async (req, res) => {
    try {
        const { user } = req
        if (!user) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {email, username, profileData} = user

        res.status(200).json({resultCode: 0, message: "Authorized", data: {userId: user.id, email, username, profile: profileData}})
    } catch (e) {
        console.log(e)
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

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
                profileData: {
                    firstName,
                    lastName,
                    birthDate: null,
                    status: null,
                    bio: null,
                    interests: null,
                    coverImage: null,
                    avatar: {
                        small: null,
                        large: null
                    },
                    location: {
                        country: null,
                        city: null
                    },
                    contacts: {
                        website: null,
                        phone: null,
                        email: null,
                        vkontakte: null,
                        facebook: null,
                        github: null,
                        telegram: null,
                    }
                }
            })
            await newUser.save()
            res.status(200).json({resultCode: 0, message: "Registration successful"})
        } catch (e) {
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

// /api/auth/refresh-tokens
router.post('/refresh-tokens',
    async (req, res) => {
        try {
            const {refreshToken} = req.cookies
            const {userId} = await jwt.verify(refreshToken, config.get('jwtSecret'))
            const user = await User.findById(userId)

            const isEqual = refreshToken === user.refreshToken
            if (!isEqual) {
                user.refreshToken = ""
                await user.save()
                return res.status(400).json({resultCode: 1, message: "Refresh tokens not equal"})
            }

            // todo refactor to a separate function
            const access_token = jwt.sign(
                {userId: user.id, username: user.username},
                config.get('jwtSecret'),
                {expiresIn: '1m'}
            )

            const refresh_token = jwt.sign(
                {userId: user.id, username: user.username},
                config.get('jwtSecret'),
                {expiresIn: '60d'}
            )
            user.refreshToken = refresh_token
            await user.save()
            // todo refactor to a separate function

            res
                .cookie("accessToken", access_token, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refresh_token, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Tokens succesfully refreshed"})
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: "Token invalid"})
            if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 1, message: "Token expired"})
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

// /api/auth/login
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

            // todo refactor to a separate function
            const access_token = jwt.sign(
                {userId: user.id, username: user.username},
                config.get('jwtSecret'),
                {expiresIn: '1m'}
            )

            const refresh_token = jwt.sign(
                {userId: user.id, username: user.username},
                config.get('jwtSecret'),
                {expiresIn: '60d'}
            )
            user.refreshToken = refresh_token
            await user.save()
            // todo refactor to a separate function

            res
                .cookie("accessToken", access_token, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refresh_token, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Succesfully logged in"})
        } catch (e) {
            console.log(e)
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

// /api/auth/logout
router.delete('/logout', async (req, res) => {
    try {
        const {accessToken} = req.cookies
        if (!accessToken) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const user = await jwt.verify(accessToken, config.get('jwtSecret'))
        user.refreshToken = ""

        res
            .clearCookie('accessToken')
            .status(200)
            .json({resultCode: 0, message: "Successfully logged out"})
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: "Token invalid"})
        if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 1, message: "Token expired"})
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

// /api/auth/me
router.get('/me', async (req, res) => {
    try {
        const {accessToken} = req.cookies
        if (!accessToken) {
            return res.status(403).json({resultCode: 1, message: "Not authorized"})
        }

        const {userId} = await jwt.verify(accessToken, config.get('jwtSecret'))
        const {email, username} = await User.findById(userId)

        res.status(200).json({resultCode: 0, message: "Authorized", data: {userId, email, username}})
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) return res.status(403).json({resultCode: 10, message: "Token expired"})
        if (e instanceof jwt.JsonWebTokenError) return res.status(403).json({resultCode: 1, message: "Token invalid"})
        res.status(500).json({resultCode: 1, message: "Something went wrong :("})
    }
})

module.exports = router
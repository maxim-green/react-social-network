const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { defineUserByRefreshToken } = require('../../../../middleware/auth.middleware')
const {generateTokens} = require('../../../../utils')

// /api/auth/refresh-tokens
router.post('/', defineUserByRefreshToken,
    async (req, res) => {
        try {
            const {user} = req
            if (!user) return res.status(401).json({resultCode: 1, message: "Invalid token"})

            const {accessToken, refreshToken} = await generateTokens(user)
            res
                .cookie("accessToken", accessToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .cookie("refreshToken", refreshToken, {httpOnly: true}) // add secure: process.env.NODE_ENV === "production" option
                .status(200)
                .json({resultCode: 0, message: "Success"})
        } catch (e) {
            console.log(e)
            if (e instanceof jwt.JsonWebTokenError) return res.status(401).json({resultCode: 1, message: "Invalid token"})
            if (e instanceof jwt.TokenExpiredError) return res.status(401).json({resultCode: 1, message: "Invalid token"})
            res.status(500).json({resultCode: 1, message: "Something went wrong :("})
        }
    }
)

module.exports = router
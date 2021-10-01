const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const { refreshToken } = req.cookies
    if (!refreshToken) return next()

    try {
        const {userId} = jwt.verify(refreshToken, config.get('jwtSecret'))

        const candidate = await User.findById(userId)
        if (!refreshToken === candidate.refreshToken) {
            candidate.refreshToken = ""
            await candidate.save()
            return res.status(400).json({resultCode: 1, message: "Invalid refresh token"})
        }

        req.user = candidate
        return next()
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) console.log("Invalid refresh token")
        if (e instanceof jwt.TokenExpiredError) console.log("Expired refresh token")
    }

    return next()
}
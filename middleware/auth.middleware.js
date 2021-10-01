const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const { accessToken } = req.cookies
    if (!accessToken ) return next()

    try {
        const {userId} = await jwt.verify(accessToken, config.get('jwtSecret'))
        req.user = await User.findById(userId)
        return next()
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) console.log("Invalid access token")
        if (e instanceof jwt.TokenExpiredError) console.log("Expired access token")
    }

    return next()
}
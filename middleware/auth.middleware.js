const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const {accessToken} = req.cookies
        if (!accessToken) {
            next()
        }

        const {userId} = jwt.verify(accessToken, config.get('jwtSecret'))
        req.userId = userId
        next()

    } catch(e) {
        next()
    }
}
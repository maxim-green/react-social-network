const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {
    generateTokens: async (user) => {
        const accessToken = jwt.sign(
            {userId: user.id, username: user.username},
            config.get('jwtSecret'),
            {expiresIn: '10m'}
        )

        const refreshToken = jwt.sign(
            {userId: user.id, username: user.username},
            config.get('jwtSecret'),
            {expiresIn: '60m'}
        )
        user.refreshToken = refreshToken
        await user.save()

        return {accessToken, refreshToken}
    },

    removeItem: (array, value) => {
        const index = array.indexOf(value)
        if (index > -1) {
            array.splice(index, 1)
        }
    }
}
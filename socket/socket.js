const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')


const socket = (io) => {
    io.use(async (socket, next) => {
        if (!socket.request.headers['cookie']) {
            console.log('Not authorized.')
            return next(new Error('Socket connection error. Not authorized'))
        }

        const cookies = cookie.parse(socket.request.headers['cookie'])
        const {accessToken} = cookies

        if (!accessToken) {
            console.log('Not authorized.')
            return next(new Error('Socket connection error. Not authorized'))
        }

        try {
            const {userId} = await jwt.verify(accessToken, config.get('jwtSecret'))
            socket.user = await User.findById(userId)
            return next()
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
            if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
            return next(new Error('Socket connection error. Not authorized'))
        }

        return next()
    })

    io.sockets.on('connection', async (socket) => {
        const { user } = socket
        console.log(`${user.username} connected`)
        user.isOnline = true
        await user.save()

        socket.on('disconnect', async () => {
            console.log(`${user.username} disconnected`)
            user.isOnline = false
            await user.save()
        })

        socket.on('client-message', (message) => {
            const payload = {
                author: {
                    userId: user._id,
                    username: user.username,
                    firstName: user.profileData.firstName,
                    lastName: user.profileData.lastName,
                    avatar: user.profileData.avatar,
                },
                text: message
            }
            console.log(`Message from ${user.username}: ${message}`)
            io.emit('server-message', payload)
        })
    })
}

module.exports = socket
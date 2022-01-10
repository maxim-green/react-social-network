const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const {Server} = require('socket.io')


const socket = (server) => {
    const io = new Server(server)
    io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.request.headers['cookie'])
    const {accessToken} = cookies

    if (!accessToken ) {
        console.log('Not authorized.')
        return next(new Error('not authorized'))
    }

    try {
        const {userId} = await jwt.verify(accessToken, config.get('jwtSecret'))
        socket.user = await User.findById(userId)
        return next()
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) console.log("Invalid access token")
        if (e instanceof jwt.TokenExpiredError) console.log("Expired access token")
        return next(new Error("not authorized"))
    }

    return next()
})

    io.sockets.on('connection', (socket) => {
        console.log(`${socket.user.username} connected`)
        socket.on('disconnect', () => console.log(`${socket.user.username} disconnected`))

        socket.on('message', (message) => {
            console.log(`Message from ${socket.user.username}: ${message}`)
        })
    })
}

module.exports = socket
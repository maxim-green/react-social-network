const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Dialog = require('../models/Dialog')
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

        const dialogs = await Dialog.find({users: user.id}) // get all dialogs of connected user
        socket.join(dialogs.map(d => d.id))    // room id is dialog id

        socket.on('disconnect', async () => {
            console.log(`${user.username} disconnected`)
            user.isOnline = false
            await user.save()
        })

        socket.on('client-message', async(message, dialogId) => {
            const newMessage = {
                date: new Date(),
                author: user,
                text: message
            }
            console.log(`Message from ${user.username}: ${message}`)
            console.log(`Dialog: ${dialogId}`)
            await Dialog.findByIdAndUpdate(dialogId, {$push: {messages: newMessage}})

            // io.emit('server-message', newMessage)
        })
    })
}

module.exports = socket
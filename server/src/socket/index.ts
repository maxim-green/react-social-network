import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import {Server as SocketIOServer} from 'socket.io'
import {Server as HTTPServer} from 'http'

import {Dialog} from 'models'
import {getUserByAccessToken} from 'utils'
import {SocketWithUser} from 'types'
import {ioConfig} from 'configs'



const socket = (server: HTTPServer) => {
    const io = new SocketIOServer(server, ioConfig)

    io.use(async (socket: SocketWithUser, next) => {
        try {
            if (!socket.request.headers['cookie']) {
                return next(new Error('Socket connection error. Not authorized'))
            }

            const cookies = cookie.parse(socket.request.headers['cookie'])
            const {accessToken} = cookies

            if (!accessToken) {
                return next(new Error('Socket connection error. Not authorized'))
            }

            socket.user = await getUserByAccessToken(accessToken)
            return next()

        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
            if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
            return next(new Error('Socket connection error. Not authorized'))
        }
    })

    io.sockets.on('connection', async (socket: SocketWithUser) => {
        const {user} = socket
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

        socket.on('client-message', async (message, dialogId) => {
            const newMessage = {
                date: new Date(),
                author: user,
                text: message
            }
            console.log(`Message from ${user.username}: ${message}`)
            await Dialog.findByIdAndUpdate(dialogId, {$push: {messages: newMessage}})

            const responseMessage = {
                ...newMessage,
                dialogId: dialogId,
                author: {
                    userId: newMessage.author.id,
                    username: newMessage.author.username,
                    firstName: newMessage.author.firstName,
                    lastName: newMessage.author.lastName,
                    avatar: newMessage.author.avatar
                }
            }

            io.to(dialogId).emit('server-message', {dialogId, message: responseMessage})
        })
    })
}

export default socket
import {Server as SocketIOServer} from 'socket.io'
import {Server as HTTPServer} from 'http'
import {Types} from 'mongoose'

import {Dialog, Message} from 'models'
import {MessageType, MongooseDocument, PopulatedUserType, SocketWithUser} from 'types'
import {ioConfig} from 'configs'
import {socketAuth} from 'middleware'
import {findUserDialogs, getUnreadMessagesCount, getUserDialogs} from '../services'

const connectUser = async (user: MongooseDocument<PopulatedUserType>) => {
    console.log(`${user.username} connected`)
    user.isOnline = true
    await user.save()
}

const disconnectUser = async (user: MongooseDocument<PopulatedUserType>) => {
    console.log(`${user.username} disconnected`)
    user.isOnline = false
    await user.save()
}

const createMessage = async (author: MongooseDocument<PopulatedUserType>, text: MongooseDocument<MessageType>, dialogId: string) => {
    const message = new Message({
        author,
        dialog: new Types.ObjectId(dialogId),
        text
    })
    await message.save()
    return message
}

export const ioServer = (server: HTTPServer) => {
    const io = new SocketIOServer(server, ioConfig)

    io.use(socketAuth)

    io.sockets.on('connection', async (socket: SocketWithUser) => {

        const {user} = socket
        await connectUser(user)

        const dialogs = await getUserDialogs(user.id)
        socket.join(dialogs.map(d => d.id))    // room id is dialog id
        socket.join(user.id)

        io.to(user.id).emit('unread-messages', {
            dialogId: user.id,
            message: 'Connected to dialogs server',
            unreadMessagesCount: await getUnreadMessagesCount(user.id)
        })

        socket.on('disconnect', async () => {
            await disconnectUser(user)
        })

        socket.on('client-message', async (text, dialogId) => {
            const message = await createMessage(user, text, dialogId)

            const dialog = await Dialog.findByIdAndUpdate(dialogId, {$push: {messages: message}})
            console.log(user.id)
            const companionUserId = dialog.users.find(u => u.toString() !== user.id.toString())._id.toString()

            const responseMessage = await message
                .populate<{ author: PopulatedUserType }>('author', 'username firstName lastName avatar')

            io.to(dialogId)
                .emit('server-message', {dialogId, message: responseMessage})

            console.log(companionUserId)
            io.to(companionUserId)
                .emit('unread-messages', {
                    dialogId: companionUserId,
                    message: 'New message',
                    unreadMessagesCount: await getUnreadMessagesCount(companionUserId)
                })
        })
    })
}

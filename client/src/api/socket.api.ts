import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let serverMessageSubscribers = [] as Array<(message: MessageType) => void>
let unreadMessagesSubscribers = [] as Array<(unreadMessagesCount: number) => void>
let notAuthorizedSubscribers = [] as Array<() => void>

let socket = io('http://localhost:5000', {withCredentials: true, autoConnect: false, reconnection: true})

// handle dialog message from server
type ServerMessageResponseType = { dialogId: string, message: MessageType }
const handleServerMessage = (serverMessageResponse: ServerMessageResponseType) => {
    serverMessageSubscribers.forEach(s => s(serverMessageResponse.message))
}
socket.on('server-message', handleServerMessage)

// handle unread message notification from server
type UnreadMessagesResponseType = { unreadMessagesCount: number }
const handleUnreadMessages = (unreadMessagesResponse: UnreadMessagesResponseType) => {
    unreadMessagesSubscribers.forEach(s => s(unreadMessagesResponse.unreadMessagesCount))
}
socket.on('unread-message', handleUnreadMessages)

// handle not authorized event
const handleNotAuthorized = () => {
    notAuthorizedSubscribers.forEach(async s => await s())
}
socket.on('not-authorized', handleNotAuthorized)

socket.on('connect', () => console.log('Socket connection opened'))
socket.on('disconnect', () => console.log('Socket connection closed'))



export const socketApi = {
    connect() {
        if (!socket.connected) socket.connect()
    },
    disconnect() {
        if (socket.connected) {
            socket.disconnect()
            serverMessageSubscribers = []
            unreadMessagesSubscribers = []
            notAuthorizedSubscribers = []
        }
    },

    subscribe(
        serverMessageCallback: (message: MessageType) => void,
        unreadMessagesCallback: (unreadMessagesCount: number) => void,
        notAuthorizedCallback: () => void
    ) {
        serverMessageSubscribers.push(serverMessageCallback)
        unreadMessagesSubscribers.push(unreadMessagesCallback)
        notAuthorizedSubscribers.push(notAuthorizedCallback)
    },

    unsubscribe(
        serverMessageCallback: (message: MessageType) => void,
        unreadMessagesCallback: (unreadMessagesCount: number) => void,
        notAuthorizedCallback: () => void
    ) {
        serverMessageSubscribers = serverMessageSubscribers.filter(s => s !== serverMessageCallback)
        unreadMessagesSubscribers = unreadMessagesSubscribers.filter(s => s !== unreadMessagesCallback)
        notAuthorizedSubscribers = notAuthorizedSubscribers.filter(s => s !== notAuthorizedCallback)
    },
    readMessages(dialogId: string) {
        console.log('read message')
        socket.emit('read-message', dialogId)
    },
    sendMessage(message: string, dialogId: string) {
        socket.emit('client-message', message, dialogId)
    }
}

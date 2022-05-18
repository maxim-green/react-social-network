import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let serverMessageSubscribers = [] as Array<(message: MessageType) => void>
let unreadMessagesSubscribers = [] as Array<(unreadMessagesCount: number) => void>
let notAuthorizedSubscribers = [] as Array<() => void>
let authorizedSubscribers = [] as Array<() => void>
let connectSubscribers = [] as Array<() => void>

let socket = io(process.env.REACT_APP_API_URL + '/socket' || 'http://localhost:5000/socket', {withCredentials: true, autoConnect: false, reconnection: true})

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

const handleAuthorized = () => {
    authorizedSubscribers.forEach(s => s())
}
socket.on('authorized', handleAuthorized)

const handleConnect = () => {
    console.log('Socket connection opened')
    connectSubscribers.forEach(s => s())
}
socket.on('connect', handleConnect)
socket.on('disconnect', () => console.log('Socket connection closed'))



export const socketApi = {
    connect() {
        if (!socket.connected) socket.connect()
    },
    disconnect() {
        if (socket.connected) {
            socket.disconnect()
            connectSubscribers = []
            serverMessageSubscribers = []
            unreadMessagesSubscribers = []
            notAuthorizedSubscribers = []
            authorizedSubscribers = []
        }
    },

    subscribe(
        connectCallback: () => void,
        serverMessageCallback: (message: MessageType) => void,
        unreadMessagesCallback: (unreadMessagesCount: number) => void,
        notAuthorizedCallback: () => void,
        authorizedCallback: () => void
    ) {
        connectSubscribers.push(connectCallback)
        serverMessageSubscribers.push(serverMessageCallback)
        unreadMessagesSubscribers.push(unreadMessagesCallback)
        notAuthorizedSubscribers.push(notAuthorizedCallback)
        authorizedSubscribers.push(authorizedCallback)
    },

    unsubscribe(
        connectCallback: () => void,
        serverMessageCallback: (message: MessageType) => void,
        unreadMessagesCallback: (unreadMessagesCount: number) => void,
        notAuthorizedCallback: () => void,
        authorizedCallback: () => void
    ) {
        connectSubscribers = connectSubscribers.filter(s => s !== connectCallback)
        serverMessageSubscribers = serverMessageSubscribers.filter(s => s !== serverMessageCallback)
        unreadMessagesSubscribers = unreadMessagesSubscribers.filter(s => s !== unreadMessagesCallback)
        notAuthorizedSubscribers = notAuthorizedSubscribers.filter(s => s !== notAuthorizedCallback)
        authorizedSubscribers = authorizedSubscribers.filter(s => s !== authorizedCallback)
    },
    sendMessage(message: string, dialogId: string) {
        socket.emit('client-message', message, dialogId)
    }
}

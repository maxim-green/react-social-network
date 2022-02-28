import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let subscribers = [] as Array<(message: MessageType) => void>

let socket = io('http://localhost:5000', {withCredentials: true, autoConnect: false})

type ServerMessageResponseType = { dialogId: string, message: MessageType }
const handleServerMessage = (serverMessageResponse: ServerMessageResponseType) => {
    console.log('Message from server ', serverMessageResponse.message)
    subscribers.forEach(s => s(serverMessageResponse.message))
}

socket.on('server-message', handleServerMessage)

socket.on('connect', () => console.log('Socket connection opened'))
socket.on('disconnect', () => console.log('Socket connection closed'))

export const socketApi = {
    connect() {
        if (!socket.connected) socket.connect()
    },
    disconnect() {
        if (socket.connected) {
            socket.disconnect()
            subscribers = []
        }
    },
    subscribe(callback: (message: MessageType) => void) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: (message: MessageType) => void) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string, dialogId: string) {
        socket.emit('client-message', message, dialogId)
    },
    joinDialogs() {
        socket.emit('client-join-dialogs')
    }
}
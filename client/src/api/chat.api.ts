import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let subscribers = [] as Array<(message: MessageType) => void>

let socket = io('http://localhost:5000', {withCredentials: true, autoConnect: false})

const handleServerMessage = (message: MessageType) => {
    console.log('Message from server ' + message)
    subscribers.forEach(s => s(message))
}

// todo need to debug: after logout and then login again several messages show up on UI (on message sent)
export const chatApi = {
    connect() {
        if (!socket.connected) socket.connect()
        console.log('Socket connection opened')
    },
    disconnect() {
        if (socket.connected) socket.disconnect()
        console.log('Socket connection closed')
    },
    subscribe(callback: (message: MessageType) => void) {
        socket.on('server-message', handleServerMessage)
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },
    unsubscribe(callback: (message: MessageType) => void) {
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },

    sendMessage(message: string) {
        socket.emit('client-message', message)
    }
}
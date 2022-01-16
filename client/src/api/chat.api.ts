import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let subscribers = [] as Array<(message: MessageType) => void>

let socket = io('http://localhost:5000', {withCredentials: true, autoConnect: false})

const handleServerMessage = (message: MessageType) => {
    console.log('Message from server ', message)
    subscribers.forEach(s => s(message))
}

socket.on('server-message', handleServerMessage)

// todo need to debug: after logout and then login again several messages show up on UI (on message sent)
// unsubscribe isnt working (but its called). Subscribers array not changing after logout.
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

        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },
    unsubscribe(callback: (message: MessageType) => void) {
        console.log('before', subscribers)
            subscribers = subscribers.filter(s => s != callback)
        console.log('after', subscribers)
    },

    sendMessage(message: string) {
        socket.emit('client-message', message)
    }
}
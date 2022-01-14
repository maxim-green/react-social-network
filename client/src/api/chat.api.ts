import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let subscribers = [] as Array<(message: MessageType) => void>

let socket = io('http://localhost:5000', {withCredentials: true, autoConnect: false})

const handleServerMessage = (message: MessageType) => {
    console.log('Message from server ' + message)
    subscribers.forEach(s => s(message))
}

export const chatApi = {
    startListening() {
        socket.open()
    },
    stopListening() {
        socket.close()
    },
    subscribe(callback: (message: MessageType) => void) {
        socket.on('server-message', handleServerMessage)

        subscribers.push(callback)
        console.log('From subscribe', callback)
        return () => {
            subscribers = subscribers.filter(s => s != callback)
        }
    },
    unsubscribe(callback: (message: MessageType) => void) {
        return () => { subscribers = subscribers.filter(s => s != callback) }
    },
    sendMessage(message: string) {
        socket.emit('client-message', message)
    }
}
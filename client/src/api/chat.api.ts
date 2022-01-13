import {MessageType} from '../types/types'
import {io} from 'socket.io-client'

let subscribers = [] as Array<(message: MessageType) => void>

const socket = io('http://localhost:5000', {withCredentials: true})

const handleServerMessage = (message: MessageType) => {
    console.log('Message from server ' + message)
    subscribers.forEach(s => s(message))
}

socket.on('server-message', handleServerMessage)

export const chatApi = {
    subscribe(callback: (message: MessageType) => void) {
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
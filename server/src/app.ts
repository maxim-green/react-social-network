import 'dotenv/config'  // explanation for this: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import path from 'path'
import serveStatic from 'serve-static'

import api from 'routes'
import socket from 'socket'
import {expressConfig, ioConfig} from 'configs'

const PORT = process.env.PORT || 5000

const app = expressConfig(express())
const server = http.createServer(app)
const io = new Server(server, ioConfig)

app.use('/uploads/', serveStatic(path.join(__dirname, '../uploads')))
app.use('/api', api)

socket(io)
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
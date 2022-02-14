import 'dotenv/config'  // explanation for this: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import express from 'express'
import http from 'http'
import mongoose from 'mongoose'

import socket from 'socket'
import {expressConfig} from 'configs'

const app = expressConfig(express())
const server = http.createServer(app)

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        // connecting to database
        await mongoose.connect(process.env.DB_URI)

        // starting http server (express)
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        // starting ws server (socket.io)
        socket(server)
    } catch (e) {
        console.log(e)
    }
}
start()
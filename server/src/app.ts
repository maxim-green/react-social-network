import 'dotenv/config'  // explanation for this: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import serveStatic from 'serve-static'

import {NextFunction, Request, Response} from 'types'
import api from 'routes'
import socket from 'socket'

// TODO: migrate to using dotenv package https://www.npmjs.com/package/dotenv
const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})
socket(io)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/uploads/', serveStatic(path.join(__dirname, '../uploads')))
app.use('/api', api)


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
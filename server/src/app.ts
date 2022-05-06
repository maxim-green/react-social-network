import path from 'path'
global.__root = path.join(__dirname, '..')

import 'dotenv/config'  // explanation for this: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import http from 'http'
import mongoose from 'mongoose'

import {expressApp} from 'configs'
import {ioServer} from 'socket'

const PORT = process.env.PORT || 5000

const server = http.createServer(expressApp)
const start = async () => {
    try {
        // connecting to database
        await mongoose.connect(process.env.DB_URI)

        // starting http server (express)
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        // starting ws server (socket.io)
        ioServer(server)
    } catch (e) {
        console.log(e)
    }
}
start()

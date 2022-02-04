const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
})
require('./socket/socket')(io)
const config = require('config')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const serveStatic = require('serve-static')



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/uploads/', serveStatic(path.join(__dirname, '/uploads')))
app.use('/api', require('./routes/api/api.route'))



const PORT = config.get('port') || 5000
const start = async () => {
    try {
        await mongoose.connect(
            config.get('databaseURI'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const path = require('path')
const serveStatic = require('serve-static')



const PORT = config.get('port') || 5000

mongoose.set('useFindAndModify', false)

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
app.use('/api/auth/', require('./routes/auth.route'))
app.use('/api/profile/', require('./routes/profile.route'))
app.use('/api/users/', require('./routes/users.route'))
app.use('/api/posts/', require('./routes/posts.route'))
app.get('/testsocket', (req, res) => res.sendFile(__dirname + '/index.html'))

// want somehow to separate io to another file
io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.request.headers['cookie'])
    const {accessToken} = cookies
    console.log('Access token: ' + accessToken)

    if (!accessToken ) return next(new Error("not authorized"))

    try {
        const {userId} = await jwt.verify(accessToken, config.get('jwtSecret'))
        socket.user = await User.findById(userId)
        return next()
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) console.log("Invalid access token")
        if (e instanceof jwt.TokenExpiredError) console.log("Expired access token")
        return next(new Error("not authorized"))
    }

    return next()
})

io.on('connection', (socket) => {
    console.log(`${socket.user.username} connected`)
    socket.on('disconnect', () => console.log(`${socket.user.username} disconnected`))

    socket.on('message', (message) => {
        console.log(`Message from ${socket.user.username}: ${message}`)
    })
})


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
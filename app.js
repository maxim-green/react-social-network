const config = require('config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const serveStatic = require('serve-static')

const PORT = config.get("port") || 5000

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

const start = async () => {
    try {
        await mongoose.connect(
            config.get("databaseURI"),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
    } catch(e) {
        console.log(e)
    }
}

start()
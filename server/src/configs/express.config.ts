import express, {NextFunction, Request, Response} from 'express'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import serveStatic from 'serve-static'
import path from 'path'

import api from 'routes'
import {withErrorHandler} from 'middleware'

const expressApp = express()

console.log('Access-Control-Allow-Origin: ', process.env.URL + ':3000/')

expressApp.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL + ':3000/')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})
expressApp.use(bodyParser.json())
expressApp.use(cookieParser())
expressApp.use(withErrorHandler)

expressApp.use('/uploads', serveStatic(path.join(__dirname, '../../uploads')))
expressApp.use('/api', api)

export { expressApp }


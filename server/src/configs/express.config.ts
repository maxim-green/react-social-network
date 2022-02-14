import {Application} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import serveStatic from 'serve-static'
import path from "path"

import api from 'routes'
import {NextFunction, Request, Response} from 'types'

export const expressConfig = (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'content-type')
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        next()
    })
    app.use(bodyParser.json())
    app.use(cookieParser())

    app.use('/uploads', serveStatic(path.join(__dirname, '../../uploads')))
    app.use('/api', api)

    return app
}

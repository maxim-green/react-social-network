import {Application} from 'express'
import {NextFunction, Request, Response} from '../types'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

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

    return app
}

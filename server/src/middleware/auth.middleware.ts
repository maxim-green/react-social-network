import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'
import { SocketNextFunction, SocketWithUser } from 'types'
import {getUserByAccessToken} from 'services'
import {HTTPError} from 'helpers'
import cookie from 'cookie'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') return next()

    try {
        if (!req.cookies.accessToken) return next()
        req.user = await getUserByAccessToken(req.cookies.accessToken)

        return next()

    } catch (e) {
        console.log(e)
        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
        return next()
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user} = req
        if (!user) {
            throw new HTTPError(401, {resultCode: 1, message: 'Not authorized'})
        } else {
            return next()
        }
    } catch (e) {
        res.handleError(e)
    }
}

export const socketAuth = async (socket: SocketWithUser, next: SocketNextFunction) => {
    try {
        if (!socket.request.headers['cookie']) {
            return next(new Error('Socket connection error. Not authorized'))
        }

        const cookies = cookie.parse(socket.request.headers['cookie'])
        const {accessToken} = cookies

        if (!accessToken) {
            return next(new Error('Socket connection error. Not authorized'))
        }

        socket.user = await getUserByAccessToken(accessToken)
        return next()

    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
        return next(new Error('Socket connection error. Not authorized'))
    }
}
import jwt from 'jsonwebtoken'
import config from 'config'
import {Error} from 'mongoose'

import {User} from 'models'
import {Request, Response, NextFunction, UserType} from 'types'



const verifyToken = <T extends object>(token: string) => {
    return jwt.verify(token, config.get('jwtSecret')) as T
}

const getUserByRefreshToken = async (refreshToken: string) => {
    const { userId } = verifyToken<{ userId: string }>(refreshToken)    // validating RT

    const candidate = await User.findById(userId)
        .select('-password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!candidate) throw new Error('Invalid token')


    if (!(refreshToken === candidate.refreshToken)) {   // comparing provided RT with RT from database
        candidate.refreshToken = ''
        await candidate.save()
        throw new Error('Invalid token')
    }

    return candidate    // RT valid and matching RT from database
}

const getUserByAccessToken = async (accessToken: string) => {
    const { userId } = verifyToken<{ userId: string }>(accessToken)    // validating RT

    const user = await User.findById(userId)
        .select('-refreshToken -password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!user) throw new Error('Invalid token')

    return user
}



export const defineUserByRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.method === 'OPTIONS') return next()

        if (!req.cookies.refreshToken) return next()

        req.user = await getUserByRefreshToken(req.cookies.refreshToken)

        return next()

    } catch (e) {

        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid refresh token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired refresh token')
        next()

    }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.method === 'OPTIONS') return next()

        if (!req.cookies.accessToken) return next()

        req.user = await getUserByAccessToken(req.cookies.accessToken)

        return next()

    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user} = req
        if (!user) {
            return res.status(401).json({resultCode: 1, message: 'Not authorized'})
        } else {
            return next()
        }
    } catch (e) {
        return res.status(500).json({resultCode: 1, message: 'Something went wrong :('})
    }
}
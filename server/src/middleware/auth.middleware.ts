import jwt from 'jsonwebtoken'
import config from 'config'
import {Error} from 'mongoose'

import {User} from 'models'
import {Request, Response, NextFunction, JwtPayloadWithUserId, UserType} from 'types'

export const defineUserByRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const {refreshToken} = req.cookies
    if (!refreshToken) return next()

    try {
        await jwt.verify(
            refreshToken,
            config.get('jwtSecret'),
            async (err: Error, payload: JwtPayloadWithUserId) => {
                if (err) return next(new Error('Not authorized'))

                const candidate = await User.findById(payload.userId, 'refreshToken')

                if (!(refreshToken === candidate.refreshToken)) {
                    candidate.refreshToken = ''
                    await candidate.save()
                    return res.status(401).json({resultCode: 1, message: 'Invalid token'})
                }

                req.user = await User.findById(payload.userId)
                    .select('-refreshToken -password')
                    .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')
            })

        return next()
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid refresh token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired refresh token')
    }

    return next()
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    const {accessToken} = req.cookies
    if (!accessToken) return next()

    try {
        await jwt.verify(
            accessToken,
            config.get('jwtSecret'),
            async (err: Error, payload: JwtPayloadWithUserId) => {
                if (err) {
                    return next()
                }

                req.user = await User.findById(payload.userId)
                    .select('-refreshToken -password')
                    .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')
                return next()
            })
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) console.log('Invalid access token')
        if (e instanceof jwt.TokenExpiredError) console.log('Expired access token')
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const {user} = req
    if (!user) {
        return res.status(401).json({resultCode: 1, message: 'Not authorized'})
    } else {
        return next()
    }
}
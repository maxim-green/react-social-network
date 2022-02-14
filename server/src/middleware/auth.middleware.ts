import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'types'
import {getUserByAccessToken, getUserByRefreshToken} from 'utils'


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
        return next()
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
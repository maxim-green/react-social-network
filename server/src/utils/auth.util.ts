import {Error} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {User} from 'models'
import {UserType} from 'types'

export const verifyToken = <T extends object>(token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as T
}
export const getUserByRefreshToken = async (refreshToken: string) => {
    const {userId} = verifyToken<{ userId: string }>(refreshToken)    // validating RT

    const candidate = await User.findById(userId)
        .select('-password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!candidate) throw new Error('Invalid token')

    const isEqual = await bcrypt.compare(refreshToken, candidate.refreshToken)  // comparing provided RT with RT from database
    if (!isEqual) {
        candidate.refreshToken = ''
        await candidate.save()
        throw new Error('Invalid token')
    }

    return candidate    // RT valid and matching RT from database
}
export const getUserByAccessToken = async (accessToken: string) => {
    const {userId} = verifyToken<{ userId: string }>(accessToken)    // validating RT

    const user = await User.findById(userId)
        .select('-refreshToken -password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!user) throw new Error('Invalid token')

    return user
}
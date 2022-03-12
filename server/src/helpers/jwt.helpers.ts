import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import {MongooseDocument, PopulatedUserType, UserType} from 'types'

export const generateTokens = async (user: MongooseDocument<PopulatedUserType | UserType>, remember: boolean = false) => {
    const accessToken = jwt.sign(
        {userId: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_PERIOD}
    )

    const refreshToken = jwt.sign(
        {userId: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: remember ? process.env.REFRESH_TOKEN_EXPIRE_PERIOD_LONG : process.env.REFRESH_TOKEN_EXPIRE_PERIOD_SHORT}
    )

    user.refreshToken = await bcrypt.hash(refreshToken, 10)
    await user.save()

    return {accessToken, refreshToken}
}

export const verifyToken = <T extends object>(token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as T
}
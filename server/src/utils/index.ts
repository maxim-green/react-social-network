import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import {MongooseDocument, PopulatedUserType, UserType} from 'types'

export const generateTokens = async (user: MongooseDocument<PopulatedUserType | UserType>) => {
    const accessToken = jwt.sign(
        {userId: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '10m'}
    )

    const refreshToken = jwt.sign(
        {userId: user.id, username: user.username},
        process.env.JWT_SECRET,
        {expiresIn: '60m'}
    )
    user.refreshToken = await bcrypt.hash(refreshToken, 10)
    await user.save()

    return {accessToken, refreshToken}
}

export const removeItem = <T = any>(array: Array<T>, value: T) => {
    const index = array.indexOf(value)
    if (index > -1) {
        array.splice(index, 1)
    }
}

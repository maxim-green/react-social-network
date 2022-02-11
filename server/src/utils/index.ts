import config from 'config'
import jwt from 'jsonwebtoken'

import {MongooseDocument, UserType} from 'types'

export const generateTokens = async (user: MongooseDocument<UserType>) => {
    const accessToken = jwt.sign(
        {userId: user.id, username: user.username},
        config.get('jwtSecret'),
        {expiresIn: '10m'}
    )

    const refreshToken = jwt.sign(
        {userId: user.id, username: user.username},
        config.get('jwtSecret'),
        {expiresIn: '60m'}
    )
    user.refreshToken = refreshToken
    await user.save()

    return {accessToken, refreshToken}
}

export const removeItem = <T = any>(array: Array<T>, value: T) => {
    const index = array.indexOf(value)
    if (index > -1) {
        array.splice(index, 1)
    }
}

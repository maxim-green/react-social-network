import bcrypt from 'bcryptjs'
import {generateTokens, HTTPError} from 'utils'

import {MongooseDocument, PopulatedUserType, UserLoginData, UserRegistrationPayload, UserType} from 'types'
import {User} from 'models'
import jwt from 'jsonwebtoken'


const checkEmail = async (email: string) => {
    const candidate = await User.findOne({email})
    if (candidate) throw new HTTPError(409, {
        resultCode: 1,
        message: 'Email already taken'
    })
}

const checkUsername = async (username: string) => {
    const candidate = await User.findOne({username})
    if (candidate) throw new HTTPError(409, {
        resultCode: 1,
        message: 'Username already taken'
    })
}

export const getSimpleUserData = (user: MongooseDocument<PopulatedUserType>) => {
    return {
        _id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
    }
}

export const registerUser = async (payload: UserRegistrationPayload) => {
    await checkEmail(payload.email)
    await checkUsername(payload.username)

    const password = await bcrypt.hash(payload.password, 10)

    return await User.create({...payload, password})
}

export const loginUser = async (payload: UserLoginData) => {
    const user = await User.findOne({email: payload.email})

    const condition = user ? await bcrypt.compare(payload.password, user.password) : false
    if (!condition) throw new HTTPError(401, {
        resultCode: 1, message: 'Wrong e-mail or password'
    })

    const { accessToken, refreshToken } = await generateTokens(user)
    user.isOnline = true
    await user.save()

    return {user, accessToken, refreshToken}
}

export const logoutUser = async (user: MongooseDocument<PopulatedUserType>) => {
    user.isOnline = false
    user.refreshToken = null
    await user.save()
}

export const verifyToken = <T extends object>(token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET) as T
}

export const getUserByRefreshToken = async (refreshToken: string) => {
    const {userId} = verifyToken<{ userId: string }>(refreshToken) // validating RT

    const candidate = await User.findById(userId)
        .select('-password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!candidate) throw new HTTPError(401, {resultCode: 1, message: "Invalid token"})

    const isEqual = await bcrypt.compare(refreshToken, candidate.refreshToken)  // comparing provided RT with RT from database
    if (!isEqual) {
        candidate.refreshToken = null
        await candidate.save()
        throw new HTTPError(401, {resultCode: 1, message: "Invalid token"})
    }

    return candidate    // RT valid and matching RT from database
}

export const getUserByAccessToken = async (accessToken: string): Promise<MongooseDocument<PopulatedUserType>> => {
    const {userId} = verifyToken<{ userId: string }>(accessToken)    // validating RT

    const user = await User.findById(userId)
        .select('-refreshToken -password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!user) throw new HTTPError(401, {resultCode: 1, message: "Invalid token"})

    return user
}

export const refreshTokens = async (refreshToken: string) => {
    if (!refreshToken) throw new HTTPError(401, {resultCode: 1, message: "Invalid token"})

    const user = await getUserByRefreshToken(refreshToken)
    if (!user) throw new HTTPError(401, {resultCode: 1, message: "Invalid token"})

    return await generateTokens(user)
}


import bcrypt from 'bcryptjs'
import {generateTokens, HTTPError, verifyToken} from 'helpers'

import {
    MongooseDocument,
    PopulatedUserType,
    UpdateProfilePayload,
    LoginPayload,
    RegistrationPayload,
    UserType
} from 'types'
import {User} from 'models'
import {Document, FilterQuery} from 'mongoose'
import {saveAvatarImage, saveCoverImage} from './Image.service'

// todo: change all User.findOne to custom findUser function. Need to figure out how to select fields in this case.

export const findUser = async (filter: FilterQuery<Document>) => {
    const user = await User.findOne(filter)
    if (!user) throw new HTTPError(404, {resultCode: 1, message: `User not found`})
    return user
}

export const getUsers = async () => {
    return await User.find().select('username firstName lastName avatar subscriptions').lean()
}

export const getUserSubscriptions = async (user: MongooseDocument<PopulatedUserType>) => {
    return await User.find({_id: {$in: user.subscriptions}}).select('username firstName lastName avatar subscriptions').lean()
}

export const getUserProfile = async (username: string) => {
    const user = await User.findOne({username}).select('-refreshToken -password -incomingFriendshipRequests -outgoingFriendshipRequests')
    return user
}

export const getUserByAccessToken = async (accessToken: string): Promise<MongooseDocument<PopulatedUserType>> => {
    const {userId} = await verifyToken<{ userId: string }>(accessToken)    // validating RT

    const user = await User.findById(userId)
        .select('-refreshToken -password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!user) throw new HTTPError(401, {resultCode: 1, message: 'Invalid token'})

    return user
}

export const getUserByRefreshToken = async (refreshToken: string) => {
    const {userId} = verifyToken<{ userId: string }>(refreshToken) // validating RT

    const candidate = await User.findById(userId)
        .select('-password')
        .populate<{ subscriptions: Array<UserType> }>('subscriptions', 'username firstName lastName avatar subscriptions')

    if (!candidate) throw new HTTPError(401, {resultCode: 1, message: 'Invalid token'})

    const isEqual = await bcrypt.compare(refreshToken, candidate.refreshToken)  // comparing provided RT with RT from database
    if (!isEqual) {
        candidate.refreshToken = null
        await candidate.save()
        throw new HTTPError(401, {resultCode: 1, message: 'Invalid token'})
    }

    return candidate    // RT valid and matching RT from database
}


export const isEmailAvailable = async (email: string) => !(await User.findOne({email}))

export const isUsernameAvailable = async (username: string) => !(await User.findOne({username}))

export const createUser = async (payload: RegistrationPayload) => {
    const password = await bcrypt.hash(payload.password, 10)
    return await User.create({...payload, password})
}


export const loginUser = async (payload: LoginPayload) => {
    const user = await User.findOne({email: payload.email})

    const condition = user ? await bcrypt.compare(payload.password, user.password) : false
    if (!condition) throw new HTTPError(401, {
        resultCode: 1, message: 'Unauthorized', errors: [{field: 'form', message: 'Wrong e-mail or password'}]
    })

    const {accessToken, refreshToken} = await generateTokens(user)
    user.isOnline = true
    await user.save()

    return {user, accessToken, refreshToken}
}


export const logoutUser = async (user: MongooseDocument<PopulatedUserType>) => {
    user.isOnline = false
    user.refreshToken = null
    await user.save()
}


export const refreshTokens = async (refreshToken: string) => {
    if (!refreshToken) throw new HTTPError(401, {resultCode: 1, message: 'Invalid token'})

    const user = await getUserByRefreshToken(refreshToken)
    if (!user) throw new HTTPError(401, {resultCode: 1, message: 'Invalid token'})

    return await generateTokens(user)
}


export const updateAvatar = async (
    user: MongooseDocument<PopulatedUserType>,
    file: Express.Multer.File,
    crop: { x: number, y: number, width: number, height: number }
) => {
    user.avatar = await saveAvatarImage(file, crop)
    await user.save()
    return user.avatar
}


export const updateCoverImage = async (
    user: MongooseDocument<PopulatedUserType>,
    file: Express.Multer.File,
    crop: { x: number, y: number, width: number, height: number }
) => {
    user.coverImage = await saveCoverImage(file, crop)
    await user.save()
    return user.coverImage
}


export const updateStatus = async (
    user: MongooseDocument<PopulatedUserType>,
    status: string
) => {
    user.status = status
    await user.save()
}


export const updateProfile = async (
    user: MongooseDocument<PopulatedUserType>,
    payload: UpdateProfilePayload
) => {
    Object.assign(user, payload)
    await user.save()
}




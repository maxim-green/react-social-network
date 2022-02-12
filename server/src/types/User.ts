import {Types} from 'mongoose'
import {Override} from './custom'

export type UserType = {
    _id: Types.ObjectId
    createdAt: number
    refreshToken: string
    email: string
    password: string
    username: string
    isOnline: boolean
    firstName: string
    lastName: string
    avatar: {
        small: string
        large: string
    }
    birthDate: Date
    status: string
    bio: string
    coverImage: string
    location: {
        country: string
        city: string
    }
    contacts: {
        website: string
        vkontakte: string
        github: string
    }
    subscriptions: Array<Types.ObjectId>
}

export type PopulatedUserType = Override<UserType, {
    subscriptions: Array<UserType>
}>
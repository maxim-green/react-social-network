import {SchemaDefinitionProperty, Types} from 'mongoose'
import {Override} from './custom'

export type UserType = {
    _id: Types.ObjectId;
    id: string
    createdAt: number
    updatedAt: number
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

export type RegistrationPayload = {
    email: string
    password: string
    username: string
    firstName: string
    lastName: string
}
export type LoginPayload = {
    email: string
    password: string
    rememberMe: boolean
}

export type PopulatedUserType = Override<UserType, {
    subscriptions: Array<UserType>
}>
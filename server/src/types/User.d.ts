import {Types} from 'mongoose'

export type UserType = {
    _id: Types.ObjectId
    registrationDate: Date
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
    profile: {
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
    }
    subscriptions: Array<Types.ObjectId>
}
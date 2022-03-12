import {JwtPayload} from 'jsonwebtoken'
import {Socket} from 'socket.io'
import {Document} from 'mongoose'
import {HTTPError} from 'helpers'

import {PopulatedUserType} from './User'
import {ExtendedError} from 'socket.io/dist/namespace'
import {ValidationError} from 'express-validator'

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MongooseDocument<T> = T & Document<any, any, T>

export type JwtPayloadWithUserId = JwtPayload & { userId: string }

export type SocketWithUser = Socket & { user: MongooseDocument<PopulatedUserType> }

//socket.io next() function
export type SocketNextFunction = (err?: ExtendedError) => void

export type ErrorResponseData = {
    resultCode: number,
    message: string,
    errors?: Array<{field: string, message: string}>
}

export type HTTPErrorType = InstanceType<typeof HTTPError>

export type UpdateProfilePayload = {
    firstName: string,
    lastName: string,
    birthDate: string | null,
    bio: string | null,
    contacts: {
        website: string | null,
        vkontakte: string | null,
        github: string | null,
    },
    location: { country: string | null, city: string | null }
}
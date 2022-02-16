import {Request as TRequest, Response as TResponse, NextFunction as TNextFunction} from 'express'
import {JwtPayload} from 'jsonwebtoken'
import {Socket} from 'socket.io'
import {Document} from 'mongoose'
import {HTTPError} from 'utils'

import {PopulatedUserType} from './User'
import {ExtendedError} from 'socket.io/dist/namespace'
import {ValidationError} from 'express-validator'

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MongooseDocument<T> = T & Document<any, any, T>

// todo: refactor by extending
export type Request = TRequest & { user: MongooseDocument<PopulatedUserType> }     // property 'user' added in auth middleware
export type Response =
    TResponse
    & { handleError: (e: any) => void }
export type NextFunction = TNextFunction

export type JwtPayloadWithUserId = JwtPayload & { userId: string }

export type SocketWithUser = Socket & { user: MongooseDocument<PopulatedUserType> }

//socket.io next() function
export type SocketNextFunction = (err?: ExtendedError) => void

export type ErrorResponseData = {
    resultCode: number,
    message: string,
    errors?: Array<ValidationError>
}

export type HTTPErrorType = InstanceType<typeof HTTPError>
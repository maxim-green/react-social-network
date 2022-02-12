import {Request as TRequest, Response as TResponse, NextFunction as TNextFunction} from 'express'
import {JwtPayload} from 'jsonwebtoken'
import {Socket} from 'socket.io'
import {Document} from "mongoose"

import {PopulatedUserType, UserType} from './User'

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MongooseDocument<T> = T & Document<any, any, T>

export type Request = TRequest & { user: MongooseDocument<PopulatedUserType> }     // property 'user' added in auth middleware
export type Response = TResponse
export type NextFunction = TNextFunction

export type JwtPayloadWithUserId = JwtPayload & { userId: string }

export type SocketWithUser = Socket & { user: any }
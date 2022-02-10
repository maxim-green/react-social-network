import {Request as TRequest, Response as TResponse, NextFunction as TNextFunction} from 'express'
import {UserType} from 'User'
import {JwtPayload} from 'jsonwebtoken'
import {Socket} from 'socket.io'
import {Document} from "mongoose"

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type MongooseDocument<T> = T & Document<any, any, T>

export type Request = TRequest & { user: MongooseDocument<UserType> }     // property 'user' added in auth middleware
export type Response = TResponse
export type NextFunction = TNextFunction

export type JwtPayloadWithUserId = JwtPayload & { userId: string }

type SocketWithUser = Socket & { user: any }
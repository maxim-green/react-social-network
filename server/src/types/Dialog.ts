import {Types} from 'mongoose'

import {UserType} from './User'
import {Override} from './custom'

export type MessageType = {
    date: Date
    author: Types.ObjectId
    text: string
}

export type PopulatedMessageType = Override<MessageType, {
    author: UserType
}>

export type DialogType = {
    _id: Types.ObjectId
    created: Date
    updated: Date
    users: Array<Types.ObjectId>
    messages: Array<MessageType>
}

export type PopulatedDialogType = Override<DialogType, {
    users: Array<UserType>
    messages: Array<PopulatedMessageType>
}>
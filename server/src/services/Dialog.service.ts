import {Dialog, Message} from '../models'
import {Types} from 'mongoose'
import {MessageType, MongooseDocument, PopulatedDialogType, PopulatedMessageType, PopulatedUserType} from '../types'
import { Document } from 'mongodb'
import {HTTPError} from '../helpers'

export const getUserDialogs = async (userId: string) => {
    return Dialog.find({users: userId})
}

export const findUserDialogs = async (userId: string) => {
    // TODO consider refactoring using generic in populate() like it described here: https://mongoosejs.com/docs/typescript/populate.html
    const dialogs = await Dialog
        .find({users: userId})
        .select('-message')
        .populate('users', ['_id', 'username', 'firstName', 'lastName', 'avatar'])

    return dialogs.map(dialog => ({
        _id: dialog._id,
        createdAt: dialog.createdAt,
        updatedAt: dialog.updatedAt,
        companion: dialog.users.find(user => user._id.toString() !== userId)
    }))
}
export const findDialog = async (requestUser: Types.ObjectId, targetUser: Types.ObjectId) => {
    let dialog = await Dialog
        .findOne({
            $and: [
                {users: {$all: [requestUser, targetUser]}},
                {users: {$size: 2}}
            ]
        })
        .populate('users', ['_id', 'username', 'firstName', 'lastName', 'avatar'])
        .populate({
            path: 'messages',
            populate: {path: 'author', model: 'User', select: ['_id', 'username', 'firstName', 'lastName', 'avatar']}
        })
    return dialog
}

export const markMessagesAsRead = async (dialogId: Types.ObjectId, authorId: Types.ObjectId) => {
    return Message.updateMany({
        $and: [
            {dialog: dialogId},
            {author: authorId}
        ]
    }, {isRead: true})
}

export const markMessageAsRead = async (messageId: string, user: MongooseDocument<PopulatedUserType>) => {
    const message = await Message.findById(messageId).exec()
    const dialog = await Dialog.findById(message.dialog)
    // todo. seems like it works that way, but i need to figure out type error (remove ts-ignore)
    // @ts-ignore
    const readerUser = dialog.users.find(u => u._id.toString() !== message.author._id.toString())

    if (readerUser._id.toString() === user._id.toString()) {
        message.isRead = true
        await message.save()
        return message.populate({path: 'author', model: 'User', select: ['_id', 'username', 'firstName', 'lastName', 'avatar']})
    } else {
        throw new HTTPError(401, {resultCode: 1, message: 'Not authorized'})
    }
}

export const getUnreadMessagesCount = async (userId: string) => {
    const dialogs = await findUserDialogs(userId)

    const unreadMessages = await Message.find({
        $and: [
            {dialog: {$in: dialogs}},
            {author: {$ne: userId}},
            {isRead: false}
        ]
    })

    return unreadMessages.length
}

export const createDialog = async (userId1: Types.ObjectId, userId2: Types.ObjectId) => {
    const dialog = new Dialog({
        date: new Date(),
        users: [userId1, userId2],
        messages: []
    })
    await dialog.save()

    return dialog
}

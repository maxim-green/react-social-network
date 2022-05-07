import {Dialog, Message} from '../models'
import {Types} from 'mongoose'
import {MongooseDocument, PopulatedDialogType} from '../types'
import { Document } from 'mongodb'

export const getUserDialogs = async (userId: string) => {
    return Dialog.find({users: userId})
}

export const findUserDialogs = async (userId: string) => {
    // TODO consider refactoring using generic in populate() like it described here: https://mongoosejs.com/docs/typescript/populate.html
    const dialogs = await Dialog
        .find({users: userId})
        .select('-messages')
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
    markMessagesAsRead(dialog.id, targetUser)


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

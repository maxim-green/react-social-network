import {Dialog} from '../models'
import {Types} from 'mongoose'

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
export const findDialog = async (userId1: Types.ObjectId, userId2: Types.ObjectId) => {
    let dialog = await Dialog
        .findOne({
            $and: [
                {users: {$all: [userId1, userId2]}},
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
export const createDialog = async (userId1: Types.ObjectId, userId2: Types.ObjectId) => {
    const dialog = new Dialog({
        date: new Date(),
        users: [userId1, userId2],
        messages: []
    })
    await dialog.save()

    return dialog
}
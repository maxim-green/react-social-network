import {MongooseDocument, PopulatedUserType} from 'types'
import {Types} from 'mongoose'
import {User} from 'models'
import {HTTPError} from 'helpers'

export const createSubscription = async (
    user: MongooseDocument<PopulatedUserType>,
    targetUserId: Types.ObjectId | string
) => {
    const targetUser = await User.findById(targetUserId).lean()

    if (user.subscriptions.includes(targetUser)) throw new HTTPError(409, {
        resultCode: 1,
        message: 'Already subscribed'
    })

    user.subscriptions.push(targetUser)
    await user.save()
}

export const deleteSubscription = async (
    user: MongooseDocument<PopulatedUserType>,
    targetUserId: Types.ObjectId | string
) => {
    const targetUser = await User.findById(targetUserId).lean()

    if (!user.subscriptions.includes(targetUser)) throw new HTTPError(404, {
        resultCode: 1,
        message: 'Requested resource not found'
    })

    const index = user.subscriptions.indexOf(targetUser)
    user.subscriptions.splice(index, 1)
    await user.save()
}
import {MongooseDocument, PopulatedUserType} from 'types'

export const getSimpleUserData = (user: MongooseDocument<PopulatedUserType>) => {
    return {
        _id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
    }
}
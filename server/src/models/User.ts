import {Schema, model, Types, Model} from 'mongoose'
import {UserType} from 'types'

const schema = new Schema<UserType>(
    {
        refreshToken: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        isOnline: {type: Boolean, required: true, default: false},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        avatar: {
            small: {type: String, default: null},
            large: {type: String, default: null}
        },
        birthDate: {type: Date, default: null},
        status: {type: String, default: null},
        bio: {type: String, default: null},
        coverImage: {type: String, default: null},
        location: {
            country: {type: String, default: null},
            city: {type: String, default: null}
        },
        contacts: {
            website: {type: String, default: null},
            vkontakte: {type: String, default: null},
            github: {type: String, default: null},
        },
        subscriptions: {type: [{ type: Types.ObjectId, ref: 'User' }], default: []},
    },
    {
        timestamps: true,
        collection: 'users'
    }
)



export const User: Model<UserType> = model('User', schema)

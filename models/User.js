const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        registrationDate: {type: Date, required: true},
        refreshToken: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        profileData: {
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            birthDate: {type: Date, default: null},
            status: {type: String, default: null},
            bio: {type: String, default: null},
            interests: {type: String, default: null},
            coverImage: {type: String, default: null},
            avatar: {
                small: {type: String, default: null},
                large: {type: String, default: null}
            },
            location: {
                country: {type: String, default: null},
                city: {type: String, default: null}
            },
            contacts: {
                website: {type: String, default: null},
                vkontakte: {type: String, default: null},
                github: {type: String, default: null},
            }
        },
        friends: [{ type: Types.ObjectId, ref: 'User' }],
        subscriptions: [{ type: Types.ObjectId, ref: 'User' }],
        incomingFriendshipRequests: [{ type: Types.ObjectId, ref: 'User' }],
        outgoingFriendshipRequests: [{ type: Types.ObjectId, ref: 'User' }],
    },
    {
        collection: 'users'
    }
)

module.exports = model('User', schema)

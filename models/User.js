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
            birthDate: {type: Date},
            status: {type: String},
            bio: {type: String},
            interests: {type: String},
            coverImage: {type: String},
            avatar: {
                small: {type: String},
                large: {type: String}
            },
            location: {
                country: {type: String},
                city: {type: String}
            },
            contacts: {
                website: {type: String},
                phone: {type: String},
                email: {type: String},
                vkontakte: {type: String},
                facebook: {type: String},
                github: {type: String},
                telegram: {type: String},
            }
        },
        friends: [{ type: Types.ObjectId, ref: 'User' }],
        subscriptions: [{ type: Types.ObjectId, ref: 'User' }]
    },
    {
        collection: 'users'
    }
)

module.exports = model('User', schema)

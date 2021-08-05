const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        creationDate: {type: Date, required: true},
        author: {
            type: {
                id: { type: Types.ObjectId, ref: 'User' },
                username: {type: String},
                firstName: {type: String},
                lastName: {type: String},
                avatar: {type: String}, // from user's small avatar
            },
            required: true
        },
        text: {type: String, required: true},
        likes: [{ type: Types.ObjectId, ref: 'User' }],
        comments: [{
            creationDate: {type: Date, required: true},
            author: {
                type: {
                    id: { type: Types.ObjectId, ref: 'User' },
                    username: {type: String},
                    firstName: {type: String},
                    lastName: {type: String},
                    avatar: {type: String}, // from user's small avatar
                },
                required: true
            },
            text: {type: String, required: true},
            likes: [{ type: Types.ObjectId, ref: 'User' }],
        }],
    },
    {
        collection: 'posts'
    }
)

module.exports = model('Post', schema)

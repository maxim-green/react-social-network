const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        creationDate: {type: Date, required: true},
        status: {type: String, required: true},
        user1: {type: { type: Types.ObjectId, ref: 'User' }, required: true},
        user2: {type: { type: Types.ObjectId, ref: 'User' }, required: true},
        },
    {
        collection: 'friendships'
    }
)

module.exports = model('Friendship', schema)

const {Schema, model, Types} = require('mongoose')

const schema = new Schema(
    {
        creationDate: {type: Date, required: true},
        author: { type: Types.ObjectId, ref: 'User', required: true},
        text: {type: String, required: true},
        likes: [{ type: Types.ObjectId, ref: 'User' }],
        comments: [{
            creationDate: {type: Date, required: true},
            author: { type: Types.ObjectId, ref: 'User', required: true},
            text: {type: String, required: true},
            likes: [{ type: Types.ObjectId, ref: 'User' }],
        }],
    },
    {
        collection: 'posts'
    }
)

module.exports = model('Post', schema)

const {Schema, model, Types} = require('mongoose')

const Message = new Schema({
    date: {type: Date, required: true, default: new Date()},
    author: { type: Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true}
})

const schema = new Schema(
    {
        created: {type: Date, required: true, default: new Date()},
        updated: {type: Date, required: true, default: new Date()},
        users: {type: [{ type: Types.ObjectId, ref: 'User' }], required: true, default: []},
        messages: {type: [Message], required: true, default: []}
    },
    {
        collection: 'dialogs'
    }
)

module.exports = model('Dialog', schema)
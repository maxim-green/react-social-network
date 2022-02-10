import {Schema, model, Types, Model} from 'mongoose'
import {DialogType, MessageType} from 'Dialog'

// TODO: Move message to separate model. Use Message ObjectId in messages in Dialog schema.

const Message = new Schema<MessageType>({
    date: {type: Date, required: true, default: new Date()},
    author: { type: Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true}
})

const schema = new Schema<DialogType>(
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

export const Dialog: Model<DialogType> = model('Dialog', schema)
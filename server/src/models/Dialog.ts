import {Schema, model, Types, Model} from 'mongoose'
import {DialogType, MessageType} from 'types'

// TODO: Move message to separate model. Use Message ObjectId in messages in Dialog schema.

const Message = new Schema<MessageType>({
    author: { type: Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true}
}, {
    timestamps: true
})

const schema = new Schema<DialogType>(
    {
        users: {type: [{ type: Types.ObjectId, ref: 'User' }], required: true, default: []},
        messages: {type: [Message], required: true, default: []}
    },
    {
        timestamps: true,
        collection: 'dialogs'
    }
)

export const Dialog: Model<DialogType> = model('Dialog', schema)
import {Schema, model, Types, Model} from 'mongoose'

type MessageType = {
    date: Date
    author: Types.ObjectId
    text: string
}

type DialogType = {
    created: Date
    updated: Date
    users: Array<Types.ObjectId>
    messages: Array<MessageType>
}

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
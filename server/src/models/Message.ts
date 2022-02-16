import {model, Model, Schema, Types} from 'mongoose'
import {MessageType} from 'types'

const schema = new Schema<MessageType>({
    author: { type: Types.ObjectId, ref: 'User', required: true},
    dialog: { type: Types.ObjectId, ref: 'Dialog', required: true},
    text: {type: String, required: true}
}, {
    timestamps: true,
    collection: 'messages'
})

export const Message: Model<MessageType> = model('Message', schema)
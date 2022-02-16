import {Schema, model, Types, Model} from 'mongoose'
import {DialogType} from 'types'

const schema = new Schema<DialogType>(
    {
        users: {type: [{ type: Types.ObjectId, ref: 'User' }], required: true, default: []},
        messages: {type: [{ type: Types.ObjectId, ref: 'Message' }], required: true, default: []}
    },
    {
        timestamps: true,
        collection: 'dialogs'
    }
)

export const Dialog: Model<DialogType> = model('Dialog', schema)
import {Schema, model, Types, Model} from 'mongoose'
import {PostType} from 'types'

// TODO: move comment to separate model and use it in this schema as ObjectId

const schema = new Schema<PostType>(
    {
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
        timestamps: true,
        collection: 'posts'
    }
)

export const Post: Model<PostType> = model('Post', schema)

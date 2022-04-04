import {Schema, model, Types, Model} from 'mongoose'
import {PostCommentType} from 'types'

const schema = new Schema<PostCommentType>(
    {
        author: { type: Types.ObjectId, ref: 'User', required: true},
        text: {type: String, required: true},
        likes: {type: [{ type: Types.ObjectId, ref: 'User' }], default: []},
    },
    {
        timestamps: true,
        collection: 'comments'
    }
)

export const PostComment: Model<PostCommentType> = model('PostComment', schema)

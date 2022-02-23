import {SchemaDefinitionProperty, Types} from 'mongoose'
import {UserType} from './User'
import {Override} from './custom'

export type CommentType = {
    creationDate: Date
    author: SchemaDefinitionProperty<Types.ObjectId>;
    text: string
    likes: Array<Types.ObjectId>
}

export type PostType = {
    _id: Types.ObjectId
    id: string
    creationDate: Date
    author: SchemaDefinitionProperty<Types.ObjectId>;
    text: string
    likes: Array<Types.ObjectId>
    comments: Array<CommentType>
}

export type PopulatedCommentType = Override<CommentType, {
    author: UserType
}>

export type PopulatedPostType = Override<PostType, {
    author: UserType
    likes: Array<UserType>
    comments: Array<PopulatedCommentType>
}>
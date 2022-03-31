import {SchemaDefinitionProperty, Types} from 'mongoose'
import {UserType} from './User'
import {Override} from './custom'

export type PostCommentType = {
    createdAt: Date
    updatedAt: Date
    author: SchemaDefinitionProperty<Types.ObjectId>
    post: SchemaDefinitionProperty<Types.ObjectId>
    text: string
    likes: Array<Types.ObjectId>
}

export type PostType = {
    _id: Types.ObjectId
    id: string
    creationDate: Date
    author: SchemaDefinitionProperty<Types.ObjectId>;
    text: string
    images: Array<PostImage>
    likes: Array<Types.ObjectId>
    comments: Array<PostCommentType>
}

export type PostImage = {
    original: string,
    thumbnail: string
}

export type PopulatedCommentType = Override<PostCommentType, {
    author: UserType
}>

export type PopulatedPostType = Override<PostType, {
    author: UserType
    likes: Array<UserType>
    comments: Array<PopulatedCommentType>
}>
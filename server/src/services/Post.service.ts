import {Types} from 'mongoose'
import {Post, User} from 'models'
import {HTTPError} from 'helpers'
import {MongooseDocument, PopulatedUserType} from 'types'


export const getPosts = async () => {
    return await Post.find().populate('author', 'username firstName lastName avatar')
}

export const getUserPosts = async (userId: Types.ObjectId | string) => {
    return await Post.find({'author': userId}).populate('author', 'username firstName lastName avatar')
}

export const getPost = async (postId: Types.ObjectId | string) => {
    const post = await Post.findById(postId).populate('author', 'username firstName lastName avatar')
    if (!post) throw new HTTPError(404, {resultCode: 1, message: 'Post not found'})
    return post
}

export const createPost = async (
    author: MongooseDocument<PopulatedUserType>,
    text: string
) => {
    const post = await User.create({author, text})
    await Post.populate(post, {path: 'author', model: 'User', select: 'username firstName lastName avatar'})
    return post
}

export const deletePost = async (
    initiator: MongooseDocument<PopulatedUserType>,
    postId: Types.ObjectId | string
) => {
    const post = await getPost(postId)
    if (!(initiator === post.author)) throw new HTTPError(401, {resultCode: 1, message: 'Forbidden'})
    await post.delete()
}
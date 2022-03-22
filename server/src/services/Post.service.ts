import {Types} from 'mongoose'
import {Post, User} from 'models'
import {HTTPError} from 'helpers'
import {MongooseDocument, PopulatedUserType} from 'types'
import {findUser} from 'services'


export const getPosts = async () => {
    return Post.find().populate('author', 'username firstName lastName avatar')
}

export const getUserPosts = async (username: string) => {
            const user = await findUser({'username': username})
    return Post.find({'author': user.id}).populate('author', 'username firstName lastName avatar')
}

export const getSubscriptionsPosts = async (user: MongooseDocument<PopulatedUserType>) => {
    return Post.find({author: {$in: user.subscriptions}}).populate('author', 'username firstName lastName avatar')
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
    const post = await Post.create({author, text})
    await Post.populate(post, {path: 'author', model: 'User', select: 'username firstName lastName avatar'})

    return post
}

export const deletePost = async (
    initiator: MongooseDocument<PopulatedUserType>,
    postId: Types.ObjectId | string
) => {
    const post = await getPost(postId)

    // todo learn about post.author.id type error
    // @ts-ignore
    if (!(initiator.id === post.author.id)) throw new HTTPError(401, {resultCode: 1, message: 'Forbidden'})
    await post.delete()
}
import {Types} from 'mongoose'
import {Dialog, Post, User} from 'models'
import {HTTPError, removeItem} from 'helpers'
import {MongooseDocument, PopulatedUserType} from 'types'
import {findUser} from 'services'
import {savePostImage} from 'services/Image.service'
import {PostComment} from 'models/PostComment'

// TODO: resolve ts-ignore in this file

export const getPosts = async () => {
    return Post.find().populate('author', 'username firstName lastName avatar updatedAt')
        .populate('likes', 'username firstName lastName avatar updatedAt')
        .populate('comments.author', 'username firstName lastName avatar updatedAt')
}

export const getUserPosts = async (username: string) => {
    const user = await findUser({'username': username})
    return Post.find({'author': user.id})
        .populate('author', 'username firstName lastName avatar updatedAt')
        .populate('likes', 'username firstName lastName avatar updatedAt')
        .populate('comments.author', 'username firstName lastName avatar updatedAt')
}

export const getSubscriptionsPosts = async (user: MongooseDocument<PopulatedUserType>) => {
    return Post.find({author: {$in: user.subscriptions}})
        .populate('author', 'username firstName lastName avatar updatedAt')
        .populate('likes', 'username firstName lastName avatar updatedAt')
        .populate('comments.author', 'username firstName lastName avatar updatedAt')
}


export const getPost = async (postId: Types.ObjectId | string) => {
    const post = await Post.findById(postId)
        .populate('author', 'username firstName lastName avatar updatedAt')
        .populate('likes', 'username firstName lastName avatar updatedAt')
        .populate('comments.author', 'username firstName lastName avatar updatedAt')
    if (!post) throw new HTTPError(404, {resultCode: 1, message: 'Post not found'})
    return post
}

export const createPost = async (
    author: MongooseDocument<PopulatedUserType>,
    text: string
) => {
    const post = await Post.create({author, text})
    await Post.populate(post, {path: 'author', model: 'User', select: 'username firstName lastName avatar updatedAt'})

    return post
}

// todo: use on frontend
export const createPostNew = async (
    author: MongooseDocument<PopulatedUserType>,
    text: string,
    images: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[]
) => {
    const post = await Post.create({author, text})

    for (let i = 0; i < images.length; i++) {
        //@ts-ignore
        post.images.push(await savePostImage(images[i], post.id, i))
    }
    await post.save()

    await Post.populate(post, {path: 'author', model: 'User', select: 'username firstName lastName avatar updatedAt'})
    return post
}

export const deletePost = async (
    initiator: MongooseDocument<PopulatedUserType>,
    postId: Types.ObjectId | string
) => {
    const post = await getPost(postId)

    // @ts-ignore
    if (!(initiator.id === post.author.id)) throw new HTTPError(401, {resultCode: 1, message: 'Forbidden'})
    await post.delete()
}

export const addLike = async (postId: string, user: MongooseDocument<PopulatedUserType>) => {
    const post = await Post.findById(postId)
    if (!post) throw new HTTPError(404, {resultCode: 1, message: 'Post not found'})

    if (post.likes.includes(user._id)) throw new HTTPError(409, {
        resultCode: 1,
        message: 'Post already liked'
    })

    post.likes.push(user._id)
    await post.save()

    return post
}

export const deleteLike = async (postId: string, user: MongooseDocument<PopulatedUserType>) => {
    const post = await Post.findById(postId)
    if (!post) throw new HTTPError(404, {resultCode: 1, message: 'Post not found'})

    if (!post.likes.includes(user._id)) throw new HTTPError(409, {
        resultCode: 1,
        message: 'Post not liked'
    })

    removeItem(post.likes, user._id)
    await post.save()

    return post
}



export const addComment = async (postId: string, author: MongooseDocument<PopulatedUserType>, text: string) => {
    const post = await Post.findById(postId)
    if (!post) throw new HTTPError(404, {resultCode: 1, message: 'Post not found'})

    const comment = await PostComment.create({
        author,
        text
    })

    post.comments.push(comment)
    await post.save()

    return comment.populate('author', 'username firstName lastName avatar updatedAt')
}

export const deleteComment = async (
    initiator: MongooseDocument<PopulatedUserType>,
    commentId: Types.ObjectId | string
) => {
    const comment = await PostComment.findById(commentId).populate('author')
    if (!comment) throw new HTTPError(404, {resultCode: 1, message: 'Comment not found'})

    // @ts-ignore
    if (!(initiator.id === comment.author.id)) throw new HTTPError(401, {resultCode: 1, message: 'Forbidden'})
    // @ts-ignore
    await Post.findOneAndUpdate({comments: comment}, {$pull: { comments: {_id: comment._id} }})
    await comment.delete()
}
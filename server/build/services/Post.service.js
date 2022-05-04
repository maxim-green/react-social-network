"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.addComment = exports.deleteLike = exports.addLike = exports.deletePost = exports.createPostNew = exports.createPost = exports.getPost = exports.getSubscriptionsPosts = exports.getUserPosts = exports.getPosts = void 0;
const models_1 = require("models");
const helpers_1 = require("helpers");
const services_1 = require("services");
const Image_service_1 = require("services/Image.service");
const PostComment_1 = require("models/PostComment");
// TODO: resolve ts-ignore in this file
const getPosts = async () => {
    return models_1.Post.find().populate('author', 'username firstName lastName avatar')
        .populate('likes', 'username firstName lastName avatar')
        .populate('comments.author', 'username firstName lastName avatar');
};
exports.getPosts = getPosts;
const getUserPosts = async (username) => {
    const user = await (0, services_1.findUser)({ 'username': username });
    return models_1.Post.find({ 'author': user.id })
        .populate('author', 'username firstName lastName avatar')
        .populate('likes', 'username firstName lastName avatar')
        .populate('comments.author', 'username firstName lastName avatar');
};
exports.getUserPosts = getUserPosts;
const getSubscriptionsPosts = async (user) => {
    return models_1.Post.find({ author: { $in: user.subscriptions } })
        .populate('author', 'username firstName lastName avatar')
        .populate('likes', 'username firstName lastName avatar')
        .populate('comments.author', 'username firstName lastName avatar');
};
exports.getSubscriptionsPosts = getSubscriptionsPosts;
const getPost = async (postId) => {
    const post = await models_1.Post.findById(postId)
        .populate('author', 'username firstName lastName avatar')
        .populate('likes', 'username firstName lastName avatar')
        .populate('comments.author', 'username firstName lastName avatar');
    if (!post)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: 'Post not found' });
    return post;
};
exports.getPost = getPost;
const createPost = async (author, text) => {
    const post = await models_1.Post.create({ author, text });
    await models_1.Post.populate(post, { path: 'author', model: 'User', select: 'username firstName lastName avatar' });
    return post;
};
exports.createPost = createPost;
// todo: use on frontend
const createPostNew = async (author, text, images) => {
    const post = await models_1.Post.create({ author, text });
    for (let i = 0; i < images.length; i++) {
        //@ts-ignore
        post.images.push(await (0, Image_service_1.savePostImage)(images[i], post.id, i));
    }
    await post.save();
    await models_1.Post.populate(post, { path: 'author', model: 'User', select: 'username firstName lastName avatar' });
    return post;
};
exports.createPostNew = createPostNew;
const deletePost = async (initiator, postId) => {
    const post = await (0, exports.getPost)(postId);
    // @ts-ignore
    if (!(initiator.id === post.author.id))
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Forbidden' });
    await post.delete();
};
exports.deletePost = deletePost;
const addLike = async (postId, user) => {
    const post = await models_1.Post.findById(postId);
    if (!post)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: 'Post not found' });
    if (post.likes.includes(user._id))
        throw new helpers_1.HTTPError(409, {
            resultCode: 1,
            message: 'Post already liked'
        });
    post.likes.push(user._id);
    await post.save();
    return post;
};
exports.addLike = addLike;
const deleteLike = async (postId, user) => {
    const post = await models_1.Post.findById(postId);
    if (!post)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: 'Post not found' });
    if (!post.likes.includes(user._id))
        throw new helpers_1.HTTPError(409, {
            resultCode: 1,
            message: 'Post not liked'
        });
    (0, helpers_1.removeItem)(post.likes, user._id);
    await post.save();
    return post;
};
exports.deleteLike = deleteLike;
const addComment = async (postId, author, text) => {
    const post = await models_1.Post.findById(postId);
    if (!post)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: 'Post not found' });
    const comment = await PostComment_1.PostComment.create({
        author,
        text
    });
    post.comments.push(comment);
    await post.save();
    return comment.populate('author', 'username firstName lastName avatar');
};
exports.addComment = addComment;
const deleteComment = async (initiator, commentId) => {
    const comment = await PostComment_1.PostComment.findById(commentId).populate('author');
    if (!comment)
        throw new helpers_1.HTTPError(404, { resultCode: 1, message: 'Comment not found' });
    // @ts-ignore
    if (!(initiator.id === comment.author.id))
        throw new helpers_1.HTTPError(401, { resultCode: 1, message: 'Forbidden' });
    // @ts-ignore
    await models_1.Post.findOneAndUpdate({ comments: comment }, { $pull: { comments: { _id: comment._id } } });
    await comment.delete();
};
exports.deleteComment = deleteComment;
//# sourceMappingURL=Post.service.js.map
import {coreApi, handleError, handleResponse} from './core.api'
import {CommentType, PostType} from 'types/types'

export type PostsDataType = { posts: Array<PostType> }
export type PostDataType = { post: PostType }
export type PostCommentDataType = { comment: CommentType }

export type NewPostDataType = {
    post: PostType
}

export const postApi = {
    getPosts: () => coreApi
        .get(`/post`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getFeed: () => coreApi
        .get(`/post/feed`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getUserPosts: (username: string) => coreApi
        .get(`/user/${username}/posts`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getPost: (postId: string) => coreApi
        .get(`/post/${postId}`)
        .then(handleResponse<PostDataType>())
        .catch(handleError()),
    addPost: (text: string) => coreApi
        .post(`/post`, { text })
        .then(handleResponse<NewPostDataType>())
        .catch(handleError()),
    deletePost: (id: string) => coreApi
        .delete(`/post/${id}`)
        .then(handleResponse())
        .catch(handleError()),
    addLike: (id: string) => coreApi
        .post(`/post/${id}/like`)
        .then(handleResponse())
        .catch(handleError()),
    deleteLike: (id: string) => coreApi
        .delete(`/post/${id}/like`)
        .then(handleResponse())
        .catch(handleError()),
    addPostComment: (postId: string, text: string) => coreApi
        .post(`post/${postId}/comment`, { text })
        .then(handleResponse<PostCommentDataType>())
        .catch(handleError()),
    deletePostComment: (commentId: string) => coreApi
        .delete(`post/comment/${commentId}`)
        .then(handleResponse())
        .catch(handleError())
}
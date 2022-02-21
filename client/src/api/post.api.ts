import {coreApi, handleError, handleResponse} from './core.api'
import {PostType} from '../types/types'

export type PostsDataType = { posts: Array<PostType> }
export type PostDataType = { post: PostType }

export type NewPostDataType = {
    post: PostType
}

export const postApi = {
    getPosts: () => coreApi
        .get(`/post`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getUserPosts: (username: string) => coreApi
        .get(`/post?author=${username}`)
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
        .catch(handleError())
}
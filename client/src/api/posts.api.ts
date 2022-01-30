import {coreApi, handleError, handleResponse} from './core.api'
import {PostType} from '../types/types'

export type PostsDataType = { posts: Array<PostType> }
export type PostDataType = { post: PostType }

export type NewPostDataType = {
    post: PostType
}

export const postsApi = {
    getPosts: () => coreApi
        .get(`/posts`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getUserPosts: (username: string) => coreApi
        .get(`/posts?author=${username}`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getPost: (postId: string) => coreApi
        .get(`/posts/${postId}`)
        .then(handleResponse<PostDataType>())
        .catch(handleError()),
    addPost: (text: string) => coreApi
        .post(`/posts/add`, { text })
        .then(handleResponse<NewPostDataType>())
        .catch(handleError()),
    deletePost: (id: string) => coreApi
        .delete(`/posts/delete/${id}`)
        .then(handleResponse())
        .catch(handleError())
}
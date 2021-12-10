import {coreApi, handleError, handleResponse} from './core.api'
import {PostType} from '../types/types'

export type PostsDataType = {
    posts: Array<PostType>
}

export type NewPostDataType = {
    post: PostType
}

export const postsApi = {
    getPosts: () => coreApi
        .get(`/posts`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
    getUserPosts: (userId: string) => coreApi
        .get(`/posts/${userId}`)
        .then(handleResponse<PostsDataType>())
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
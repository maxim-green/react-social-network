import {coreApi, handleError, handleResponse} from './core.api'
import {PostType} from '../types/types'

export type PostsDataType = {
    posts: Array<PostType>
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
        .then(handleResponse())
        .catch(handleError()),
}
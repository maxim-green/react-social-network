import {coreApi, handleError, handleResponse} from './core.api'
import {PostsDataType} from 'api/post.api'

export const feedApi = {
    getFeed: () => coreApi
        .get(`/post/feed`)
        .then(handleResponse<PostsDataType>())
        .catch(handleError()),
}
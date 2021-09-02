import {coreApi, handleError, handleResponse} from './core.api'
import {UserType} from '../types/types'

// GET /users/
// used for getting users list on users page
export type UsersDataType = {
    users: Array<UserType>
}

export const usersApi = {
    getUsers: () => coreApi
        .get('/users')
        .then(handleResponse<UsersDataType>())
        .catch(handleError()),

    addFriend: (userId: string) => coreApi
        .post(`/users/friend/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    deleteFriend: (userId: string) => coreApi
        .delete(`/users/friend/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    addSubscription: (userId: string) => coreApi
        .post(`/users/subscription/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    deleteSubscription: (userId: string) => coreApi
        .delete(`/users/subscription/${userId}`)
        .then(handleResponse())
        .catch(handleError())
}
import {coreApi, handleError, handleResponse} from './core.api'
import {UserType} from '../types/types'

// GET /users/
// used for getting users list on users page
export type UsersDataType = {
    users: Array<UserType>
    incomingFriendshipRequests: Array<string>
    outgoingFriendshipRequests: Array<string>
}

export const usersApi = {
    getUsers: () => coreApi
        .get('/users')
        .then(handleResponse<UsersDataType>())
        .catch(handleError()),
    getFriends: () => coreApi
        .get('/users/friends')
        .then(handleResponse<{ friends: Array<UserType> }>())
        .catch(handleError()),

    addFriend: (userId: string) => coreApi
        .post(`/users/friend/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
    cancelFriendshipRequest: (userId: string) => coreApi
        .post(`/users/friend/${userId}/cancel`)
        .then(handleResponse())
        .catch(handleError()),
    acceptFriendshipRequest: (userId: string) => coreApi
        .post(`/users/friend/${userId}/accept`)
        .then(handleResponse())
        .catch(handleError()),
    declineFriendshipRequest: (userId: string) => coreApi
        .post(`/users/friend/${userId}/decline`)
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
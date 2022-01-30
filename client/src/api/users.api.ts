import {coreApi, handleError, handleResponse} from './core.api'
import {UserItemDataType} from '../types/types'

// GET /users/
// used for getting users list on users page
export type UsersDataType = {
    users: Array<UserItemDataType>
    incomingFriendshipRequests: Array<string>
    outgoingFriendshipRequests: Array<string>
}

export const usersApi = {
    getUsers: () => coreApi
        .get('/users')
        .then(handleResponse<UsersDataType>())
        .catch(handleError()),
    getFriends: () => coreApi
        .get('/users?isFriend=true')
        .then(handleResponse<{ friends: Array<UserItemDataType> }>())
        .catch(handleError()),



    addFriend: (userId: string) => coreApi
        .post(`/friendship/request/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
    cancelFriendshipRequest: (userId: string) => coreApi
        .delete(`/friendship/cancel/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
    acceptFriendshipRequest: (userId: string) => coreApi
        .put(`/friendship/accept/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
    declineFriendshipRequest: (userId: string) => coreApi
        .delete(`/friendship/decline/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
    deleteFriend: (userId: string) => coreApi
        .delete(`/friendship/remove/${userId}`)
        .then(handleResponse())
        .catch(handleError()),



    follow: (userId: string) => coreApi
        .post(`/follow/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    unfollow: (userId: string) => coreApi
        .delete(`/follow/${userId}`)
        .then(handleResponse())
        .catch(handleError())
}
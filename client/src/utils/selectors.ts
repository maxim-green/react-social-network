import {StateType} from 'redux/store'

export const getSortedPosts = (state: StateType) => state.posts.posts.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
        return -1
    }
    if (a.createdAt > b.createdAt) {
        return 1
    }
    return 0
})

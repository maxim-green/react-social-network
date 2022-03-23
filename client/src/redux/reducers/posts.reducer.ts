// INITIAL STATE
import {AuthUserDataType, PostType, UserItemDataType} from 'types/types'
import {InferActionsTypes, ThunkType} from '../store'
import {postApi} from 'api/post.api'
import {ResultCodes} from 'api/core.api'
import {authActions, AuthActionType} from './auth.reducer'

const initialState = {
    posts: [] as Array<PostType>,
    isAddPostPending: false as boolean
}
export type PostsStateType = typeof initialState

// REDUCER
const reducer = (state: PostsStateType = initialState, action: PostsActionType): PostsStateType => {
    switch (action.type) {
        case 'rsn/post/SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        case 'rsn/post/ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        }
        case 'rsn/post/SET_ADD_POST_PENDING': {
            return {
                ...state,
                isAddPostPending: action.isPending
            }
        }
        case 'rsn/post/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.id)
            }
        }
        case 'rsn/post/ADD_POST_LIKE': {
            const user: UserItemDataType = {
                _id: action.user._id,
                username: action.user.username,
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                avatar: action.user.avatar,
                subscriptions: action.user.subscriptions
            }
            return {
                ...state,
                posts: state.posts.map(post => (post._id !== action.postId) ? post : {
                    ...post,
                    likes: [...post.likes, user]
                })
            }
        }
        case 'rsn/post/DELETE_POST_LIKE': {
            return {
                ...state,
                posts: state.posts.map(post => (post._id !== action.postId) ? post : {
                    ...post,
                    likes: post.likes.filter(user => user._id !== action.user._id)
                })
            }
        }
        default: {
            return state
        }
    }
}
export default reducer

export const postsActions = {
    setPosts: (posts: Array<PostType>) => ({type: 'rsn/post/SET_POSTS', posts} as const),
    addPost: (post: PostType) => ({type: 'rsn/post/ADD_POST', post} as const),
    deletePost: (id: string) => ({type: 'rsn/post/DELETE_POST', id} as const),
    setAddPostPending: (isPending: boolean) => ({type: 'rsn/post/SET_ADD_POST_PENDING', isPending} as const),
    addPostLike: (postId: string, user: AuthUserDataType) => ({type: 'rsn/post/ADD_POST_LIKE', postId, user} as const),
    deletePostLike: (postId: string, user: AuthUserDataType) => ({
        type: 'rsn/post/DELETE_POST_LIKE',
        postId,
        user
    } as const)
}
export type PostsActionType = ReturnType<InferActionsTypes<typeof postsActions>>

export const getPost = (postId: string): ThunkType<PostsActionType> => async (dispatch) => {
    const res = await postApi.getPost(postId)
    if (res.resultCode === ResultCodes.success) {
        dispatch(postsActions.setPosts([res.data.post]))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const getFeedPosts = (): ThunkType<PostsActionType> => async (dispatch) => {
    const res = await postApi.getFeed()
    if (res.resultCode === ResultCodes.success) {
        dispatch(postsActions.setPosts(res.data.posts))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

export const getUserPosts = (username: string): ThunkType<PostsActionType> => async (dispatch) => {
    const res = await postApi.getUserPosts(username)

    if (res.resultCode === ResultCodes.success) {
        dispatch(postsActions.setPosts(res.data.posts))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
export const addPost = (text: string): ThunkType<PostsActionType | AuthActionType> => async (dispatch) => {
    dispatch(postsActions.setAddPostPending(true))
    const res = await postApi.addPost(text)
    dispatch(postsActions.setAddPostPending(false))
    if (res.resultCode === ResultCodes.success) {
        console.log(res)
        dispatch(postsActions.addPost(res.data.post))
    }
    if (res.resultCode === ResultCodes.authError) {
        dispatch(authActions.clearUser())
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
export const deletePost = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
    const res = await postApi.deletePost(id)
    if (res.resultCode === ResultCodes.success) {
        dispatch(postsActions.deletePost(id))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}


// todo: figure out how to dispatch a post. maybe it's better to send updated post in response and then set it to state.
export const addPostLike = (id: string): ThunkType<PostsActionType> => async (dispatch, getState) => {
    const user = getState().auth.user
    const res = await postApi.addLike(id)
    if ((res.resultCode === ResultCodes.success) && user) {
        dispatch(postsActions.addPostLike(id, user))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}

// todo: figure out how to dispatch a post. maybe it's better to send updated post in response and then set it to state.
export const deletePostLike = (id: string): ThunkType<PostsActionType> => async (dispatch, getState) => {
    const user = getState().auth.user
    const res = await postApi.deleteLike(id)
    if ((res.resultCode === ResultCodes.success) && user) {
        dispatch(postsActions.deletePostLike(id, user))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
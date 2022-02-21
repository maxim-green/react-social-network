// INITIAL STATE
import {PostType} from '../../types/types'
import {InferActionsTypes, ThunkType} from '../store'
import {postApi} from '../../api/post.api'
import {ResultCodes} from '../../api/core.api'
import {authActions, AuthActionType} from './auth.reducer'

const initialState = {
    posts: [] as Array<PostType>,
    isAddPostPending: false as boolean
}
export type PostsStateType = typeof initialState

// REDUCER
const reducer = (state: PostsStateType = initialState, action: PostsActionType): PostsStateType => {
    switch (action.type) {
        case 'rsn/posts/SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        case 'rsn/posts/ADD_POST': {
            return {
                ...state,
                posts: [...state.posts, action.post]
            }
        }
        case 'rsn/posts/SET_ADD_POST_PENDING': {
            return {
                ...state,
                isAddPostPending: action.isPending
            }
        }
        case 'rsn/posts/DELETE_POST': {
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.id)
            }
        }
        default: {
            return state
        }
    }
}
export default reducer

export const postsActions = {
    setPosts: (posts: Array<PostType>) => ({type: 'rsn/posts/SET_POSTS', posts} as const),
    addPost: (post: PostType) => ({type: 'rsn/posts/ADD_POST', post} as const),
    deletePost: (id: string) => ({type: 'rsn/posts/DELETE_POST', id} as const),
    setAddPostPending: (isPending: boolean) => ({type: 'rsn/posts/SET_ADD_POST_PENDING', isPending} as const),
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

export const getPosts = (): ThunkType<PostsActionType> => async (dispatch) => {
    const res = await postApi.getPosts()
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
import {PostType, UserItemDataType} from 'types/types'
import {userApi} from 'api/user.api'
import {ResultCodes} from 'api/core.api'
import {InferActionsTypes, ThunkType} from '../store'
import {getAuthUserData} from 'redux/reducers/auth.reducer'
import {feedApi} from 'api/feed.api'

// INITIAL STATE
const initialState = {
    posts: [] as Array<PostType>,
}
export type FeedStateType = typeof initialState

// REDUCER
export const feedReducer = (state: FeedStateType = initialState, action: FeedActionType): FeedStateType => {
    switch (action.type) {
        case 'rsn/feed/SET_POSTS': {
            return {
                ...state,
                posts: action.posts
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const feedActions = {
    setPosts: (posts: Array<PostType>) => ({type: 'rsn/feed/SET_POSTS', posts} as const)
}
export type FeedActionType = ReturnType<InferActionsTypes<typeof feedActions>>
//endregion

//region THUNK CREATORS
export const getFeed = (): ThunkType<FeedActionType> => async (dispatch) => {

    const res = await feedApi.getFeed()
    if (res.resultCode === ResultCodes.success) {
        dispatch(feedActions.setPosts(res.data.posts))
    }
    if (res.resultCode === ResultCodes.error) {
        console.log(res)
    }
}
//endregion
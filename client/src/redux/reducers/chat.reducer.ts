import {InferActionsTypes, ThunkType} from '../store'
import {MessageType} from '../../types/types'
import {chatApi} from '../../api/chat.api'
import {Dispatch} from 'react'

// INITIAL STATE
const initialState = {
    messages: [] as Array<MessageType>
}
type ChatStateType = typeof initialState

// REDUCER
export const chatReducer = (state: ChatStateType = initialState, action: ChatActionType): ChatStateType => {
    switch (action.type) {
        case 'rsn/chat/ADD_MESSAGE': {
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        }
        default: {
            return state
        }
    }
}

//region ACTION CREATORS
export const chatActions = {
    addMessage: (message: MessageType) => ({type: 'rsn/chat/ADD_MESSAGE', message} as const),
}
export type ChatActionType = ReturnType<InferActionsTypes<typeof chatActions>>
//endregion

//region THUNK CREATORS
let _messageHandler: ((message: MessageType) => void) | null = null
const messageHandlerCreator = (dispatch: Dispatch<ChatActionType>) => {
    if (_messageHandler) return _messageHandler
    return (message: MessageType) => dispatch(chatActions.addMessage(message))
}

export const startMessagesListening = (): ThunkType<ChatActionType> => async (dispatch) => {
    chatApi.connect()
    chatApi.subscribe(messageHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType<ChatActionType> => async (dispatch) => {
    chatApi.unsubscribe(messageHandlerCreator(dispatch))
    chatApi.disconnect()
}
export const sendMessage = (message: string): ThunkType<ChatActionType> => async (dispatch) => {
    chatApi.sendMessage(message)
}
//endregion
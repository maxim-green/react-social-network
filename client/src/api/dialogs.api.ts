import {coreApi, handleError, handleResponse} from './core.api'
import {DialogType, MessageType} from '../types/types'

type MessagesDataType = {
    dialogId: string,
    messages: Array<MessageType>
}

type DialogsDataType = {
    dialogs: Array<DialogType>
}

export const dialogsApi = {
    getDialogs: () => coreApi
        .get(`/dialogs`)
        .then(handleResponse<DialogsDataType>())
        .catch(handleError()),
    getMessages: (username: string) => coreApi
        .get(`/dialogs/${username}`)
        .then(handleResponse<MessagesDataType>())
        .catch(handleError())
}
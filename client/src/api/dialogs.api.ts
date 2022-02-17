import {coreApi, handleError, handleResponse} from './core.api'
import {DialogType, MessageType, UserItemDataType} from '../types/types'

type DialogDataType = {
    dialog: {
        _id: string,
        createdAt: Date,
        updatedAt: Date,
        users: Array<UserItemDataType>,
        messages: Array<MessageType>
    }
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
        .then(handleResponse<DialogDataType>())
        .catch(handleError())
}
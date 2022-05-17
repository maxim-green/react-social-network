import axios, {AxiosError, AxiosResponse} from 'axios'
import {ServerValidationErrorType} from 'types/types'

export const coreApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    // validateStatus: status => status < 500
})

// basic result codes. used by default in ResponseType
// can be extended if needed
export enum ResultCodes {
    success = 0,
    error = 1,
    authError = 10,
    expiredToken = 11,
}

// all server responses have this type
export type APIResponseType<D = undefined> = {
    resultCode: ResultCodes
    message: string
    data: D
    errors?: Array<ServerValidationErrorType>
}
export const handleResponse = <DataType = undefined>() => (res: AxiosResponse<APIResponseType<DataType>>) => {
    return res.data
}

export const handleError = () => (err: AxiosError) => {
    return err.response?.data
}
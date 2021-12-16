import axios, {AxiosError, AxiosResponse} from 'axios'

export const coreApi = axios.create({
    baseURL: 'http://localhost:5000/api/',
    withCredentials: true
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
export type APIResponseType<D = undefined, R = ResultCodes> = {
    resultCode: R
    message: string
    data: D
}
export const handleResponse = <DataType = undefined, ResultCodesType = ResultCodes>() => (res: AxiosResponse<APIResponseType<DataType, ResultCodesType>>) => {
    console.log('Success: ' + res.data.message)
    return res.data
}

export const handleError = () => (err: AxiosError) => {
    console.log('Error: ' + err.response?.data.message)
    return err.response?.data
}
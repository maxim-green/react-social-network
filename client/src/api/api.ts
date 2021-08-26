import axios, {AxiosError, AxiosResponse} from 'axios'
import {
    AuthorizedUserDataType, AuthResultCodes, AvatarType,
    FormDataType,
    LoginDataType,
    RegistrationDataType,
    ResponseDataType, ResultCodes, UserType
} from '../types/types'
import {ProfileStateType} from '../redux/reducers/profile.reducer'
import {UsersStateType} from '../redux/reducers/users.reducer'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    withCredentials: true
})

const handleResponse = <DataType = any, ResultCodesType = ResultCodes>() => (res: AxiosResponse<ResponseDataType<DataType, ResultCodesType>>) => {
    console.log('Success: ' + res.data.message)
    return res.data
}

const handleError = () => (err: AxiosError) => {
    console.log('Error: ' + err.response?.data.message)
    return err.response?.data
}

export const authApi = {
    login: (loginData: LoginDataType) => api
        .post("/auth/login", loginData)
        .then(handleResponse())
        .catch(handleError()),

    me: () => api
        .get("/auth/me")
        .then(handleResponse<AuthorizedUserDataType, ResultCodes | AuthResultCodes>())
        .catch(handleError()),

    logout: () => api
        .delete("/auth/logout")
        .then(handleResponse())
        .catch(handleError()),

    register: (registrationData: RegistrationDataType) => api
        .post("/auth/register", registrationData )
        .then(handleResponse())
        .catch(handleError()),
}

export const profileApi = {
    getProfile: (username: string) => api
        .get(`/profile/${username}`)
        .then(handleResponse<ProfileStateType>())
        .catch(handleError()),

    updateProfile: (profileData: ProfileStateType) => api
        .put('/profile', {...profileData})
        .then(handleResponse())
        .catch(handleError()),

    updateAvatar: (formData: FormDataType) => api
        .put('/profile/avatar', formData, )
        .then(handleResponse<AvatarType>())
        .catch(handleError()),
}

export const usersApi = {
    getUsers: () => api
        .get('/users')
        .then(handleResponse<UsersStateType>())
        .catch(handleError()),

    addFriend: (userId: string) => api
        .post(`/users/friend/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    deleteFriend: (userId: string) => api
        .delete(`/users/friend/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    addSubscription: (userId: string) => api
        .post(`/users/subscription/${userId}`)
        .then(handleResponse())
        .catch(handleError()),

    deleteSubscription: (userId: string) => api
        .delete(`/users/subscription/${userId}`)
        .then(handleResponse())
        .catch(handleError()),
}
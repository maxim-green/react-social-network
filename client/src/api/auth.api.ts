import {coreApi, handleError, handleResponse} from './core.api'
import {EditProfileDataType} from './profile.api'
import {AuthUserDataType} from '../types/types'


//region DATA TYPES
// GET /auth/me/ response
// contains userId, email and username of currently logged in user
export type AuthorizedUserDataType = {
    userId: string
    email: string
    username: string
    profile: EditProfileDataType
}

// POST /auth/login/
// contains data needed for login (gathered from login form)
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

// POST /auth/register/
// contains data needed for registration (gathered from registration form)
export type RegistrationDataType = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}
//endregion

export const authApi = {
    login: (loginData: LoginDataType) => coreApi
        .post('/auth/login', loginData)
        .then(handleResponse())
        .catch(handleError()),

    me: () => coreApi
        .get('/auth/me')
        .then(handleResponse<AuthUserDataType>())
        .catch(handleError()),

    refreshToken: () => coreApi
        .post('/auth/refresh-tokens')
        .then(handleResponse())
        .catch(handleError()),

    logout: () => coreApi
        .delete('/auth/logout')
        .then(handleResponse())
        .catch(handleError()),

    register: (registrationData: RegistrationDataType) => coreApi
        .post('/auth/register', registrationData)
        .then(handleResponse())
        .catch(handleError())
}


coreApi.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        const originalConfig = err.config
        if (err.response.status === 401 && !originalConfig._retry && err.response.data.message !== 'Invalid token') {
            originalConfig._retry = true
            await authApi.refreshToken()
            return coreApi(originalConfig);
        }
        return Promise.reject(err)
    }
)
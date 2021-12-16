import {coreApi, handleError, handleResponse} from './core.api'

//region DATA TYPES
// GET /auth/me/ response
// contains userId, email and username of currently logged in user
export type AuthorizedUserDataType = {
    userId: string
    email: string
    username: string
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
        .then(handleResponse<AuthorizedUserDataType>())
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
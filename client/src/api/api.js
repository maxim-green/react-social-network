import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    withCredentials: true
})

export const authApi = {
    login: (email, password, rememberMe) => api.post(
        "/auth/login",
        {email, password, rememberMe}
    )
        .then(res => res.data)
        .catch(err => err.response.data),

    me: () => api.get("/auth/me")
        .then(res => res.data)
        .catch(err => err.response.data),

    logout: () => api.delete("/auth/logout")
        .then(res => res.data)
        .catch(err => err.response.data),

    register: (firstName, lastName, username, email, password) => api.post(
        "/auth/register",
        {firstName, lastName, username, email, password}
    )
        .then(res => res.data)
        .catch(err => err.response.data)
}

export const profileApi = {
    getProfile: (username) => api.get(`/profile/${username}`)
        .then(res => res.data)
        .catch(err => err.response.data),
    updateProfile: (profileData) => api.put('/profile', {...profileData})
        .then(res => res.data)
        .catch(err => err.response.data),
    updateAvatar: (formData) => api.put('/profile/avatar', formData, )
        .then(res => res.data)
        .catch(err => err.response.data),
}

export const usersApi = {
    getUsers: () => api.get('/users')
        .then(res => res.data)
        .catch(err => err.response.data),
    addFriend: (userId) => api.post(`/users/friend/${userId}`)
        .then(res => res.data)
        .catch(err => err.response.data),
    deleteFriend: (userId) => api.delete(`/users/friend/${userId}`)
        .then(res => res.data)
        .catch(err => err.response.data),
    addSubscription: (userId) => api.post(`/users/subscription/${userId}`)
        .then(res => res.data)
        .catch(err => err.response.data),
    deleteSubscription: (userId) => api.delete(`/users/subscription/${userId}`)
        .then(res => res.data)
        .catch(err => err.response.data),
}
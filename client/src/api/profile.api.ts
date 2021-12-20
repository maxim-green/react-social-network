import {AvatarType, ContactsType, FormDataType, LocationType} from '../types/types'
import {coreApi, handleError, handleResponse} from './core.api'

// used for getting and updating user profile
export type ProfileDataType = {
    userId: string,
    firstName: string,
    lastName: string,
    birthDate: string | null,
    status: string | null,
    bio: string | null,
    interests: string | null,
    location: LocationType,
    contacts: ContactsType,
    avatar: AvatarType
}

export const profileApi = {
    getProfile: (username: string) => coreApi
        .get(`/profile/${username}`)
        .then(handleResponse<ProfileDataType>())
        .catch(handleError()),

    updateProfile: (profileData: ProfileDataType) => coreApi
        .put('/profile', {...profileData})
        .then(handleResponse())
        .catch(handleError()),

    updateAvatar: (formData: FormDataType) => coreApi
        .put('/profile/avatar', formData)
        .then(handleResponse<AvatarType>())
        .catch(handleError()),

    updateStatus: (status: string) => coreApi
        .put('/profile/status', { status })
        .then(handleResponse())
        .catch(handleError())
}
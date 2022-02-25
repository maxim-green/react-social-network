import {AvatarType, ContactsType, FormDataType, LocationType, UserDataType} from '../types/types'
import {coreApi, handleError, handleResponse} from './core.api'

// used for getting and updating user profile
export type EditProfileDataType = {
    firstName: string,
    lastName: string,
    birthDate: string | null,
    bio: string | null,
    contacts: ContactsType | null,
    location: LocationType | null,
}

export const profileApi = {
    getProfile: (username: string) => coreApi
        .get(`/profile/${username}`)
        .then(handleResponse<{ user: UserDataType }>())
        .catch(handleError()),

    updateProfile: (profileData: EditProfileDataType) => coreApi
        .put('/profile', {...profileData})
        .then(handleResponse())
        .catch(handleError()),

    updateAvatar: (formData: FormDataType) => coreApi
        .put('/profile/avatar', formData)
        .then(handleResponse<{ avatar: AvatarType }>())
        .catch(handleError()),

    updateCoverImage: (formData: FormDataType) => coreApi
        .put('/profile/cover', formData)
        .then(handleResponse<{ coverImage: string }>())
        .catch(handleError()),

    updateStatus: (status: string) => coreApi
        .put('/profile/status', { status })
        .then(handleResponse())
        .catch(handleError())
}
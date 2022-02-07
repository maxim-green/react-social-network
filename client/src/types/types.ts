// don't know if it is right to do so, but it works ;)
import {EditProfileDataType} from '../api/profile.api'

const formData = new FormData()
export type FormDataType = typeof formData

export type LocationType = { country: string | null, city: string | null }
export type ContactsType = {
    website: string | null,
    vkontakte: string | null,
    github: string | null,
}
export type AvatarType = { large: string | null, small: string | null }

// type for current user data
export type AuthUserDataType = UserDataType & {
    email: string
}

// type for user profile data
export type UserDataType = {
    _id: string
    registrationDate: Date
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    online: boolean
    profile: {
        birthDate: string | null,
        status: string | null,
        bio: string | null,
        contacts: ContactsType,
        location: LocationType,
        coverImage: string | null
    }
    subscriptions: Array<UserItemDataType>
}


// type for user-items shown on users page
export type UserItemDataType = {
    _id: string
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    subscriptions: Array<string>
}

// type for dialogs messages
export type MessageType = {
    dialogId: string
    date: Date
    author: UserItemDataType,
    text: string
}

// type for items in dialogs list
export type DialogType = {
    id: string
    created: Date
    updated: Date
    companionUser: UserItemDataType
}

// type for post-items
export type PostType = {
    _id: string,
    creationDate: string,
    author: UserItemDataType,
    text: string
}

export type NewPostType = {
    newPostText: string
}




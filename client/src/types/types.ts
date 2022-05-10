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

//
export type ServerValidationErrorType = {
    field: string,
    message: string
}

// type for user profile data
export type UserDataType = {
    _id: string
    updatedAt: string
    registrationDate: Date
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    online: boolean
    birthDate: string | null
    status: string | null
    bio: string | null
    contacts: ContactsType
    location: LocationType
    coverImage: string | null
    subscriptions: Array<UserItemDataType>
}


// type for user-items shown on users page
export type UserItemDataType = {
    _id: string
    username: string
    firstName: string
    lastName: string
    updatedAt: string
    avatar: AvatarType
    subscriptions: Array<UserItemDataType>
}

// type for dialogs message
export type MessageType = {
    _id: string
    dialog: string
    date: Date
    author: UserItemDataType,
    text: string
    isRead: boolean
}

// type for items in dialogs list
export type DialogType = {
    _id: string
    createdAt: Date
    updatedAt: Date
    companion: UserItemDataType
}

// type for post-items
export type PostType = {
    _id: string,
    createdAt: string,
    author: UserItemDataType,
    text: string
    likes: Array<UserItemDataType>
    comments: Array<CommentType>
}

export type NewPostType = {
    newPostText: string
}

export type CommentType = {
    _id: string
    createdAt: string
    author: UserItemDataType
    text: string
    likes: Array<UserItemDataType>
}

export type NewCommentType = {
    text: string
}






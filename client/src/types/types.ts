// don't know if it is right to do so, but it works ;)
const formData = new FormData()
export type FormDataType = typeof formData

export type LocationType = { country: string | null, city: string | null }
export type ContactsType = {
    website: string | null,
    vkontakte: string | null,
    github: string | null,
}
export type AvatarType = { large: string | null, small: string | null }

// type for user-items shown on users page
export type UserType = {
    userId: string
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    isFriend?: boolean
    isSubscription?: boolean
}

// type for post-items
export type PostType = {
    _id: string,
    creationDate: string,
    author: UserType,
    text: string
}

export type NewPostType = {
    newPostText: string
}




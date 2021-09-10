// don't know if it is right to do so, but it works ;)
const formData = new FormData()
export type FormDataType = typeof formData

export type LocationType = { country?: string, city?: string }
export type ContactsType = { [contact: string]: string | undefined }
export type AvatarType = { large?: string, small?: string }

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
    creationDate: string,
    author: UserType,
    text: string
}


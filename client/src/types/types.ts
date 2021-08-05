export type LocationType = {
    country: string | null
    city: string | null
}

export type ContactsType = {
    website: string | null
    phone: string | null
    email: string | null
    vkontakte: string | null
    facebook: string | null
    github: string | null
    telegram: string | null
}

export type AvatarType = {
    large: string | null
    small: string | null
}

// type for user-items shown on users page
export type UserType = {
    userId: string
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    isFriend: boolean
}
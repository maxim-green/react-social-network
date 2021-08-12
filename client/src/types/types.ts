export type LocationType = {
    country: string | null
    city: string | null
}

export type ContactsType = {
    [contact: string]: string | null | undefined
}

export type AvatarType = {
    large: string | null
    small: string | null
}

export type RegistrationDataType = {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

// type for user-items shown on users page
export type UserType = {
    userId: string
    username: string
    firstName: string
    lastName: string
    avatar: AvatarType
    isFriend: boolean
    isSubscription: boolean
}
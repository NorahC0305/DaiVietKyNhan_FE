const UserStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
} as const

const Gender = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER'
} as const

export const USER = {
    USER_STATUS: UserStatus,
    GENDER: Gender,
}
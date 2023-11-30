import { Address } from './address.model'
import { Authority } from './authority.model'
import { Base } from './base.model'

export interface User extends Base {
    firstname: string
    lastname: string
    username: string
    password: string
    phone: string
    authorities: Authority[]
    tokens: string[]
    address: Address
    enabled: boolean
    verified: boolean
    failedLoginAttempts: number
    lockTime: Date
    lastFailedLoginTime: Date
    resetPasswordToken: string
    resetPasswordTokenExpiry: Date
    credentialsNonExpired: boolean
    accountNonLocked: boolean
    accountNonExpired: boolean
    createdAt: Date
    updatedAt: Date
}

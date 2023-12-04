import { Address } from './address.entity'
import { Authority } from './authority.entity'
import { BaseEntity } from './base.entity'

export interface User extends BaseEntity {
    firstname: string
    lastname: string
    username: string
    password: string
    phone: string
    authorities: Authority[]
    tokens: string[]
    address?: Address
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

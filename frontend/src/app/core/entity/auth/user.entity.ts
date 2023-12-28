import { Identifiable } from '../identifiable.interface'
import { Address } from './address.entity'
import { Authority } from './authority.entity'
import { Role } from './role.entity'

export class User implements Identifiable {
    id!: number
    firstname!: string
    lastname!: string
    username!: string
    phone!: string
    authorities!: Authority[]
    tokens!: string[]
    roles!: Role[]
    address?: Address
    avatar?: string
    enabled!: boolean
    verified!: boolean
    failedLoginAttempts!: number
    lockTime!: Date
    lastFailedLoginTime!: Date
    resetPasswordToken!: string
    resetPasswordTokenExpiry!: Date
    credentialsNonExpired!: boolean
    accountNonLocked!: boolean
    accountNonExpired!: boolean
    createdAt!: Date
    updatedAt!: Date
    isDeleting?: boolean

    constructor(data: Partial<User>) {
        Object.assign(this, data)
    }

    toString(): string {
        return this.username
    }
}

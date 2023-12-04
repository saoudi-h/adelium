import { BaseEntity } from './base.entity'

export interface Address extends BaseEntity {
    streetNumber: number
    street: string
    additionalInfo?: string
    postalCode: string
    city: string
    departmentNumber?: string
    country: string
}

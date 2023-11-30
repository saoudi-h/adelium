import { Base } from './base.model'

export interface Address extends Base {
    streetNumber: number
    street: string
    additionalInfo?: string
    postalCode: string
    city: string
    departmentNumber?: string
    country: string
}

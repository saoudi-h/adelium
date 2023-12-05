import { Identifiable } from './identifiable.interface'

export interface Address extends Identifiable {
    streetNumber: number
    street: string
    additionalInfo?: string
    postalCode: string
    city: string
    departmentNumber?: string
    country: string
}

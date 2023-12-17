import { Identifiable } from './identifiable.interface'

export class Address implements Identifiable {
    id!: number
    streetNumber!: number
    street!: string
    additionalInfo?: string
    postalCode!: string
    city!: string
    departmentNumber?: string
    country!: string

    constructor(data: Partial<Address>) {
        Object.assign(this, data)
    }

    toString(): string {
        return `${this.streetNumber} ${this.street}, ${this.postalCode} ${this.city}, ${this.country}`
    }
}

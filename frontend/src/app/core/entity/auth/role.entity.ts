import { Identifiable } from '../identifiable.interface'

export class Role implements Identifiable {
    id!: number
    name!: string
    constructor(data: Partial<Role>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

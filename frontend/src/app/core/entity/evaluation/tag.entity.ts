import { Identifiable } from '../identifiable.interface'

export class Tag implements Identifiable {
    id!: number
    name!: string

    constructor(data: Partial<Tag>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

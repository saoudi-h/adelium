import { Identifiable } from '../identifiable.interface'

export class Tag implements Identifiable {
    id!: number
    isDeleting?: boolean
    name!: string

    constructor(data: Partial<Tag>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

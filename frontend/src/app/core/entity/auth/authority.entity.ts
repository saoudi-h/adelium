import { Identifiable } from '../identifiable.interface'

export class Authority implements Identifiable {
    id!: number
    isDeleting?: boolean
    authority!: string
    toString(): string {
        return this.authority
    }
}

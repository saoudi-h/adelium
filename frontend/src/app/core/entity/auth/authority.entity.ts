import { Identifiable } from '../identifiable.interface'

export class Authority implements Identifiable {
    id!: number
    authority!: string
    toString(): string {
        return this.authority
    }
}

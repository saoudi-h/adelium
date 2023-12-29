import { Identifiable } from '../identifiable.interface'
import { Question } from './question.entity'

export class Bank implements Identifiable {
    id!: number
    name!: string
    isDeleting?: boolean
    description!: string
    enabled!: boolean
    questions!: Question[]
    constructor(data: Partial<Bank>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

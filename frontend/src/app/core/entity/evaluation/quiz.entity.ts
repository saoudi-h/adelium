import { Identifiable } from '../identifiable.interface'
import { Question } from './question.entity'

export class Quiz implements Identifiable {
    id!: number
    name!: string
    isDeleting?: boolean
    description!: string
    enabled!: boolean
    questions!: Question[]
    constructor(data: Partial<Quiz>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

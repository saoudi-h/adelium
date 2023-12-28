import { Question } from './question.entity'

export class QuizDefault {
    id!: number
    name!: string
    isDeleting?: boolean
    description!: string
    enabled!: boolean
    questions!: Question[]
    constructor(data: Partial<QuizDefault>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

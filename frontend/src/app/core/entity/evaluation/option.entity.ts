import { Identifiable } from '../identifiable.interface'
import { Media } from './media.entity'
import { Question } from './question.entity'

export class Option implements Identifiable {
    id!: number
    isDeleting?: boolean
    content!: Media
    explanation!: Media
    question!: Question
    correct!: boolean
    enabled!: boolean

    constructor(data: Partial<Option>) {
        Object.assign(this, data)
    }
}

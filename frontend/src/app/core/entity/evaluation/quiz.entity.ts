import { Identifiable } from '../identifiable.interface'
import { Question } from './question.entity'
import { Tag } from './tag.entity'

export class Quiz implements Identifiable {
    id!: number
    name!: string
    isDeleting?: boolean
    description!: string
    enabled!: boolean
    isPublic!: boolean
    ownerId!: number
    imageUrl!: string
    tags!: Tag[]
    questions!: Question[]
    constructor(data: Partial<Quiz>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

import { Identifiable } from '../identifiable.interface'
import { Question } from './question.entity'
import { Tag } from './tag.entity'

export class Bank implements Identifiable {
    id!: number
    name!: string
    description!: string
    enabled!: boolean
    public!: boolean
    ownerId!: number
    imageUrl!: string
    tags!: Tag[]
    questions!: Question[]
    type!: string
    constructor(data: Partial<Bank>) {
        Object.assign(this, data)
    }
    toString(): string {
        return this.name
    }
}

import { Identifiable } from '../identifiable.interface'
import { Media } from './media.entity'
import { Option } from './option.entity'
import { Tag } from './tag.entity'

export class Question implements Identifiable {
    id!: number
    numberOfOptions!: number
    content!: Media
    options!: Option[]
    enabled!: boolean
    tag!: Tag[]
    type!: string

    constructor(data: Partial<Question>) {
        Object.assign(this, data)
    }
}

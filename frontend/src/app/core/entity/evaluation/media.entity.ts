import { Identifiable } from '../identifiable.interface'

export class Media implements Identifiable {
    id!: number
    type!: string
    content!: unknown

    constructor(data: Partial<Media>) {
        Object.assign(this, data)
    }
}

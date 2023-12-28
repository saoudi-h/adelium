import { Identifiable } from '../identifiable.interface'

export class Media implements Identifiable {
    id!: number
    enabled!: boolean

    constructor(data: Partial<Media>) {
        Object.assign(this, data)
    }
}

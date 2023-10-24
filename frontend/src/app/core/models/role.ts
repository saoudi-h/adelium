import { BaseModel } from './base-model'

export class Role extends BaseModel {
    constructor(Role: string) {
        super()
    }

    validate(): boolean {
        return true
    }
}

import { BaseModel } from './base-model'

export class User extends BaseModel {
    private _username: string

    private _expireAt: number

    constructor(username: string, expireAt: number, id = 0) {
        super()
        this.id = id
        this._username = username
        this._expireAt = expireAt
    }

    validate(): boolean {
        return true
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // getters && setters
    ///////////////////////////////////////////////////////////////////////////////////

    // username
    public get username(): string {
        return this._username
    }
    public set username(value: string) {
        this._username = value
    }

    // expireAt
    public get expireAt(): number {
        return this._expireAt
    }
    public set expireAt(value: number) {
        this._expireAt = value
    }
}

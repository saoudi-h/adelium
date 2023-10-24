export abstract class BaseModel {
    private _id!: number
    protected get id(): number {
        return this._id
    }
    protected set id(value: number) {
        this._id = value
    }
    abstract validate(): boolean
}

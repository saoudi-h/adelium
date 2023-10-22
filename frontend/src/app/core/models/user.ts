import { BaseModel } from './base-model'
import { Token } from './token'

export class User extends BaseModel {
  private _userName: string

  private _expireAt: number

  constructor(id: number, userName: string, expireAt: number) {
    super()
    this.id = id
    this._userName = userName
    this._expireAt = expireAt
  }

  validate(): boolean {
    return true
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // static methods
  ///////////////////////////////////////////////////////////////////////////////////
  static fromToken(token: Token): User {
    // TODO implemente fromToken
    throw new Error('Method not implemented.')
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // getters && setters
  ///////////////////////////////////////////////////////////////////////////////////

  // userName
  public get userName(): string {
    return this._userName
  }
  public set userName(value: string) {
    this._userName = value
  }

  // expireAt
  public get expireAt(): number {
    return this._expireAt
  }
  public set expireAt(value: number) {
    this._expireAt = value
  }
}

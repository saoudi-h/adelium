import { BaseModel } from './base-model'

export class Token extends BaseModel {
  private _accessToken: string

  private _refreshToken: string

  constructor(accessToken: string, refreshToken: string) {
    super()
    this._accessToken = accessToken
    this._refreshToken = refreshToken
  }

  validate(): boolean {
    return true
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // getters && setters
  ///////////////////////////////////////////////////////////////////////////////////

  // refreshToken

  public get refreshToken(): string {
    return this._refreshToken
  }
  public set refreshToken(value: string) {
    this._refreshToken = value
  }

  // accessToken

  public get accessToken(): string {
    return this._accessToken
  }
  public set accessToken(value: string) {
    this._accessToken = value
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // static methods
  ///////////////////////////////////////////////////////////////////////////////////
}

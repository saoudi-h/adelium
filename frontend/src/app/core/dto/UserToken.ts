/**
 * Represents a User Token, typically used for JSON Web Tokens (JWTs).
 */
export interface UserToken {
  /**
   * The "sub" field typically represents the subject of the JWT, such as a username or email address.
   */
  sub: string

  /**
   * The "exp" field represents the expiration date of the JWT as a number (timestamp).
   */
  exp: number

  /**
   * The "iat" field represents the creation date of the JWT as a number (timestamp).
   */
  iat: number
}

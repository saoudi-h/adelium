/**
 * Represents a User Token, typically used for JSON Web Tokens (JWTs).
 */

/**
 * Represents a user token containing information about the user.
 */
export interface UserToken {
    /**
     * The first name of the user.
     */
    firstname: string

    /**
     * The last name of the user.
     */
    lastname: string

    /**
     * The "sub" field typically represents the subject of the JWT, such as a username or email address.
     */
    sub: string

    /**
     * The authorities of the user.
     */
    authorities: string[]

    /**
     * The Url of the user's avatar.
     */
    avatar: string

    /**
     * The "exp" field represents the expiration date of the JWT as a number (timestamp).
     */
    exp: number

    /**
     * The "iat" field represents the creation date of the JWT as a number (timestamp).
     */
    iat: number
}

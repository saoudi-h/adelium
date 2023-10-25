/**
 * Represents user login information.
 */
export interface UserRegister {
    /**
     * The user's username (email address).
     */
    username: string

    /**
     * The user's first name.
     */
    firstname: string

    /**
     * The user's last name.
     */
    lastname: string

    /**
     * The user's password for authentication.
     */
    password: string

    /**
     * The user phone number.
     */
    phone: string
}

/**
 * Represents token-based authentication information.
 */
export interface Token {
  /**
   * The access token for authentication and authorization.
   */
  accessToken: string

  /**
   * The refresh token for obtaining a new access token when the current one expires.
   */
  refreshToken: string
}

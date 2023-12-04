/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from '@core/dto/Token'
import { UserLogin } from '@core/dto/UserLogin'
import { UserRegister } from '@core/dto/UserRegister'
import { createAction, props } from '@ngrx/store'

/**
 * Action creator for login.
 * @param {UserLogin} userLogin - The user login credentials.
 * @returns {Action} - The login action.
 */
export const login = createAction(
    '[Auth] Login',
    props<{ userLogin: UserLogin }>()
)

/**
 * Action creator for login success.
 * @param {Token} token - The token received after successful login.
 * @returns {Action} - The login success action.
 */
export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ token: Token }>()
)

/**
 * Action creator for login failure.
 * @param {any} error - The error object.
 * @returns {Action} - The login failure action.
 */
export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
)

/**
 * Action creator for restore session.
 * @returns {Action} - The restore session action.
 */
export const restoreSessionSuccess = createAction(
    '[Auth] Restore Session Success',
    props<{ token: Token }>()
)

/**
 * Action creator for restore session failure.
 * @returns {Action} - The restore session failure action.
 */
export const restoreSessionFailure = createAction(
    '[Auth] Session Verification Failure'
)

/**
 * Registers a user.
 *
 * @param userRegister The user registration details.
 */
export const register = createAction(
    '[Auth] Register',
    props<{ userRegister: UserRegister }>()
)

/**
 * Action creator for registering success.
 *
 * @param token - The token received after successful registration.
 * @returns An action object with the token payload.
 */
export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ token: Token }>()
)

/**
 * Action creator for registering failure.
 *
 * @param error - The error object associated with the failure.
 * @returns An action object with the error payload.
 */
export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: any }>()
)

/**
 * Action creator for logout.
 * @returns {Action} - The logout action.
 */
export const logout = createAction('[Auth] Logout')

/**
 * Action creator for refresh token.
 * @returns {Action} - The refresh token action.
 */
export const refreshToken = createAction('[Auth] Refresh Token')

/**
 * Action creator for refresh token success.
 * @param {Token} token - The token received after successful refresh.
 * @returns {Action} - The refresh token success action.
 */
export const refreshTokenSuccess = createAction(
    '[Auth] Refresh Token Success',
    props<{ token: Token }>()
)

/**
 *  Action creator for refresh token failure.
 * @param {any} error - The error object.
 * @returns {Action} - The refresh token failure action.
 **/
export const refreshTokenFailure = createAction(
    '[Auth] Refresh Token Failure',
    props<{ error: any }>()
)

/**
 * Action creator for request password reset.
 * @param {string} email - The email of the user.
 * @returns {Action} - The request password reset action.
 */
export const requestPasswordReset = createAction(
    '[Auth] Request Password Reset',
    props<{ email: string }>()
)

/**
 * Action creator for password reset.
 * @param {string} token - The token received after successful request password reset.
 * @param {string} newPassword - The new password.
 * @returns {Action} - The password reset action.
 */
export const passwordReset = createAction(
    '[Auth] Password Reset',
    props<{ token: string; newPassword: string }>()
)

/**
 * Action creator for password reset success.
 * @returns {Action} - The password reset success action.
 */
export const verifyEmail = createAction(
    '[Auth] Verify Email',
    props<{ token: string }>()
)

/**
 * Action creator for password reset success.
 * @returns {Action} - The password reset success action.
 */
export const updateUserProfile = createAction(
    '[Auth] Update User Profile',
    props<{ userProfile: any }>()
    // TODO: Remplacer 'any' par un type approprié pour le profil utilisateur.
)

/**
 * Action to indicate that the user profile has been updated.
 *
 * @param userProfile - The updated user profile.
 * @returns An action object with the updated user profile.
 */
export const userProfileUpdated = createAction(
    '[Auth] User Profile Updated',
    props<{ userProfile: any }>()
    // TODO: Remplacer 'any' par un type approprié pour le profil utilisateur.
)

/**
 * Action creator for change password.
 * @param {string} currentPassword - The current password.
 * @param {string} newPassword - The new password.
 * @returns {Action} - The change password action.
 */
export const changePassword = createAction(
    '[Auth] Change Password',
    props<{ currentPassword: string; newPassword: string }>()
)

/**
 * Action to update the roles in the authentication state.
 * @param roles - The new roles to be updated.
 * @returns An action object with the updated roles.
 */
export const updateRoles = createAction(
    '[Auth] Update Roles',
    props<{ roles: string[] }>()
    // TODO: Remplacer 'string[]' par un type approprié pour les rôles.
)

/**
 * Checks the permission for a specific action.
 *
 * @param permission - The permission to check.
 * @returns An action object with the permission to check.
 */
export const checkPermission = createAction(
    '[Auth] Check Permission',
    props<{ permission: string }>()
    // TODO: Remplacer 'string[]' par un type approprié pour les permissions.
)

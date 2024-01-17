/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from '@core/dto/Token'
import { createAction, props } from '@ngrx/store'

export function createOauthActions(provider: string) {
    return {
        startLogin: createAction(`[Auth][${provider}]  Start Login`),
        loginRedirectSuccess: createAction(
            `[Auth][${provider}] Login Redirect Success`,
            props<{ isToken: boolean; code: string }>()
        ),
        loginRedirectFailure: createAction(
            `[Auth][${provider}] Login Redirect Failure`,
            props<{ error: any }>()
        ),

        exchangeCodeForToken: createAction(
            `[Auth][${provider}] Exchange Code for Token`,
            props<{ code: string }>()
        ),
        exchangeCodeForTokenFailure: createAction(
            `[Auth][${provider}]  Code Exchange Failure`,
            props<{ error: any }>()
        ),
        exchangeCodeForTokenSuccess: createAction(
            `[Auth][${provider}]  Code Exchange Success`,
            props<{ token: Token }>()
        ),
        exchangeTokenForToken: createAction(
            `[Auth][${provider}] Exchange Token for Token`,
            props<{ token: string }>()
        ),
        exchangeTokenForTokenSuccess: createAction(
            `[Auth][${provider}]  Token Exchange Success`,
            props<{ token: Token }>()
        ),
        exchangeTokenForTokenFailure: createAction(
            `[Auth][${provider}]  Token Exchange Failure`,
            props<{ error: any }>()
        ),

        fetchUser: createAction(`[Auth][${provider}]  Fetch User`),
        userFetchSuccess: createAction(
            `[Auth][${provider}]  User Fetch Success`,
            props<{ userProfile: any }>()
        ),
        userFetchFailure: createAction(
            `[Auth][${provider}]  User Fetch Failure`,
            props<{ error: any }>()
        ),
        logoutUser: createAction(`[Auth][${provider}]  Logout User`),
    }
}

export type OauthActions = ReturnType<typeof createOauthActions>

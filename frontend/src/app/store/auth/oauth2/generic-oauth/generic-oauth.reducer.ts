/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from '@core/dto/Token'
import { createReducer, on } from '@ngrx/store'
import { OauthActions } from './generic-oauth.actions'

export interface OauthState {
    token: Token | null
    isAuthenticated: boolean
    error: any | null
    userProfile: any | null
}

export function createGenericOauthReducer(
    actions: OauthActions,
    initialState: OauthState
) {
    return createReducer(
        initialState,
        on(
            actions.exchangeCodeForTokenSuccess,
            (state, { token }): OauthState => ({
                ...state,
                token,
                isAuthenticated: true,
                error: null,
            })
        ),
        on(
            actions.exchangeCodeForTokenFailure,
            (state, { error }): OauthState => ({
                ...state,
                error,
                isAuthenticated: false,
            })
        ),
        on(
            actions.exchangeTokenForTokenSuccess,
            (state, { token }): OauthState => ({
                ...state,
                token,
                isAuthenticated: true,
                error: null,
            })
        ),
        on(
            actions.exchangeTokenForTokenFailure,
            (state, { error }): OauthState => ({
                ...state,
                error,
                isAuthenticated: false,
            })
        ),
        on(
            actions.userFetchSuccess,
            (state, { userProfile }): OauthState => ({
                ...state,
                userProfile,
            })
        ),
        on(
            actions.userFetchFailure,
            (state, { error }): OauthState => ({
                ...state,
                error,
            })
        )
    )
}

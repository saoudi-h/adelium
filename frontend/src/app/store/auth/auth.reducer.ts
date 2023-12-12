import { Token } from '@core/dto/Token'
import { UserToken } from '@core/dto/UserToken'
import { createReducer, on } from '@ngrx/store'
import * as AuthActions from './auth.actions'

export interface AuthState {
    token: Token | null
    user: UserToken | null
    isLoggedIn: boolean
    refreshAttempts: number
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLoggedIn: false,
    refreshAttempts: 0,
    loading: false,
    error: null,
}

export const authReducer = createReducer(
    initialState,
    on(
        AuthActions.login,
        (state): AuthState => ({
            ...state,
            loading: true,
            error: null,
        })
    ),
    on(AuthActions.loginSuccess, (state, { token }) => ({
        ...state,
        token,
        user: getUserFromToken(token),
        isLoggedIn: true,
        loading: false,
        error: null,
    })),
    on(
        AuthActions.loginFailure,
        (state, { error }): AuthState => ({
            ...state,
            error,
            loading: false,
            token: null,
            user: null,
            isLoggedIn: false,
        })
    ),
    on(
        AuthActions.logoutSuccess,
        (state): AuthState => ({
            ...state,
            token: null,
            user: null,
            isLoggedIn: false,
            loading: false,
            error: null,
        })
    ),
    on(
        AuthActions.refreshToken,
        (state): AuthState => ({
            ...state,
            refreshAttempts: state.refreshAttempts + 1,
        })
    ),
    on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
        ...state,
        token,
        user: getUserFromToken(token),
        isLoggedIn: true,
        refreshAttempts: 0,
        loading: false,
        error: null,
    })),
    on(
        AuthActions.restoreSessionSuccess,
        (state, { token, refreshAttempts }) => ({
            ...state,
            token,
            user: getUserFromToken(token),
            refreshAttempts,
            isLoggedIn: true,
            loading: false,
            error: null,
        })
    ),
    on(
        AuthActions.restoreSessionFailure,
        (state): AuthState => ({
            ...state,
            error: null,
            loading: false,
            token: null,
            user: null,
            refreshAttempts: 0,
            isLoggedIn: false,
        })
    )
)

export const getUserFromToken = (token: Token): UserToken | null => {
    if (!token) return null
    const userData = JSON.parse(
        atob(token.accessToken.split('.')[1])
    ) as UserToken
    if (!userData) return null
    return userData
}

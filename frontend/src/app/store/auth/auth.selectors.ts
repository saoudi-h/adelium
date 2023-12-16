import { RoleEnum } from '@core/utility/types'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthState } from './auth.reducer'

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectAuthToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token
)

export const selectCurrentUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
)

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState) => state.isLoggedIn
)

export const selectIsAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
)

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
)

export const selectIsAdmin = createSelector(
    selectAuthState,
    (state: AuthState) =>
        state.user?.authorities.includes(RoleEnum.ADMIN) ?? false
)

export const selectAccessToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token?.accessToken ?? null
)

export const selectRefreshToken = createSelector(
    selectAuthState,
    (state: AuthState) => state.token?.refreshToken ?? null
)

export const selectRefreshAttempts = createSelector(
    selectAuthState,
    (state: AuthState) => state.refreshAttempts
)

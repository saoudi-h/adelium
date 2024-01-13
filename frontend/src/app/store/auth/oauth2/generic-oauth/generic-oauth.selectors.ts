import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OauthState } from './generic-oauth.reducer'

export function createGenericOAuthSelectors(featureName: string) {
    const selectOAuthFeature = createFeatureSelector<OauthState>(featureName)

    const selectIsAuthenticated = createSelector(
        selectOAuthFeature,
        (state: OauthState) => state.isAuthenticated
    )

    const selectToken = createSelector(
        selectOAuthFeature,
        (state: OauthState) => state.token
    )

    const selectUserProfile = createSelector(
        selectOAuthFeature,
        (state: OauthState) => state.userProfile
    )

    const selectAuthError = createSelector(
        selectOAuthFeature,
        (state: OauthState) => state.error
    )

    return {
        selectIsAuthenticated,
        selectToken,
        selectUserProfile,
        selectAuthError,
    }
}

export type OAuthSelectors = ReturnType<typeof createGenericOAuthSelectors>

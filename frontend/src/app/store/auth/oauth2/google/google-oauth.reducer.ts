import {
    OauthState,
    createGenericOauthReducer,
} from '../generic-oauth/generic-oauth.reducer'
import { GoogleOauthActions } from './google-oauth.actions'

export interface GoogleOauthState extends OauthState {}

export const googleInitialState: GoogleOauthState = {
    token: null,
    isAuthenticated: false,
    error: null,
    userProfile: null,
}

export const googleOauthReducer = createGenericOauthReducer(
    GoogleOauthActions,
    googleInitialState
)

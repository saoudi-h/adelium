import {
    OauthState,
    createGenericOauthReducer,
} from '../generic-oauth/generic-oauth.reducer'
import { GithubOauthActions } from './github-oauth.actions'

export interface GithubOauthState extends OauthState {}

export const githubInitialState: GithubOauthState = {
    token: null,
    isAuthenticated: false,
    error: null,
    userProfile: null,
}

export const githubOauthReducer = createGenericOauthReducer(
    GithubOauthActions,
    githubInitialState
)

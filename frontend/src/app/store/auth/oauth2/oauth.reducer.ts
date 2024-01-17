import { combineReducers } from '@ngrx/store'
import {
    GithubOauthState,
    githubInitialState,
    githubOauthReducer,
} from './github/github-oauth.reducer'
import {
    GoogleOauthState,
    googleInitialState,
    googleOauthReducer,
} from './google/google-oauth.reducer'

export interface OauthRootState {
    github: GithubOauthState
    google: GoogleOauthState
}

export const initialOAuthRootState: OauthRootState = {
    github: githubInitialState,
    google: googleInitialState,
}

export const oauthRootReducer = combineReducers({
    github: githubOauthReducer,
    google: googleOauthReducer,
})
